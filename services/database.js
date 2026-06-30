const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const dbPath = process.env.DATABASE_PATH || './routine_assistant.db';

// Ensure parent directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err);
  } else {
    console.log(`Connected to SQLite database at: ${dbPath}`);
    initializeDatabase();
  }
});

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function initializeDatabase() {
  db.serialize(() => {
    // 1. Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        lang TEXT DEFAULT 'fa'
      )
    `);

    // 2. Create activities table
    db.run(`
      CREATE TABLE IF NOT EXISTS activities (
        id TEXT PRIMARY KEY,
        userId TEXT,
        date TEXT NOT NULL,
        activity TEXT NOT NULL,
        duration REAL NOT NULL,
        productivity INTEGER NOT NULL,
        notes TEXT,
        startTime TEXT,
        endTime TEXT
      )
    `);

    // 3. Create journal_entries table
    db.run(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id TEXT PRIMARY KEY,
        userId TEXT,
        date TEXT NOT NULL,
        content TEXT NOT NULL,
        sentiment TEXT,
        mood_emoji TEXT,
        mood_label TEXT
      )
    `);

    // 4. Create tasks table
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        userId TEXT,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        dueDate TEXT,
        requiresPrep INTEGER DEFAULT 0,
        completed INTEGER DEFAULT 0
      )
    `);

    // 5. Create birthdays table
    db.run(`
      CREATE TABLE IF NOT EXISTS birthdays (
        id TEXT PRIMARY KEY,
        userId TEXT,
        name TEXT NOT NULL,
        date TEXT NOT NULL
      )
    `);

    // 6. Create schedules table
    db.run(`
      CREATE TABLE IF NOT EXISTS schedules (
        id TEXT PRIMARY KEY,
        userId TEXT,
        time TEXT NOT NULL,
        activity TEXT NOT NULL,
        completed INTEGER DEFAULT 0
      )
    `);

    // 7. Create user_medals table
    db.run(`
      CREATE TABLE IF NOT EXISTS user_medals (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        date TEXT NOT NULL,
        habitType TEXT NOT NULL,
        completed INTEGER DEFAULT 1
      )
    `);

    // 7.5. Create custom_habits table
    db.run(`
      CREATE TABLE IF NOT EXISTS custom_habits (
        id TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        habitKey TEXT NOT NULL,
        habitName TEXT NOT NULL,
        habitEmoji TEXT NOT NULL,
        habitDesc TEXT NOT NULL,
        UNIQUE(userId, habitKey)
      )
    `);

    // --- Migrations for existing DBs: Add userId column if not present ---
    const tables = ['activities', 'journal_entries', 'tasks', 'birthdays'];
    tables.forEach(table => {
      db.run(`ALTER TABLE ${table} ADD COLUMN userId TEXT`, (err) => {
        // Ignore errors about duplicate column (implies it already exists)
        if (err && !err.message.includes('duplicate column name')) {
          // Some versions of sqlite show different error messages
          if (!err.message.includes('already exists')) {
            console.log(`Migration log for table ${table}: ${err.message}`);
          }
        }
      });
    });

    // Migrate users table: Add telegramChatId column
    db.run(`ALTER TABLE users ADD COLUMN telegramChatId TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name') && !err.message.includes('already exists')) {
        console.log(`Migration log for users table: ${err.message}`);
      }
    });

    // Migrate activities table: Add startTime and endTime columns
    db.run(`ALTER TABLE activities ADD COLUMN startTime TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name') && !err.message.includes('already exists')) {
        console.log(`Migration log for activities startTime: ${err.message}`);
      }
    });
    db.run(`ALTER TABLE activities ADD COLUMN endTime TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name') && !err.message.includes('already exists')) {
        console.log(`Migration log for activities endTime: ${err.message}`);
      }
    });

    // Migrate journal_entries table: Add mood_emoji and mood_label columns
    db.run(`ALTER TABLE journal_entries ADD COLUMN mood_emoji TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name') && !err.message.includes('already exists')) {
        console.log(`Migration log for journal_entries mood_emoji: ${err.message}`);
      }
    });
    db.run(`ALTER TABLE journal_entries ADD COLUMN mood_label TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name') && !err.message.includes('already exists')) {
        console.log(`Migration log for journal_entries mood_label: ${err.message}`);
      }
    });

    console.log('Database tables initialized.');
  });
}

