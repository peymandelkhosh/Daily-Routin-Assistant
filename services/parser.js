const { GoogleGenerativeAI } = require('@google/generative-ai');

const SYSTEM_PROMPT_TEMPLATE = (lang) => `
  You are an expert AI parser for a personal routine assistant application.
  The user is speaking or texting in one of three languages: English, Persian (Farsi), or German.
  Your task is to analyze the input (which could be text or audio) and extract structured information of one of 5 types: "activity", "journal", "task", "schedule", or "birthday".
  
  Target Language for Output:
  - Write the output string fields ("notes" for activity, "content" for journal, "title" for task, "activity" for schedule, "name" for birthday) in the SAME language as the input text/audio, or matching the target language: "${lang}". Keep translations natural.

  How to determine the "type":
  1. "birthday": If the user mentions a birthday (e.g. "تولد سینا ۱۴ ژوئن است", "Sina's birthday is June 14th", "remember birthday of Sara on 05-20").
  2. "schedule": If the user wants to set a routine clock time block or calendar schedule (e.g. "ساعت ۱۰ صبح جلسه کاری دارم", "schedule gym session at 18:00", "set routine sleep at 23:00"). They will mention a specific clock hour (e.g. 10:00, 18:00, 9 AM, 9:30).
  3. "task": If the user wants to add a pending task, goal, todo item, or reminder for the future without a specific clock hour (e.g. "تسک خرید نان را بنویس", "add math homework task", "dueDate next Friday"). Look for keywords like "task", "todo", "تسک", "یادآوری", "باید انجام بدم".
  4. "activity": If they track a specific past routine action and mention a duration of time spent (e.g. "۲ ساعت کار کردم", "نیم ساعت ورزش کردم", "i slept for 8 hours").
  5. "journal": If it's a general reflection, thought, daily review, feelings recap, or mood status (e.g. "امروز خیلی خسته‌ام و حس خوبی ندارم", "I had a great day today and accomplished a lot").

  Predefined Activity Categories (Only for type "activity"):
  - "Work" (work, coding, projects, business meetings / کار، برنامه‌نویسی، پروژه، جلسه / Arbeit, Codieren, Projekt)
  - "Study" (studying, reading, online courses, educational podcasts / درس خواندن، مطالعه، کلاس آموزشی / Lernen, Lesen, Kurs)
  - "Exercise" (workout, gym, running, walking, yoga / ورزش، باشگاه، پیاده‌روی / Sport, Fitness studio, Laufen)
  - "Leisure" (entertainment, gaming, watching movies, social media / تفریح، بازی، فیلم، اینستاگرام / Freizeit, Spiele, Filme)
  - "Sleep" (night sleep, nap, absolute rest / خواب، چرت زدن، استراحت / Schlafen, Nickerchen, Ausruhen)
  - "Chores" (house cleaning, cooking, grocery shopping, washing / کارهای خانه، آشپزی، خرید، تمیزکاری / Hausarbeit, Kochen, Putzen)

  Productivity Score Rules (Only for type "activity"):
  - Assign a score from 1 to 10. Default is 7.
  - High focus: 8-10. Low focus/distractions: 1-4.

  Output Format (Strictly valid JSON):

  For type "activity":
  {
    "type": "activity",
    "activity": "Work" | "Study" | "Exercise" | "Leisure" | "Sleep" | "Chores",
    "duration": float (duration in hours. Convert phrases like "1.5 hours", "یک ساعت و نیم" to 1.5),
    "productivity": integer (1-10),
    "notes": "A clean, concise summary of the notes in the requested language (${lang})",
    "startTime": "HH:MM" (Start clock time in 24-hour format, e.g. "14:00" or "09:30". Optional, only if mentioned by the user),
    "endTime": "HH:MM" (End clock time in 24-hour format, e.g. "16:30" or "11:00". Optional, only if mentioned by the user)
  }

  For type "journal":
  {
    "type": "journal",
    "content": "The full text of the journal entry in the requested language (${lang})",
    "sentiment": "positive" | "neutral" | "negative"
  }

  For type "task":
  {
    "type": "task",
    "title": "Clear, concise title of the task in the requested language (${lang})",
    "dueDate": "YYYY-MM-DD" (If a date is mentioned like 'فردا' (tomorrow), parse it. If not, default to empty ""),
    "requiresPrep": boolean (true if user indicates preparation or pre-requisite, e.g. "نیاز به پیش‌نیاز داره", "needs prep", otherwise false)
  }

  For type "schedule":
  {
    "type": "schedule",
    "time": "HH:MM" (Clock time in 24-hour format, e.g. "09:00", "18:30", "23:00"),
    "activity": "The activity description to schedule in the requested language (${lang})"
  }

  For type "birthday":
  {
    "type": "birthday",
    "name": "Person's name in the requested language (${lang})",
    "date": "MM-DD" (Format date as Month and Day, e.g. June 14th -> "06-14", 25th of June -> "06-25")
  }
`;

