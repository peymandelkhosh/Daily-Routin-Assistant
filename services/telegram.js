const TelegramBot = require('node-telegram-bot-api');
const parser = require('./parser');
const dbService = require('./database');

let bot = null;
const tempLogs = {}; // Cache for pending confirmations

function startTelegramBot() {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (process.env.DISABLE_TELEGRAM_BOT === 'true') {
    console.log("Telegram Bot polling is disabled in this environment.");
    return;
  }

  if (!token || token === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
    console.warn("TELEGRAM_BOT_TOKEN is not configured. Telegram bot service will not start.");
    return;
  }

  try {
    bot = new TelegramBot(token, { polling: true });
    console.log("Telegram Bot polling started successfully.");

    // Handle incoming messages
    bot.on('message', async (msg) => {
      const chatId = msg.chat.id;

      // Handle Bot Commands like /start
      if (msg.text && msg.text.startsWith('/')) {
        handleCommands(msg);
        return;
      }

      try {
        let parsed = null;

        // A. Handle VOICE message
        if (msg.voice) {
          bot.sendChatAction(chatId, 'record_audio');
          
          // Get the voice note file link from Telegram
          const fileInfo = await bot.getFile(msg.voice.file_id);
          const fileLink = `https://api.telegram.org/file/bot${token}/${fileInfo.file_path}`;

          // Fetch the voice note (.ogg file) from Telegram server
          const response = await fetch(fileLink);
          if (!response.ok) {
            bot.sendMessage(chatId, '❌ خطا در دریافت فایل صوتی از تلگرام.');
            return;
          }
          const arrayBuffer = await response.arrayBuffer();
          const base64Audio = Buffer.from(arrayBuffer).toString('base64');

          bot.sendChatAction(chatId, 'typing');
          
          // Use Gemini multimodal parser to analyze audio directly!
          parsed = await parser.parseAudio(base64Audio, 'audio/ogg', 'fa');
        } 
        // B. Handle TEXT message
        else if (msg.text) {
          bot.sendChatAction(chatId, 'typing');
          parsed = await parser.parseText(msg.text, 'fa');
        } else {
          // Unsupported message type
          return;
        }

        if (!parsed) {
          bot.sendMessage(chatId, '❌ تحلیل پیام موفقیت‌آمیز نبود.');
          return;
        }

        // Cache the parsed item with a unique temp ID
        const tempId = `temp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        tempLogs[tempId] = {
          chatId,
          parsed,
          timestamp: Date.now()
        };

        if (parsed.type === 'activity') {
          const icons = { Work: '💼 کار', Study: '📚 مطالعه', Exercise: '🏃 ورزش', Leisure: '🎮 تفریح', Sleep: '😴 خواب', Chores: '🧹 کارهای خانه' };
          const activityName = icons[parsed.activity] || parsed.activity;

          const responseText = `🔍 **ثبت فعالیت صوتی/متنی تشخیص داده شد:**\n\n` +
            `🔹 **موضوع:** ${activityName}\n` +
            `⏱ **مدت زمان:** ${parsed.duration} ساعت\n` +
            `⚡️ **بهره‌وری:** ${parsed.productivity} از ۱۰\n` +
            `📝 **یادداشت:** ${parsed.notes || '-'}\n\n` +
            `آیا این فعالیت ثبت شود؟`;

          bot.sendMessage(chatId, responseText, {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ بله، ثبت شود', callback_data: `confirm:${tempId}` },
                  { text: '❌ خیر، لغو شود', callback_data: `cancel:${tempId}` }
                ]
              ]
            }
          });
        } else if (parsed.type === 'journal') {
          const sentiments = { positive: '😊 مثبت', neutral: '😐 خنثی', negative: '😞 منفی' };
          const sentimentName = sentiments[parsed.sentiment] || parsed.sentiment;

          const responseText = `📖 **ثبت یادداشت روزانه تشخیص داده شد:**\n\n` +
            `💬 **متن:** ${parsed.content}\n` +
            `🎭 **احساس:** ${sentimentName}\n\n` +
            `آیا این یادداشت در دفترچه خاطرات ثبت شود؟`;

          bot.sendMessage(chatId, responseText, {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ بله، ثبت شود', callback_data: `confirm:${tempId}` },
                  { text: '❌ خیر، لغو شود', callback_data: `cancel:${tempId}` }
                ]
              ]
            }
          });
        } else if (parsed.type === 'task') {
          const responseText = `🎯 **ثبت تسک جدید تشخیص داده شد:**\n\n` +
            `🔹 **عنوان:** ${parsed.title}\n` +
            `📅 **تاریخ سررسید:** ${parsed.dueDate || '-'}\n` +
            `🛠 **پیش‌نیاز:** ${parsed.requiresPrep ? 'بله' : 'خیر'}\n\n` +
            `آیا این تسک ثبت شود؟`;

          bot.sendMessage(chatId, responseText, {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ بله، ثبت شود', callback_data: `confirm:${tempId}` },
                  { text: '❌ خیر، لغو شود', callback_data: `cancel:${tempId}` }
                ]
              ]
            }
          });
        } else if (parsed.type === 'schedule') {
          const responseText = `⏰ **برنامه زمانی جدید تشخیص داده شد:**\n\n` +
            `🔹 **ساعت:** ${parsed.time}\n` +
            `💼 **فعالیت:** ${parsed.activity}\n\n` +
            `آیا این برنامه ثبت شود؟`;

          bot.sendMessage(chatId, responseText, {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ بله، ثبت شود', callback_data: `confirm:${tempId}` },
                  { text: '❌ خیر، لغو شود', callback_data: `cancel:${tempId}` }
                ]
              ]
            }
          });
        } else if (parsed.type === 'birthday') {
          const responseText = `🎂 **ثبت تاریخ تولد جدید تشخیص داده شد:**\n\n` +
            `🔹 **نام:** ${parsed.name}\n` +
            `📅 **تاریخ:** ${parsed.date}\n\n` +
            `آیا این تولد ثبت شود؟`;

          bot.sendMessage(chatId, responseText, {
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ بله، ثبت شود', callback_data: `confirm:${tempId}` },
                  { text: '❌ خیر، لغو شود', callback_data: `cancel:${tempId}` }
                ]
              ]
            }
          });
        } else {
          bot.sendMessage(chatId, 'متوجه نوع درخواست شما نشدم. لطفاً جمله‌ای مثل "۲ ساعت درس خواندم" یا "تولدم را اضافه کن" ارسال کرده یا صحبت کنید.');
        }

      } catch (err) {
        console.error("Error handling telegram message:", err);
        if (err.message === 'GEMINI_API_KEY_NOT_CONFIGURED') {
          bot.sendMessage(chatId, '🔑 کلید API جمینی در سرور تنظیم نشده است. صوت قابل پردازش نیست.');
        } else {
          const errMsg = err.message || '';
          if (errMsg.includes('depleted') || errMsg.includes('billing') || err.status === 429) {
            bot.sendMessage(chatId, '❌ خطای اعتباری جمینی: اعتبار حساب شما در گوگل به پایان رسیده است یا نیاز به فعال‌سازی پرداخت دارد.');
          } else {
            bot.sendMessage(chatId, 'مشکلی در پردازش پیام یا صوت به وجود آمد. لطفاً دوباره تلاش کنید.');
          }
        }
      }
    });

    // Handle Button Callback queries
    bot.on('callback_query', async (callbackQuery) => {
      const action = callbackQuery.data;
      const msg = callbackQuery.message;
      const chatId = msg.chat.id;

      const [type, tempId] = action.split(':');
      const cached = tempLogs[tempId];

      if (!cached) {
        bot.answerCallbackQuery(callbackQuery.id, { text: 'خطا: درخواست منقضی شده است.', show_alert: true });
        bot.editMessageText('⚠️ این درخواست منقضی شده است.', { chat_id: chatId, message_id: msg.message_id });
        return;
      }

      if (type === 'confirm') {
        bot.answerCallbackQuery(callbackQuery.id, { text: 'در حال ثبت در دیتابیس...' });
        
        try {
          const { parsed } = cached;
          const today = new Date().toISOString().split('T')[0];

          // Fetch user linked to this Telegram chat
          const user = await dbService.getUserByTelegramChatId(chatId);
          if (!user) {
            bot.sendMessage(chatId, '⚠️ اکانت تلگرام شما به هیچ کاربری در وب‌اپلیکیشن متصل نیست!\nلطفاً ابتدا با دستور زیر اکانت خود را متصل کنید:\n`/link username`', { parse_mode: 'Markdown' });
            return;
          }
          const userId = user.id;

          if (parsed.type === 'activity') {
            await dbService.addActivity(userId, {
              id: Date.now().toString(),
              date: today,
              activity: parsed.activity,
              duration: parsed.duration,
              productivity: parsed.productivity,
              notes: parsed.notes
            });
            bot.editMessageText('✅ فعالیت شما با موفقیت در دیتابیس ثبت شد!', { chat_id: chatId, message_id: msg.message_id });
          } else if (parsed.type === 'journal') {
            await dbService.addJournalEntry(userId, {
              id: Date.now().toString(),
              date: today,
              content: parsed.content,
              sentiment: parsed.sentiment
            });
            bot.editMessageText('✅ یادداشت روزانه شما با موفقیت ثبت شد!', { chat_id: chatId, message_id: msg.message_id });
          } else if (parsed.type === 'task') {
            await dbService.addTask(userId, {
              id: Date.now().toString(),
              date: today,
              title: parsed.title,
              dueDate: parsed.dueDate || today,
              requiresPrep: parsed.requiresPrep ? 1 : 0,
              completed: 0
            });
            bot.editMessageText('✅ تسک جدید شما با موفقیت ثبت شد!', { chat_id: chatId, message_id: msg.message_id });
          } else if (parsed.type === 'schedule') {
            await dbService.addSchedule(userId, {
              id: Date.now().toString(),
              time: parsed.time,
              activity: parsed.activity
            });
            bot.editMessageText('✅ برنامه زمانی جدید با موفقیت ثبت شد!', { chat_id: chatId, message_id: msg.message_id });
          } else if (parsed.type === 'birthday') {
            await dbService.addBirthday(userId, {
              id: Date.now().toString(),
              name: parsed.name,
              date: parsed.date
            });
            bot.editMessageText('✅ تاریخ تولد با موفقیت ثبت شد!', { chat_id: chatId, message_id: msg.message_id });
          }
        } catch (dbErr) {
          console.error("Database save failed via telegram:", dbErr);
          bot.sendMessage(chatId, '❌ خطا در ذخیره در دیتابیس.');
        }
      } else {
        bot.answerCallbackQuery(callbackQuery.id, { text: 'درخواست لغو شد.' });
        bot.editMessageText('❌ ثبت فعالیت لغو شد.', { chat_id: chatId, message_id: msg.message_id });
      }

      // Cleanup cache
      delete tempLogs[tempId];
    });

  } catch (err) {
    console.error("Failed to start Telegram Bot polling:", err);
  }
}

function handleCommands(msg) {
  const chatId = msg.chat.id;
  const tokens = msg.text.split(' ');
  const command = tokens[0];

  if (command === '/start') {
    bot.sendMessage(chatId, 
      `👋سلام! به دستیار هوشمند روتین (SyncRoutine) خوش آمدید.\n\n` +
      `من پیام‌های صوتی (ویس) یا متنی شما را با هوش مصنوعی جمینی تحلیل کرده و روتین روزانه‌تان را ثبت می‌کنم.\n\n` +
      `🔗 **اتصال به وب‌اپلیکیشن:**\n` +
      `برای اینکه اطلاعات شما در داشبورد ثبت شود، ابتدا باید اکانت تلگرام خود را با دستور زیر متصل کنید:\n` +
      `/link username\n` +
      `(به جای username، نام کاربری ثبت‌نام شده در وب‌اپلیکیشن را وارد کنید)\n\n` +
      `🎙 **می‌توانید پیام صوتی بفرستید:**\n` +
      `مثلا یک ویس بفرستید و بگویید: "امروز ۲ ساعت برنامه نویسی کردم عالی بود"\n\n` +
      `💡 **مثال‌های متنی:**\n` +
      `• "امروز ۲ ساعت ورزش کردم و پر انرژی بودم"\n` +
      `• "۳ ساعت روی پایان‌نامه کار کردم کلافه بودم"\n` +
      `• "احساس می‌کنم امروز خیلی خسته‌ام و نیاز به استراحت دارم"\n\n` +
      `من پیام شما را آنالیز کرده و دکمه تایید برای ثبت برایتان می‌فرستم.`
    );
  } else if (command === '/link') {
    const username = tokens[1];
    if (!username) {
      bot.sendMessage(chatId, '⚠️ لطفا نام کاربری خود را بعد از دستور وارد کنید.\nمثال: `/link my_username`', { parse_mode: 'Markdown' });
      return;
    }
    
    dbService.linkTelegramChatId(username, chatId)
      .then(changes => {
        if (changes > 0) {
          bot.sendMessage(chatId, `✅ ربات تلگرام شما با موفقیت به اکانت کاربری *${username}* متصل شد! از این به بعد تمام فعالیت‌های تایید شده در داشبورد این کاربری نمایش داده می‌شوند.`, { parse_mode: 'Markdown' });
        } else {
          bot.sendMessage(chatId, `❌ کاربری با نام *${username}* یافت نشد. لطفا ابتدا در وب‌اپلیکیشن ثبت‌نام کنید.`, { parse_mode: 'Markdown' });
        }
      })
      .catch(err => {
        console.error("Link failed:", err);
        bot.sendMessage(chatId, '❌ خطا در فرآیند اتصال اکانت.');
      });
  }
}

// Cleanup cache
setInterval(() => {
  const now = Date.now();
  Object.keys(tempLogs).forEach(id => {
    if (now - tempLogs[id].timestamp > 1000 * 60 * 15) { // 15 mins expiry
      delete tempLogs[id];
    }
  });
}, 1000 * 60 * 60);

module.exports = {
  startTelegramBot
};