// Database helper methods
const dbService = {
  getFirstUserId: () => {
    return new Promise((resolve) => {
      db.get('SELECT id FROM users LIMIT 1', [], (err, row) => {
        if (err || !row) resolve('default_user');
        else resolve(row.id);
      });
    });
  },

  getUserByTelegramChatId: (chatId) => {
    return new Promise((resolve) => {
      db.get('SELECT * FROM users WHERE telegramChatId = ?', [chatId.toString()], (err, row) => {
        if (err || !row) resolve(null);
        else resolve(row);
      });
    });
  },

  linkTelegramChatId: (username, chatId) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE users SET telegramChatId = ? WHERE username = ?',
        [chatId.toString(), username],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  // User Authentication
  registerUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const id = Date.now().toString();
      const hashedPassword = hashPassword(password);
      db.run(
        'INSERT INTO users (id, username, password) VALUES (?, ?, ?)',
        [id, username, hashedPassword],
        function (err) {
          if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
              reject(new Error('USERNAME_TAKEN'));
            } else {
              reject(err);
            }
          } else {
            dbService.seedUserData(id);
            resolve({ id, username, lang: 'fa' });
          }
        }
      );
    });
  },

  loginUser: (username, password) => {
    return new Promise((resolve, reject) => {
      const hashedPassword = hashPassword(password);
      db.get(
        'SELECT id, username, lang FROM users WHERE username = ? AND password = ?',
        [username, hashedPassword],
        (err, row) => {
          if (err) reject(err);
          else if (!row) reject(new Error('INVALID_CREDENTIALS'));
          else resolve(row); // returns { id, username, lang }
        }
      );
    });
  },

  updateUserLang: (userId, lang) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE users SET lang = ? WHERE id = ?', [lang, userId], function(err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  },

  // Activities Table Actions
  getActivities: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM activities WHERE userId = ? ORDER BY date DESC, id DESC', 
        [userId], 
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  addActivity: (userId, activityLog) => {
    const { id, date, activity, duration, productivity, notes, startTime, endTime } = activityLog;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO activities (id, userId, date, activity, duration, productivity, notes, startTime, endTime) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, userId, date, activity, duration, productivity, notes, startTime, endTime],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...activityLog });
        }
      );
    });
  },

  deleteActivity: (userId, id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM activities WHERE id = ? AND userId = ?', [id, userId], function (err) {
        if (err) reject(err);
        else resolve({ deletedCount: this.changes });
      });
    });
  },

  updateActivity: (userId, id, activityLog) => {
    const { date, activity, duration, productivity, notes, startTime, endTime } = activityLog;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE activities 
         SET date = ?, activity = ?, duration = ?, productivity = ?, notes = ?, startTime = ?, endTime = ?
         WHERE id = ? AND userId = ?`,
        [date, activity, duration, productivity, notes, startTime, endTime, id, userId],
        function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        }
      );
    });
  },

  // Journal Entries Actions
  getJournalEntries: (userId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM journal_entries WHERE userId = ? ORDER BY date DESC', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addJournalEntry: (userId, entry) => {
    const { id, date, content, sentiment, mood_emoji, mood_label } = entry;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO journal_entries (id, userId, date, content, sentiment, mood_emoji, mood_label) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, userId, date, content, sentiment, mood_emoji || null, mood_label || null],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...entry });
        }
      );
    });
  },

  deleteJournalEntry: (userId, id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM journal_entries WHERE id = ? AND userId = ?', [id, userId], function (err) {
        if (err) reject(err);
        else resolve({ deletedCount: this.changes });
      });
    });
  },

  // Anniversary Finder (Query matching same Month-Day but different year)
  getAnniversaries: (userId, dateStr) => {
    return new Promise((resolve, reject) => {
      const parts = dateStr.split('-');
      if (parts.length < 3) return resolve([]);
      const mmDd = `${parts[1]}-${parts[2]}`;

      db.all(
        `SELECT * FROM journal_entries 
         WHERE strftime('%m-%d', date) = ? AND date != ? AND userId = ? 
         ORDER BY date DESC`,
        [mmDd, dateStr, userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  // Tasks Actions
  getTasks: (userId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM tasks WHERE userId = ? ORDER BY completed ASC, dueDate ASC', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addTask: (userId, task) => {
    const { id, date, title, dueDate, requiresPrep, completed } = task;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO tasks (id, userId, date, title, dueDate, requiresPrep, completed) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, userId, date, title, dueDate, requiresPrep ? 1 : 0, completed ? 1 : 0],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...task });
        }
      );
    });
  },

  updateTask: (userId, id, completed) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE tasks SET completed = ? WHERE id = ? AND userId = ?',
        [completed ? 1 : 0, id, userId],
        function (err) {
          if (err) reject(err);
          else resolve({ updatedCount: this.changes });
        }
      );
    });
  },

  deleteTask: (userId, id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM tasks WHERE id = ? AND userId = ?', [id, userId], function (err) {
        if (err) reject(err);
        else resolve({ deletedCount: this.changes });
      });
    });
  },

  // Birthdays Actions
  getBirthdays: (userId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM birthdays WHERE userId = ? ORDER BY date ASC', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addBirthday: (userId, birthday) => {
    const { id, name, date } = birthday;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO birthdays (id, userId, name, date) VALUES (?, ?, ?, ?)`,
        [id, userId, name, date],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...birthday });
        }
      );
    });
  },

  deleteBirthday: (userId, id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM birthdays WHERE id = ? AND userId = ?', [id, userId], function (err) {
        if (err) reject(err);
        else resolve({ deletedCount: this.changes });
      });
    });
  },

  // Schedules Actions
  getSchedules: (userId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM schedules WHERE userId = ? ORDER BY time ASC', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  addSchedule: (userId, schedule) => {
    const { id, time, activity } = schedule;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO schedules (id, userId, time, activity, completed) VALUES (?, ?, ?, ?, 0)`,
        [id, userId, time, activity],
        function (err) {
          if (err) reject(err);
          else resolve({ id, ...schedule });
        }
      );
    });
  },

  deleteSchedule: (userId, id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM schedules WHERE id = ? AND userId = ?', [id, userId], function (err) {
        if (err) reject(err);
        else resolve({ deletedCount: this.changes });
      });
    });
  },

  seedUserData: (userId) => {
    const today = new Date();
    const activities = [];
    const journals = [];
    
    // Create 10 days of historical logs for June 2026
    for (let i = 9; i >= 0; i--) {
      const logDate = new Date(today);
      logDate.setDate(today.getDate() - i);
      const dateStr = logDate.toISOString().split('T')[0];
      
      activities.push(
        [Date.now().toString() + '_act1_' + i, userId, dateStr, 'Work', parseFloat((5.5 + Math.random() * 2).toFixed(1)), 7 + Math.floor(Math.random() * 3), 'کدنویسی و توسعه فرانت‌اند پروژه روتین'],
        [Date.now().toString() + '_act2_' + i, userId, dateStr, 'Exercise', 1.0, 8 + Math.floor(Math.random() * 3), 'ورزش باشگاه و پیاده‌روی عصرگاهی'],
        [Date.now().toString() + '_act3_' + i, userId, dateStr, 'Study', 1.5, 6 + Math.floor(Math.random() * 3), 'مطالع مستندات فنی و یادگیری زبان']
      );
      
      journals.push(
        [Date.now().toString() + '_jou_' + i, userId, dateStr, `امروز کارهای خوبی برای بهبود روتین روزانه‌ام انجام دادم. تمرکز کافی داشتم و وضعیت سلامتی بدنی‌ام هم عالی بود. امیدوارم روزهای آینده هم با همین روند جلو بروم.`, 'positive']
      );
    }

    db.serialize(() => {
      const actStmt = db.prepare(`
        INSERT INTO activities (id, userId, date, activity, duration, productivity, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      activities.forEach(row => actStmt.run(row));
      actStmt.finalize();

      const jouStmt = db.prepare(`
        INSERT INTO journal_entries (id, userId, date, content, sentiment)
        VALUES (?, ?, ?, ?, ?)
      `);
      journals.forEach(row => jouStmt.run(row));
      jouStmt.finalize();
      
      const tasks = [
        [Date.now().toString() + '_t1', userId, today.toISOString().split('T')[0], 'پایان‌نامه دانشگاه و تحقیقات', today.toISOString().split('T')[0], 1, 0],
        [Date.now().toString() + '_t2', userId, today.toISOString().split('T')[0], 'خرید اقلام خانه و کارهای تمیزکاری', today.toISOString().split('T')[0], 0, 0]
      ];
      const taskStmt = db.prepare(`
        INSERT INTO tasks (id, userId, date, title, dueDate, requiresPrep, completed)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `);
      tasks.forEach(row => taskStmt.run(row));
      taskStmt.finalize();

      // Seed medals
      const medals = [];
      for (let i = 9; i >= 0; i--) {
        const logDate = new Date(today);
        logDate.setDate(today.getDate() - i);
        const dateStr = logDate.toISOString().split('T')[0];
        
        if (i % 2 === 0) {
          medals.push([`${userId}_${dateStr}_reading`, userId, dateStr, 'reading', 1]);
        }
        if (i !== 3 && i !== 7) {
          medals.push([`${userId}_${dateStr}_exercise`, userId, dateStr, 'exercise', 1]);
        }
        if (i % 3 !== 0) {
          medals.push([`${userId}_${dateStr}_meditation`, userId, dateStr, 'meditation', 1]);
        }
      }
      const medalStmt = db.prepare(`
        INSERT OR REPLACE INTO user_medals (id, userId, date, habitType, completed)
        VALUES (?, ?, ?, ?, ?)
      `);
      medals.forEach(row => medalStmt.run(row));
      medalStmt.finalize();
    });
  },

  // Medals Actions
  getMedals: (userId) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM user_medals WHERE userId = ?', [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  toggleMedal: (userId, date, habitType, completed) => {
    const id = `${userId}_${date}_${habitType}`;
    return new Promise((resolve, reject) => {
      if (completed) {
        db.run(
          `INSERT OR REPLACE INTO user_medals (id, userId, date, habitType, completed) VALUES (?, ?, ?, ?, 1)`,
          [id, userId, date, habitType],
          function (err) {
            if (err) reject(err);
            else resolve({ id, userId, date, habitType, completed: 1 });
          }
        );
      } else {
        db.run(
          `DELETE FROM user_medals WHERE id = ?`,
          [id],
          function (err) {
            if (err) reject(err);
            else resolve({ id, userId, date, habitType, completed: 0 });
          }
        );
      }
    });
  },

  getCustomHabits: (userId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM custom_habits WHERE userId = ?`, [userId], (err, rows) => {
        if (err) return reject(err);
        
        if (rows.length === 0) {
          const defaults = [
            { id: `${userId}_reading`, userId, habitKey: 'reading', habitName: 'مطالعه کتاب (حداقل ۱ صفحه)', habitEmoji: '📖', habitDesc: 'عادت روزانه' },
            { id: `${userId}_meditation`, userId, habitKey: 'meditation', habitName: 'مدیتیشن و تمرکز (حداقل ۱ دقیقه)', habitEmoji: '🧘', habitDesc: 'عادت روزانه' },
            { id: `${userId}_exercise`, userId, habitKey: 'exercise', habitName: 'ورزش و تندرستی (بدون محدودیت زمان)', habitEmoji: '🏃', habitDesc: 'عادت روزانه' }
          ];
          defaults.forEach(def => {
            db.run(`INSERT OR IGNORE INTO custom_habits (id, userId, habitKey, habitName, habitEmoji, habitDesc) VALUES (?, ?, ?, ?, ?, ?)`,
              [def.id, def.userId, def.habitKey, def.habitName, def.habitEmoji, def.habitDesc]);
          });
          return resolve(defaults);
        }
        resolve(rows);
      });
    });
  },

  addCustomHabit: (userId, habit) => {
    const id = Date.now().toString() + Math.random().toString().substring(2, 6);
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO custom_habits (id, userId, habitKey, habitName, habitEmoji, habitDesc) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, userId, habit.habitKey, habit.habitName, habit.habitEmoji, habit.habitDesc],
        function(err) {
          if (err) return reject(err);
          resolve({ id, userId, ...habit });
        }
      );
    });
  }
};

module.exports = dbService;