// Helper for basic rule-based parser fallback if API keys are not configured
function parseWithRules(text, lang = 'fa') {
  console.log("Using rule-based parser fallback...");
  
  // 1. Birthday detection
  if (text.includes("تولد") || text.includes("birthday") || text.includes("geburtstag")) {
    let name = "مخاطب";
    const nameMatch = text.match(/(?:تولد|birthday of|geburtstag von)\s*([^\s]+)/i);
    if (nameMatch) name = nameMatch[1];
    
    // Parse date if contains MM-DD or similar
    let dateStr = "06-15"; // default guess
    const dateMatch = text.match(/(\d{1,2})[-/](\d{1,2})/);
    if (dateMatch) {
      dateStr = `${dateMatch[1].padStart(2, '0')}-${dateMatch[2].padStart(2, '0')}`;
    }
    return {
      type: "birthday",
      name,
      date: dateStr
    };
  }

  // 2. Schedule detection (contains time block)
  const timeMatch = text.match(/(?:ساعت|at|um)\s*(\d{1,2})(?::(\d{2}))?\s*(?:صبح|عصر|شب|am|pm)?/i);
  if (timeMatch || text.includes(":") || text.includes("ساعت")) {
    let hour = timeMatch ? parseInt(timeMatch[1]) : 9;
    let minute = (timeMatch && timeMatch[2]) ? parseInt(timeMatch[2]) : 0;
    
    // Simple PM adjustments
    if (text.includes("عصر") || text.includes("شب") || text.includes("pm")) {
      if (hour < 12) hour += 12;
    }
    
    const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return {
      type: "schedule",
      time: timeStr,
      activity: text.replace(/(?:ساعت|at|um)\s*\d+[:\d]*/g, '').trim() || "فعالیت برنامه ریزی شده"
    };
  }

  // 3. Task detection
  if (text.includes("تسک") || text.includes("task") || text.includes("هدف") || text.includes("یادآوری") || text.includes("todo")) {
    const today = new Date().toISOString().split('T')[0];
    return {
      type: "task",
      title: text.replace(/(?:تسک|task|اضافه کن|add)/gi, '').trim() || "کار جدید",
      dueDate: today,
      requiresPrep: text.includes("پیش‌نیاز") || text.includes("prep")
    };
  }

  // 4. Activity detection (duration)
  let duration = 1.0;
  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:ساعت|hour|stunde)/i);
  if (hourMatch) {
    duration = parseFloat(hourMatch[1]);
  } else if (text.includes("نیم ساعت") || text.includes("نیم‌ساعت") || text.includes("half an hour") || text.includes("halbe stunde")) {
    duration = 0.5;
  }

  let activity = 'Work';
  if (text.includes("کار") || text.includes("پروژه") || text.includes("برنامه") || text.includes("کد") || text.includes("work") || text.includes("project") || text.includes("code") || text.includes("arbeit")) {
    activity = 'Work';
  } else if (text.includes("درس") || text.includes("مطالعه") || text.includes("کتاب") || text.includes("study") || text.includes("read") || text.includes("learn") || text.includes("lernen") || text.includes("buch")) {
    activity = 'Study';
  } else if (text.includes("ورزش") || text.includes("باشگاه") || text.includes("sport") || text.includes("gym") || text.includes("workout") || text.includes("trainieren")) {
    activity = 'Exercise';
  } else if (text.includes("بازی") || text.includes("تفریح") || text.includes("فیلم") || text.includes("game") || text.includes("play") || text.includes("movie") || text.includes("spielen")) {
    activity = 'Leisure';
  } else if (text.includes("خواب") || text.includes("استراحت") || text.includes("sleep") || text.includes("rest") || text.includes("schlafen")) {
    activity = 'Sleep';
  } else if (text.includes("تمیز") || text.includes("آشپزی") || text.includes("chores") || text.includes("clean") || text.includes("putzen") || text.includes("kochen")) {
    activity = 'Chores';
  }

  let productivity = 7;
  if (text.includes("عالی") || text.includes("خوب") || text.includes("great") || text.includes("good") || text.includes("gut") || text.includes("prima")) {
    productivity = 9;
  } else if (text.includes("خسته") || text.includes("بد") || text.includes("tired") || text.includes("bad") || text.includes("müde") || text.includes("schlecht")) {
    productivity = 4;
  }

  const isJournal = text.length > 50 && !text.includes("ساعت") && !text.includes("hour") && !text.includes("stunde");

  if (isJournal) {
    return {
      type: "journal",
      content: text,
      sentiment: (text.includes("خوب") || text.includes("good") || text.includes("gut")) ? "positive" : ((text.includes("بد") || text.includes("bad") || text.includes("schlecht")) ? "negative" : "neutral")
    };
  }

  return {
    type: "activity",
    activity,
    duration,
    productivity,
    notes: text
  };
}

