require('dotenv').config();
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const dbService = require('./services/database');
const parser = require('./services/parser');
const telegramBot = require('./services/telegram');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET || 'syncroutine-super-secret-key-12345';

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Initialize Telegram Bot Service
telegramBot.startTelegramBot();

// --- JWT Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user; // user = { id, username }
    next();
  });
};

// --- AUTHENTICATION ROUTES ---

// 1. Signup
app.post('/api/auth/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const user = await dbService.registerUser(username, password);
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
    res.status(201).json({ message: 'User registered successfully', token, username: user.username, lang: user.lang });
  } catch (err) {
    if (err.message === 'USERNAME_TAKEN') {
      res.status(400).json({ error: 'Username already exists' });
    } else {
      console.error("Signup error:", err);
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// 2. Login
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  try {
    const user = await dbService.loginUser(username, password);
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
    res.json({ message: 'Login successful', token, username: user.username, lang: user.lang });
  } catch (err) {
    if (err.message === 'INVALID_CREDENTIALS') {
      res.status(400).json({ error: 'Invalid username or password' });
    } else {
      console.error("Login error:", err);
      res.status(500).json({ error: 'Login failed' });
    }
  }
});

// --- PROTECTED API ROUTES ---

// 1. Activities API
app.get('/api/activities', authenticateToken, async (req, res) => {
  try {
    const activities = await dbService.getActivities(req.user.id);
    res.json(activities);
  } catch (err) {
    console.error("API error getting activities:", err);
    res.status(500).json({ error: 'Failed to retrieve activities' });
  }
});

app.post('/api/activities', authenticateToken, async (req, res) => {
  const { date, activity, duration, productivity, notes, startTime, endTime } = req.body;
  if (!date || !activity || !duration || !productivity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newLog = await dbService.addActivity(req.user.id, {
      id: Date.now().toString(),
      date,
      activity,
      duration: parseFloat(duration),
      productivity: parseInt(productivity),
      notes: notes || '',
      startTime: startTime || null,
      endTime: endTime || null
    });

    // Auto-award medals based on logged activity details
    const actLower = activity.toLowerCase();
    const notesLower = (notes || '').toLowerCase();
    if (activity === 'Exercise') {
      await dbService.toggleMedal(req.user.id, date, 'exercise', true);
    } else if (activity === 'Study' && (notesLower.includes('کتاب') || notesLower.includes('book') || notesLower.includes('صفحه') || notesLower.includes('page'))) {
      await dbService.toggleMedal(req.user.id, date, 'reading', true);
    } else if (activity === 'Meditation') {
      await dbService.toggleMedal(req.user.id, date, 'meditation', true);
    }

    res.status(201).json(newLog);
  } catch (err) {
    console.error("API error adding activity:", err);
    res.status(500).json({ error: 'Failed to save activity log' });
  }
});