// OpenRouter text parsing fallback
async function parseTextWithOpenRouter(text, lang) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY_NOT_CONFIGURED");

  console.log("Sending text parsing request to OpenRouter...");
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://syncroutine.com",
      "X-Title": "SyncRoutine"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash:free",
      messages: [
        { role: "system", content: SYSTEM_PROMPT_TEMPLATE(lang) },
        { role: "user", content: `Parse this text: "${text}"` }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  return JSON.parse(content);
}

// Groq text parsing fallback
async function parseTextWithGroq(text, lang) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY_NOT_CONFIGURED");

  console.log("Sending text parsing request to Groq...");
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT_TEMPLATE(lang) },
        { role: "user", content: `Parse this text: "${text}"` }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  return JSON.parse(content);
}

// OpenAI text parsing fallback
async function parseTextWithOpenAI(text, lang) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY_NOT_CONFIGURED");

  console.log("Sending text parsing request to OpenAI...");
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT_TEMPLATE(lang) },
        { role: "user", content: `Parse this text: "${text}"` }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content.trim();
  return JSON.parse(content);
}

// Whisper API audio transcription fallback (Groq or OpenAI)
async function transcribeAudioWhisper(base64Audio, mimeType, provider = 'groq') {
  const apiKey = provider === 'groq' ? process.env.GROQ_API_KEY : process.env.OPENAI_API_KEY;
  const url = provider === 'groq' 
    ? "https://api.groq.com/openai/v1/audio/transcriptions" 
    : "https://api.openai.com/v1/audio/transcriptions";

  if (!apiKey) throw new Error(`${provider.toUpperCase()}_API_KEY_NOT_CONFIGURED`);

  const audioBuffer = Buffer.from(base64Audio, 'base64');
  const blob = new Blob([audioBuffer], { type: mimeType });
  const formData = new FormData();
  formData.append('file', blob, 'speech.ogg');
  formData.append('model', 'whisper-1');
  formData.append('language', 'fa'); // transcribe speech in Persian

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${provider} Whisper error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.text;
}

// Core text parsing chain
async function parseText(text, lang = 'fa') {
  const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_BACKUP].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE');

  // 1. Try Gemini keys
  for (const apiKey of keys) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const result = await model.generateContent([
        { text: SYSTEM_PROMPT_TEMPLATE(lang) },
        { text: `Parse this text: "${text}"` }
      ]);

      const jsonText = result.response.text().trim();
      return JSON.parse(jsonText);
    } catch (err) {
      console.warn(`Gemini API text parsing failed for key starting with ${apiKey.substring(0, 8)}..., trying next key/fallback`, err);
    }
  }

  // 2. Try OpenRouter
  if (process.env.OPENROUTER_API_KEY) {
    try {
      return await parseTextWithOpenRouter(text, lang);
    } catch (err) {
      console.error("OpenRouter fallback text parsing failed:", err.message);
    }
  }

  // 3. Try Groq Llama
  if (process.env.GROQ_API_KEY) {
    try {
      return await parseTextWithGroq(text, lang);
    } catch (err) {
      console.error("Groq fallback text parsing failed:", err.message);
    }
  }

  // 4. Try OpenAI GPT-4o-mini
  if (process.env.OPENAI_API_KEY) {
    try {
      return await parseTextWithOpenAI(text, lang);
    } catch (err) {
      console.error("OpenAI fallback text parsing failed:", err.message);
    }
  }

  // 5. Fallback to basic regex rules
  return parseWithRules(text, lang);
}

// Core audio parsing chain
async function parseAudio(base64Audio, mimeType, lang = 'fa') {
  const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_BACKUP].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE');

  // 1. Try Gemini multimodal audio processing
  for (const apiKey of keys) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      console.log(`Sending voice note to Gemini (mimeType: ${mimeType}, targetLang: ${lang}) using key ${apiKey.substring(0, 8)}...`);
      const result = await model.generateContent([
        {
          inlineData: {
            data: base64Audio,
            mimeType: mimeType
          }
        },
        { text: SYSTEM_PROMPT_TEMPLATE(lang) }
      ]);

      const jsonText = result.response.text().trim();
      return JSON.parse(jsonText);
    } catch (err) {
      console.warn(`Gemini API audio parsing failed for key starting with ${apiKey.substring(0, 8)}..., trying next key/fallback`, err);
    }
  }

  // 2. Try Groq Whisper transcription + text parsing fallbacks
  if (process.env.GROQ_API_KEY) {
    try {
      console.log("Transcribing audio using Groq Whisper...");
      const transcribedText = await transcribeAudioWhisper(base64Audio, mimeType, 'groq');
      console.log(`Transcribed text via Groq Whisper: "${transcribedText}"`);
      return await parseText(transcribedText, lang);
    } catch (err) {
      console.error("Groq audio transcription/parsing fallback failed:", err.message);
    }
  }

  // 3. Try OpenAI Whisper transcription + text parsing fallbacks
  if (process.env.OPENAI_API_KEY) {
    try {
      console.log("Transcribing audio using OpenAI Whisper...");
      const transcribedText = await transcribeAudioWhisper(base64Audio, mimeType, 'openai');
      console.log(`Transcribed text via OpenAI Whisper: "${transcribedText}"`);
      return await parseText(transcribedText, lang);
    } catch (err) {
      console.error("OpenAI audio transcription/parsing fallback failed:", err.message);
    }
  }

  throw new Error('All voice parsing and transcription APIs failed or are not configured.');
}

const ASSISTANT_SYSTEM_PROMPT = (lang) => `
You are the AI Assistant for SyncRoutine, a smart personal assistant dashboard.
The user is talking or chatting with you in one of three languages: English, Persian (Farsi), or German.

Your task is to analyze the input and determine the user's intent. You MUST classify the input into one of these 7 intents:
1. "log_activity" (e.g. "I worked for 2 hours", "Record my work from 9 to 11", "ثبت فعالیت کار به مدت ۲ ساعت")
2. "log_journal" (e.g. "Today was a great day, I felt very happy", "امروز خیلی خسته‌ام و حوصله ندارم")
3. "add_task" (e.g. "Add a task to buy milk", "تسک پروژه دانشگاه را اضافه کن")
4. "add_schedule" (e.g. "Schedule a workout at 5 PM", "برنامه برای ساعت ۱۸ ورزش ثبت کن")
5. "add_birthday" (e.g. "Save Sina's birthday on June 25th", "تولد زهرا را ثبت کن برای ۰۵-۱۲")
6. "wellness_consult" (e.g. "I am feeling very anxious and stressed", "خیلی تحت فشارم و حالم خوب نیست")
7. "general_query" (e.g. "What is my total tracked time?", "چطور کار میکنی؟", "سلام چطوری؟")

You MUST return a strictly valid JSON object.
JSON Schema:
{
  "intent": "log_activity" | "log_journal" | "add_task" | "add_schedule" | "add_birthday" | "wellness_consult" | "general_query",
  "targetView": "dashboard" | "dashboard" | "tasks-alarms" | "tasks-alarms" | "settings" | "wellness" | null,
  "data": {
    // For "log_activity"
    "activity": "Work" | "Study" | "Exercise" | "Leisure" | "Sleep" | "Chores",
    "startTime": "HH:MM", // 24-hour format, optional
    "endTime": "HH:MM", // 24-hour format, optional
    "duration": float, // optional, duration in hours
    "productivity": integer (1-10, default 7),
    "notes": "Concise summary in input language",

    // For "log_journal"
    "content": "Full journal text",
    "sentiment": "positive" | "neutral" | "negative",

    // For "add_task"
    "title": "Task title",
    "dueDate": "YYYY-MM-DD", // optional
    "requiresPrep": boolean,

    // For "add_schedule"
    "activity": "Schedule activity title",
    "time": "HH:MM", // 24-hour format

    // For "add_birthday"
    "name": "Person's name",
    "date": "MM-DD", // MM-DD format

    // For "wellness_consult"
    "advice": "Therapeutic counseling response in user's language",

    // For "general_query"
    "reply": "Helpful, conversational answer in user's language"
  },
  "message": "A short, friendly message in the user's language (${lang}) explaining what you did (e.g. 'من صفحه را به برنامه تغییر دادم و تسک خرید نان را وارد کردم تا تایید کنید.')"
}
`;