app.delete('/api/activities/:id', authenticateToken, async (req, res) => {
  try {
    const result = await dbService.deleteActivity(req.user.id, req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error("API error deleting activity:", err);
    res.status(500).json({ error: 'Failed to delete activity log' });
  }
});

// 2. Journal API
app.get('/api/journal', authenticateToken, async (req, res) => {
  try {
    const entries = await dbService.getJournalEntries(req.user.id);
    res.json(entries);
  } catch (err) {
    console.error("API error getting journal entries:", err);
    res.status(500).json({ error: 'Failed to retrieve journal entries' });
  }
});

app.post('/api/journal', authenticateToken, async (req, res) => {
  const { date, content } = req.body;
  if (!date || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const lang = req.user.lang || 'fa';
    const analysis = await parser.analyzeJournalMood(content, lang);

    const newEntry = await dbService.addJournalEntry(req.user.id, {
      id: Date.now().toString(),
      date,
      content,
      sentiment: analysis.sentiment || 'neutral',
      mood_emoji: analysis.moodEmoji || '🧘',
      mood_label: lang === 'fa' ? (analysis.moodLabelFa || 'آرام') : (analysis.moodLabel || 'Peaceful')
    });
    
    res.status(201).json({
      ...newEntry,
      insight: analysis.insight
    });
  } catch (err) {
    console.error("API error adding journal entry:", err);
    res.status(500).json({ error: 'Failed to save journal entry' });
  }
});

app.delete('/api/journal/:id', authenticateToken, async (req, res) => {
  try {
    const result = await dbService.deleteJournalEntry(req.user.id, req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (err) {
    console.error("API error deleting journal entry:", err);
    res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});

// 3. Anniversaries API
app.get('/api/journal/anniversaries', authenticateToken, async (req, res) => {
  const { date } = req.query;
  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required (YYYY-MM-DD)' });
  }
  try {
    const anniversaries = await dbService.getAnniversaries(req.user.id, date);
    res.json(anniversaries);
  } catch (err) {
    console.error("API error getting anniversaries:", err);
    res.status(500).json({ error: 'Failed to retrieve anniversaries' });
  }
});

// 4. Tasks API
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const tasks = await dbService.getTasks(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error("API error getting tasks:", err);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

app.post('/api/tasks', authenticateToken, async (req, res) => {
  const { date, title, dueDate, requiresPrep } = req.body;
  if (!date || !title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const newTask = await dbService.addTask(req.user.id, {
      id: Date.now().toString(),
      date,
      title,
      dueDate: dueDate || '',
      requiresPrep: !!requiresPrep,
      completed: 0
    });
    res.status(201).json(newTask);
  } catch (err) {
    console.error("API error adding task:", err);
    res.status(500).json({ error: 'Failed to save task' });
  }
});

app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  const { completed } = req.body;
  try {
    const result = await dbService.updateTask(req.user.id, req.params.id, !!completed);
    res.json({ message: 'Task updated successfully', ...result });
  } catch (err) {
    console.error("API error updating task:", err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const result = await dbService.deleteTask(req.user.id, req.params.id);
    res.json({ message: 'Task deleted successfully', ...result });
  } catch (err) {
    console.error("API error deleting task:", err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// 5. Birthdays API
app.get('/api/birthdays', authenticateToken, async (req, res) => {
  try {
    const birthdays = await dbService.getBirthdays(req.user.id);
    res.json(birthdays);
  } catch (err) {
    console.error("API error getting birthdays:", err);
    res.status(500).json({ error: 'Failed to retrieve birthdays' });
  }
});

app.post('/api/birthdays', authenticateToken, async (req, res) => {
  const { name, date } = req.body;
  if (!name || !date) {
    return res.status(400).json({ error: 'Name and date (MM-DD) are required' });
  }
  try {
    const newBirthday = await dbService.addBirthday(req.user.id, {
      id: Date.now().toString(),
      name,
      date
    });
    res.status(201).json(newBirthday);
  } catch (err) {
    console.error("API error adding birthday:", err);
    res.status(500).json({ error: 'Failed to save birthday' });
  }
});

app.delete('/api/birthdays/:id', authenticateToken, async (req, res) => {
  try {
    const result = await dbService.deleteBirthday(req.user.id, req.params.id);
    res.json({ message: 'Birthday deleted successfully', ...result });
  } catch (err) {
    console.error("API error deleting birthday:", err);
    res.status(500).json({ error: 'Failed to delete birthday' });
  }
});

// 6. Schedules API
app.get('/api/schedules', authenticateToken, async (req, res) => {
  try {
    const schedules = await dbService.getSchedules(req.user.id);
    res.json(schedules);
  } catch (err) {
    console.error("API error getting schedules:", err);
    res.status(500).json({ error: 'Failed to retrieve schedules' });
  }
});

app.post('/api/schedules', authenticateToken, async (req, res) => {
  const { time, activity } = req.body;
  if (!time || !activity) {
    return res.status(400).json({ error: 'Time and activity are required' });
  }
  try {
    const newSchedule = await dbService.addSchedule(req.user.id, {
      id: Date.now().toString(),
      time,
      activity
    });
    res.status(201).json(newSchedule);
  } catch (err) {
    console.error("API error adding schedule:", err);
    res.status(500).json({ error: 'Failed to save schedule' });
  }
});

app.delete('/api/schedules/:id', authenticateToken, async (req, res) => {
  try {
    const result = await dbService.deleteSchedule(req.user.id, req.params.id);
    res.json({ message: 'Schedule deleted successfully', ...result });
  } catch (err) {
    console.error("API error deleting schedule:", err);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

// 7. User Lang Update API
app.put('/api/users/lang', authenticateToken, async (req, res) => {
  const { lang } = req.body;
  try {
    await dbService.updateUserLang(req.user.id, lang);
    res.json({ message: 'Language updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user language settings' });
  }
});

// 7.5. User Seeding API
app.post('/api/users/seed', authenticateToken, async (req, res) => {
  try {
    dbService.seedUserData(req.user.id);
    res.json({ message: 'Database seeded successfully for testing June 2026 logs' });
  } catch (err) {
    console.error("Error seeding user database:", err);
    res.status(500).json({ error: 'Database seeding failed' });
  }
});

// 7.8. Medals API
app.get('/api/medals', authenticateToken, async (req, res) => {
  try {
    const medals = await dbService.getMedals(req.user.id);
    res.json(medals);
  } catch (err) {
    console.error("API error getting medals:", err);
    res.status(500).json({ error: 'Failed to retrieve medals' });
  }
});

app.post('/api/medals', authenticateToken, async (req, res) => {
  const { date, habitType, completed } = req.body;
  if (!date || !habitType) {
    return res.status(400).json({ error: 'Date and habitType are required' });
  }
  try {
    const result = await dbService.toggleMedal(req.user.id, date, habitType, !!completed);
    res.json(result);
  } catch (err) {
    console.error("API error toggling medal:", err);
    res.status(500).json({ error: 'Failed to toggle medal' });
  }
});

// Habits API
app.get('/api/habits', authenticateToken, async (req, res) => {
  try {
    const habits = await dbService.getCustomHabits(req.user.id);
    res.json(habits);
  } catch (err) {
    console.error("API error getting habits:", err);
    res.status(500).json({ error: 'Failed to retrieve habits' });
  }
});

app.post('/api/habits', authenticateToken, async (req, res) => {
  const { habitKey, habitName, habitEmoji, habitDesc } = req.body;
  if (!habitKey || !habitName || !habitEmoji) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const result = await dbService.addCustomHabit(req.user.id, { habitKey, habitName, habitEmoji, habitDesc: habitDesc || 'عادت روزانه' });
    res.status(201).json(result);
  } catch (err) {
    console.error("API error adding custom habit:", err);
    res.status(500).json({ error: 'Failed to save custom habit' });
  }
});

// 8. AI Parser & Scheduler APIs
app.post('/api/parse-input', authenticateToken, async (req, res) => {
  const { text, lang } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }
  try {
    const parsedResult = await parser.parseText(text, lang || 'fa');
    res.json(parsedResult);
  } catch (err) {
    console.error("API error parsing text:", err);
    res.status(500).json({ error: 'Failed to parse text input' });
  }
});

app.post('/api/parse-audio', authenticateToken, async (req, res) => {
  const { audio, mimeType, lang } = req.body;
  if (!audio || !mimeType) {
    return res.status(400).json({ error: 'Audio and mimeType are required' });
  }
  try {
    const parsedResult = await parser.parseAudio(audio, mimeType, lang || 'fa');
    res.json(parsedResult);
  } catch (err) {
    console.error("API error parsing audio:", err);
    res.status(500).json({ error: 'Failed to parse audio input' });
  }
});

app.post('/api/assistant/chat', authenticateToken, async (req, res) => {
  const { text, audio, mimeType, lang } = req.body;
  try {
    const result = await parser.parseAssistantChat(text, audio, mimeType, lang || 'fa');
    res.json(result);
  } catch (err) {
    console.error("API error in assistant chat:", err);
    res.status(500).json({ error: 'Failed to process assistant input' });
  }
});

app.post('/api/suggest-routine', authenticateToken, async (req, res) => {
  const { date, lang } = req.body;
  const targetLang = lang || 'fa';

  try {
    const [activities, tasks, birthdays] = await Promise.all([
      dbService.getActivities(req.user.id),
      dbService.getTasks(req.user.id),
      dbService.getBirthdays(req.user.id)
    ]);

    const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_BACKUP].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE');
    if (keys.length === 0) {
      const fallbackMsgs = {
        fa: "🔑 برای دریافت برنامه‌ریزی هوشمند روزانه با هوش مصنوعی جمینی، لطفاً کلید API معتبر خود را در تنظیمات وارد کنید.",
        en: "🔑 To receive smart daily routine planning using Gemini AI, please set a valid API key in your settings.",
        de: "🔑 Um eine intelligente tägliche Routineplanung mit Gemini AI zu erhalten, legen Sie bitte einen gültigen API-Schlüssel in Ihren Einstellungen fest."
      };
      return res.json({ suggestion: fallbackMsgs[targetLang], slots: [] });
    }

    const pendingTasks = tasks.filter(t => !t.completed);
    
    const dateParts = date.split('-');
    const mmDd = `${dateParts[1]}-${dateParts[2]}`;
    const todayBirthdays = birthdays.filter(b => b.date === mmDd);

    const prompt = `
      You are a smart personal productivity coach. Based on the user's data, suggest a healthy, optimized schedule for tomorrow.
      Tomorrow's Date: ${date}
      Language of suggestion and slot notes: ${targetLang} (Strictly respond in this language!)

      User's Historical Routine Logs (Last few logs):
      ${JSON.stringify(activities.slice(0, 15), null, 2)}

      User's Pending Important Tasks:
      ${JSON.stringify(pendingTasks, null, 2)}

      Birthdays Occurring Tomorrow:
      ${JSON.stringify(todayBirthdays, null, 2)}

      Instruction:
      - Design a proposed daily schedule block (e.g. Work block, Study session, Chores, Exercise, Sleep).
      - Reference their pending tasks (e.g. "You have your Thesis due soon which requires preparation, let's block 2 hours for it in the afternoon").
      - Highlight if it is someone's birthday tomorrow.
      - Format the "suggestion" text field nicely in Markdown using emojis, bullet points, and clean bold headings.
      - Keep it motivating, friendly, and highly customized to their logs.

      You MUST respond in strictly valid JSON format with the following schema:
      {
        "suggestion": "Detailed friendly motivational explanation and list of tomorrow's schedule in markdown format",
        "slots": [
          {
            "activity": "Work" | "Study" | "Exercise" | "Leisure" | "Sleep" | "Chores",
            "startTime": "HH:MM" (Start clock time in 24-hour format, e.g. "09:00", "14:30"),
            "endTime": "HH:MM" (End clock time in 24-hour format, e.g. "11:00", "16:00"),
            "notes": "Short description of what to do in this slot in target language"
          }
        ]
      }
    `;

    let suggestionData = null;
    let geminiErr = null;

    for (const apiKey of keys) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ 
          model: "gemini-2.5-flash",
          generationConfig: { responseMimeType: "application/json" }
        });
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim();
        suggestionData = JSON.parse(text);
        break;
      } catch (err) {
        console.warn(`Gemini AI routine suggestion failed for key starting with ${apiKey.substring(0, 8)}..., trying next key`, err);
        geminiErr = err;
      }
    }

    if (suggestionData) {
      res.json(suggestionData);
    } else {
      const errMsg = geminiErr ? (geminiErr.message || '') : '';
      if (errMsg.includes('depleted') || errMsg.includes('billing') || (geminiErr && geminiErr.status === 429)) {
        const billingMsgs = {
          fa: "❌ خطای اعتباری جمینی: اعتبار حساب شما در گوگل ای‌پی‌آی به پایان رسیده است. لطفاً شارژ حساب خود را در هوش مصنوعی گوگل بررسی کنید.",
          en: "❌ Gemini billing error: Your Google API prepayment credits are depleted. Please check your account billing in Google AI Studio.",
          de: "❌ Gemini-Abrechnungsfehler: Ihr Google API-Guthaben ist aufgebraucht. Bitte überprüfen Sie Ihre Abrechnung im Google AI Studio."
        };
        return res.json({ suggestion: billingMsgs[targetLang], slots: [] });
      }
      res.status(500).json({ error: 'Failed to generate AI routine schedule suggestions' });
    }

  } catch (err) {
    console.error("AI schedule generation failed:", err);
    res.status(500).json({ error: 'Failed to generate AI routine schedule suggestions' });
  }
});

// Bulk Insert Activities API
app.post('/api/activities/bulk', authenticateToken, async (req, res) => {
  const { activities } = req.body;
  if (!Array.isArray(activities)) {
    return res.status(400).json({ error: 'activities must be an array' });
  }
  try {
    const savedLogs = [];
    for (const act of activities) {
      const saved = await dbService.addActivity(req.user.id, {
        id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9),
        date: act.date,
        activity: act.activity,
        duration: parseFloat(act.duration),
        productivity: parseInt(act.productivity) || 7,
        notes: act.notes || '',
        startTime: act.startTime || null,
        endTime: act.endTime || null
      });
      savedLogs.push(saved);
    }
    res.status(201).json(savedLogs);
  } catch (err) {
    console.error("API error adding bulk activities:", err);
    res.status(500).json({ error: 'Failed to save bulk activities' });
  }
});

// Update Activity API
app.put('/api/activities/:id', authenticateToken, async (req, res) => {
  const { date, activity, duration, productivity, notes, startTime, endTime } = req.body;
  if (!date || !activity || !duration || !productivity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const changes = await dbService.updateActivity(req.user.id, req.params.id, {
      date,
      activity,
      duration: parseFloat(duration),
      productivity: parseInt(productivity),
      notes: notes || '',
      startTime: startTime || null,
      endTime: endTime || null
    });
    if (changes === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity updated successfully' });
  } catch (err) {
    console.error("API error updating activity:", err);
    res.status(500).json({ error: 'Failed to update activity log' });
  }
});

// 9. AI Wellness Mentor API (RAG-Enabled)
app.post('/api/mentor/consult', authenticateToken, async (req, res) => {
  const { text, lang } = req.body;
  const targetLang = lang || 'fa';
  if (!text) {
    return res.status(400).json({ error: 'Text input is required' });
  }

  try {
    // 1. Fetch user data from SQLite
    const [activities, journals] = await Promise.all([
      dbService.getActivities(req.user.id),
      dbService.getJournalEntries(req.user.id)
    ]);

    // 2. Load psychology guidelines
    const guidelines = require('./services/psychology_guidelines.json');

    // 3. Heuristic Retrieval (RAG)
    const retrievedGuidelines = {
      cognitive_reframing: guidelines.cognitive_reframing // always retrieve CBT reframing
    };

    const textLower = text.toLowerCase();
    
    // Check for Burnout indicators
    const burnoutKeywords = ['خسته', 'فرسوده', 'برید', 'انرژی', 'tired', 'burnout', 'exhausted', 'fatigue', 'müde', 'erschöpft'];
    const hasBurnoutKeyword = burnoutKeywords.some(kw => textLower.includes(kw));
    
    // Check recent work hours (e.g. past 7 days)
    const recentLogs = activities.slice(0, 15);
    const workDurationSum = recentLogs
      .filter(act => act.activity === 'Work')
      .reduce((sum, act) => sum + act.duration, 0);
    const averageWorkHours = recentLogs.length > 0 ? (workDurationSum / 7) : 0;

    if (hasBurnoutKeyword || averageWorkHours > 6) {
      retrievedGuidelines.burnout = guidelines.burnout;
    }

    // Check for social connection indicators
    const socialKeywords = ['تنها', 'خانواده', 'دوست', 'همسر', 'بچه', 'پدر', 'مادر', 'lonely', 'family', 'friend', 'social', 'isolation', 'allein', 'familie', 'freund'];
    const hasSocialKeyword = socialKeywords.some(kw => textLower.includes(kw));
    
    const leisureLogs = recentLogs.filter(act => act.activity === 'Leisure');
    const hasNoLeisure = leisureLogs.length === 0;

    if (hasSocialKeyword || hasNoLeisure) {
      retrievedGuidelines.social_connection = guidelines.social_connection;
      retrievedGuidelines.behavioral_activation = guidelines.behavioral_activation;
    }

    // 4. Construct prompt
    const prompt = `
      You are an empathetic, professional AI Wellness Mentor and Psychologist. Based on the user's recent routine logs and journal entries, provide comforting, cognitive reframing, and actionable advice.
      
      Target Language: ${targetLang} (Strictly respond in this language!)
      
      User's Current Message (Venting/Thoughts):
      "${text}"
      
      Retrieved Psychological Guidelines (RAG Knowledge Base):
      ${JSON.stringify(retrievedGuidelines, null, 2)}
      
      User's Historical Data (Retrieved Context):
      - Recent Activities (Last 15 logs):
      ${JSON.stringify(activities.slice(0, 15), null, 2)}
      - Recent Journal Entries (Last 7 entries):
      ${JSON.stringify(journals.slice(0, 7), null, 2)}
      
      Instructions:
      - Gently analyze their current state relative to their historical logs. For example, if they express fatigue, check if they worked long hours or had zero leisure recently, and point it out using their actual data (e.g., "من متوجه شدم شما در هفته گذشته در مجموع ${workDurationSum} ساعت کار ثبت کردید ولی تفریحی نداشتید...").
      - Incorporate the retrieved psychological guidelines (such as CBT reframing, setting boundaries, or social connection recommendations) to explain why they feel this way and how to improve.
      - Keep your tone extremely warm, empathetic, and professional.
      - Format the response beautifully using Markdown with clear bold titles, bullet points, and helpful emojis. Do not use generic placeholders.
    `;

    const keys = [process.env.GEMINI_API_KEY, process.env.GEMINI_API_KEY_BACKUP].filter(k => k && k !== 'YOUR_GEMINI_API_KEY_HERE');
    
    if (keys.length === 0) {
      const fallbackMsgs = {
        fa: "🔑 کلید API معتبر در تنظیمات تعریف نشده است. امکان مشاوره وجود ندارد.",
        en: "🔑 API key is not configured. Wellness Mentor is unavailable.",
        de: "🔑 API-Schlüssel ist nicht konfiguriert. Wellness Mentor ist nicht verfügbar."
      };
      return res.json({ advice: fallbackMsgs[targetLang] });
    }

    let adviceText = null;
    let geminiErr = null;

    for (const apiKey of keys) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);
        adviceText = result.response.text();
        break;
      } catch (err) {
        console.warn(`Gemini AI wellness mentor failed for key starting with ${apiKey.substring(0, 8)}..., trying next key`, err);
        geminiErr = err;
      }
    }

    if (adviceText) {
      res.json({ advice: adviceText });
    } else {
      console.error("AI mentor generation failed with Gemini error:", geminiErr);
      res.status(500).json({ error: 'Failed to generate AI mentor advice' });
    }

  } catch (err) {
    console.error("AI wellness mentor failed:", err);
    res.status(500).json({ error: 'Failed to process AI mentor request' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`SyncRoutine Commercial Server listening on port ${PORT}`);
});