function parseAssistantFallback(text, lang = 'fa') {
  console.log("Using assistant fallback rule parser...");
  const textLower = text.toLowerCase();
  
  if (textLower.includes("تولد") || textLower.includes("birthday") || textLower.includes("geburtstag")) {
    let name = "مخاطب";
    const nameMatch = text.match(/(?:تولد|birthday of|geburtstag von)\s*([^\s]+)/i);
    if (nameMatch) name = nameMatch[1];
    return {
      intent: "add_birthday",
      targetView: "settings",
      data: { name, date: "06-15" },
      message: lang === 'fa' ? `من شما را به تنظیمات تولد منتقل کردم و فیلدها را برای ${name} آماده ساختم.` : `Moved to Settings and prefilled birthday fields for ${name}.`
    };
  }
  
  if (textLower.includes("تسک") || textLower.includes("task") || textLower.includes("todo") || textLower.includes("یادآوری")) {
    return {
      intent: "add_task",
      targetView: "tasks-alarms",
      data: { title: text, dueDate: "", requiresPrep: false },
      message: lang === 'fa' ? "من شما را به صفحه تسک‌ها منتقل کردم و عنوان را وارد کردم." : "Moved to Tasks & Alarms and filled out the title."
    };
  }

  if (textLower.includes("برنامه") || textLower.includes("ساعت") || textLower.includes("schedule") || textLower.includes("alarm")) {
    return {
      intent: "add_schedule",
      targetView: "tasks-alarms",
      data: { activity: text, time: "09:00" },
      message: lang === 'fa' ? "من شما را به صفحه برنامه‌ریزی منتقل کرده و فیلد ساعت را آماده کردم." : "Moved to Tasks & Alarms and filled out the schedule."
    };
  }

  if (textLower.includes("کار کردم") || textLower.includes("ساعت") && (textLower.includes("ساعت") || textLower.includes("دقیقه") || textLower.includes("hour") || textLower.includes("stunde"))) {
    return {
      intent: "log_activity",
      targetView: "dashboard",
      data: { activity: "Work", duration: 1.0, productivity: 7, notes: text },
      message: lang === 'fa' ? "من شما را به صفحه اصلی هدایت کردم و ثبت دستی فعالیت را آماده کردم." : "Moved to Dashboard and filled out the activity form."
    };
  }

  if (textLower.includes("خاطره") || textLower.includes("یادداشت") || textLower.includes("mood") || textLower.includes("feeling")) {
    return {
      intent: "log_journal",
      targetView: "dashboard",
      data: { content: text, sentiment: "neutral" },
      message: lang === 'fa' ? "من شما را به صفحه اصلی هدایت کردم و ثبت دستی یادداشت را آماده کردم." : "Moved to Dashboard and filled out the journal form."
    };
  }

  if (textLower.includes("اضطراب") || textLower.includes("خسته") || textLower.includes("عصبی") || textLower.includes("کلافه") || textLower.includes("stress") || textLower.includes("sad") || textLower.includes("happy")) {
    return {
      intent: "wellness_consult",
      targetView: "wellness",
      data: { advice: lang === 'fa' ? `من احساس شما را درک می‌کنم. به نظرم اختصاص دادن چند دقیقه برای استراحت یا پیاده‌روی می‌تواند به شما کمک کند تا تمرکز بیشتری به دست آورید.` : `I understand how you feel. Taking a few minutes to rest or walk can help you regain focus and relieve stress.` },
      message: lang === 'fa' ? "من شما را به مشاور سلامت روان منتقل کردم و پیشنهاداتی برای شما نوشتم." : "Moved to AI Wellness Mentor and generated advice."
    };
  }

  return {
    intent: "general_query",
    targetView: null,
    data: { reply: lang === 'fa' ? `من پیام شما را شنیدم: "${text}". آیا می‌خواهید فعالیتی ثبت کنید یا تسکی اضافه کنید؟` : `I heard your message: "${text}". Would you like to log an activity or add a task?` },
    message: lang === 'fa' ? "پاسخ دستیار" : "Assistant reply"
  };
}

async function parseAssistantChat(text, audio, mimeType, lang = 'fa') {
  const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_BACKUP].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE');

  // 1. Try Gemini
  for (const apiKey of keys) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const contents = [];
      if (audio && mimeType) {
        contents.push({
          inlineData: {
            data: audio,
            mimeType: mimeType
          }
        });
      }
      contents.push({ text: ASSISTANT_SYSTEM_PROMPT(lang) });
      contents.push({ text: `Analyze this user chat input: "${text || 'Audio input'}"` });

      const result = await model.generateContent(contents);
      const jsonText = result.response.text().trim();
      return JSON.parse(jsonText);
    } catch (err) {
      console.warn("Gemini API assistant chat failed, trying next key", err);
    }
  }

  // 2. Try OpenRouter (Transcribe first if audio is present)
  let textToUse = text || "";
  if (audio && mimeType) {
    try {
      if (process.env.GROQ_API_KEY) {
        textToUse = await transcribeAudioWhisper(audio, mimeType, 'groq');
      } else if (process.env.OPENAI_API_KEY) {
        textToUse = await transcribeAudioWhisper(audio, mimeType, 'openai');
      }
    } catch (err) {
      console.error("Transcribing audio for OpenRouter fallback failed:", err);
    }
  }

  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: ASSISTANT_SYSTEM_PROMPT(lang) },
            { role: "user", content: `Analyze this user chat input: "${textToUse}"` }
          ],
          response_format: { type: "json_object" }
        })
      });
      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0].message.content.trim();
        return JSON.parse(content);
      }
    } catch (err) {
      console.error("OpenRouter fallback assistant chat failed:", err.message);
    }
  }

  // 3. Fallback
  return parseAssistantFallback(textToUse, lang);
}

const MOOD_SYSTEM_PROMPT = (lang) => `
You are an expert sentiment analyst and psychological insight assistant.
The user is writing a personal journal entry.
Your task is to analyze the journal text and determine their mood (sentiment).

Classification categories for mood:
- 😊 "Happy" ( Persian: "شاد" )
- 😔 "Sad" ( Persian: "غمگین" )
- 😡 "Angry" ( Persian: "عصبانی" )
- 😴 "Tired" ( Persian: "خسته" )
- 🧘 "Peaceful" ( Persian: "آرام" )
- ⚡ "Energetic" ( Persian: "پرانرژی" )
- 😕 "Anxious" ( Persian: "مضطرب" )

Output Mime-Type MUST be JSON. Return a JSON object with:
{
  "sentiment": "positive" | "neutral" | "negative",
  "moodEmoji": "😊" | "😔" | "😡" | "😴" | "🧘" | "⚡" | "😕",
  "moodLabel": "Happy" | "Sad" | "Angry" | "Tired" | "Peaceful" | "Energetic" | "Anxious",
  "moodLabelFa": "شاد" | "غمگین" | "عصبانی" | "خسته" | "آرام" | "پرانرژی" | "مضطرب",
  "insight": "A brief, comforting, or encouraging single sentence in Persian/Farsi (or English if requested language is English) offering a psychological insight or thought based on their entry."
}
`;

async function analyzeJournalMood(text, lang = 'fa') {
  const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_BACKUP].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE');
  const prompt = `Analyze this journal entry: "${text}"`;

  // 1. Try Gemini
  for (const apiKey of keys) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });
      const result = await model.generateContent([
        { text: MOOD_SYSTEM_PROMPT(lang) },
        { text: prompt }
      ]);
      const content = result.response.text().trim();
      return JSON.parse(content);
    } catch (err) {
      console.warn("Gemini analyzeJournalMood failed, trying next key...", err);
    }
  }

  // 2. OpenRouter fallback
  if (process.env.OPENROUTER_API_KEY) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: MOOD_SYSTEM_PROMPT(lang) },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }
        })
      });
      if (response.ok) {
        const data = await response.json();
        const content = data.choices[0].message.content.trim();
        return JSON.parse(content);
      }
    } catch (err) {
      console.error("OpenRouter fallback mood analysis failed:", err);
    }
  }

  // 3. Fallback
  return {
    sentiment: "neutral",
    moodEmoji: "🧘",
    moodLabel: "Peaceful",
    moodLabelFa: "آرام",
    insight: lang === 'fa' ? "ممنون که خاطره امروز خود را ثبت کردید." : "Thank you for writing down your thoughts today."
  };
}

module.exports = {
  parseText,
  parseAudio,
  parseAssistantChat,
  analyzeJournalMood
};

