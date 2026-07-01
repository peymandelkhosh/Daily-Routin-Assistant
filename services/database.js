const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const gcsSync = require('./gcs_sync');

const dbPath = process.env.DATABASE_PATH || './routine_assistant.db';

// Ensure parent directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db = null;
let lastSyncCheck = 0;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Failed to connect to SQLite database:', err);
      } else {
        console.log(`Connected to SQLite database at: ${dbPath}`);
        initializeDatabase();
      }
    });
  }
  return db;
}

function closeDbConnection() {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) console.error('Error closing DB:', err);
        db = null;
        resolve();
      });
    } else {
      resolve();
    }
  });
}

async function ensureFreshDb() {
  const now = Date.now();
  if (now - lastSyncCheck > 10000) { // 10s throttle
    lastSyncCheck = now;
    try {
      const isNew = await gcsSync.syncIfNeeded();
      if (isNew) {
        console.log('Database updated from GCS, closing and reopening connection...');
        await closeDbConnection();
        getDb();
      }
    } catch (err) {
      console.error('Error checking GCS sync:', err.message);
    }
  }
}

// Open initial database connection
getDb();

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
        endTime TEXT,
        associatedMedalKeys TEXT
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

    db.run(`ALTER TABLE activities ADD COLUMN associatedMedalKeys TEXT`, (err) => {
      if (err && !err.message.includes('duplicate column name') && !err.message.includes('already exists')) {
        console.log(`Migration log for activities associatedMedalKeys: ${err.message}`);
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
    const { id, date, activity, duration, productivity, notes, startTime, endTime, associatedMedalKeys } = activityLog;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO activities (id, userId, date, activity, duration, productivity, notes, startTime, endTime, associatedMedalKeys) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, userId, date, activity, duration, productivity, notes, startTime, endTime, associatedMedalKeys || null],
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
    const { date, activity, duration, productivity, notes, startTime, endTime, associatedMedalKeys } = activityLog;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE activities 
         SET date = ?, activity = ?, duration = ?, productivity = ?, notes = ?, startTime = ?, endTime = ?, associatedMedalKeys = ?
         WHERE id = ? AND userId = ?`,
        [date, activity, duration, productivity, notes, startTime, endTime, associatedMedalKeys || null, id, userId],
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
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        // Delete existing mock data for June 2026 to avoid duplicates
        db.run("DELETE FROM activities WHERE userId = ? AND date LIKE '2026-06-%'", [userId], (err) => { if(err) console.error(err); });
        db.run("DELETE FROM journal_entries WHERE userId = ? AND date LIKE '2026-06-%'", [userId], (err) => { if(err) console.error(err); });
        db.run("DELETE FROM user_medals WHERE userId = ? AND date LIKE '2026-06-%'", [userId], (err) => { if(err) console.error(err); });

        const activities = [];
        const journals = [];
        const medals = [];

        const moods = [
          { emoji: '🧘', label: 'Peaceful', sentiment: 'positive', content: 'Had an amazing focus today. Daily routines including study and meditation were completed on time, and I feel a deep sense of mental peace.' },
          { emoji: '😊', label: 'Happy', sentiment: 'positive', content: 'Very energetic and happy day! Met all my athletic and reading goals, and had a great time socializing.' },
          { emoji: '💪', label: 'Motivated', sentiment: 'positive', content: 'Today\'s workouts went great. Feel strong and highly motivated to learn new concepts.' },
          { emoji: '🔥', label: 'Productive', sentiment: 'positive', content: 'Extremely productive work day. Deep focus on problem solving and all habits are checked.' }
        ];

        for (let day = 1; day <= 30; day++) {
          const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
          
          const randId1 = `act1_june_${day}_${Math.floor(Math.random()*1000)}`;
          const randId2 = `act2_june_${day}_${Math.floor(Math.random()*1000)}`;
          const randId3 = `act3_june_${day}_${Math.floor(Math.random()*1000)}`;

          activities.push(
            [randId1, userId, dateStr, 'Study', 1.5, 8, `Study time management book, page ${day} to ${day + 10}`, '14:00', '15:30', 'reading'],
            [randId2, userId, dateStr, 'Exercise', 1.0, 9, 'Pilates workout and core flexibility routine', '17:00', '18:00', 'exercise'],
            [randId3, userId, dateStr, 'Meditation', 0.5, 10, 'Mindfulness meditation and morning stress control', '08:00', '08:30', 'meditation']
          );

          medals.push(
            [`${userId}_${dateStr}_reading`, userId, dateStr, 'reading', 1],
            [`${userId}_${dateStr}_exercise`, userId, dateStr, 'exercise', 1],
            [`${userId}_${dateStr}_meditation`, userId, dateStr, 'meditation', 1]
          );

          const mood = moods[day % moods.length];
          const randIdJou = `jou_june_${day}_${Math.floor(Math.random()*1000)}`;
          journals.push(
            [randIdJou, userId, dateStr, mood.content, mood.sentiment, mood.emoji, mood.label]
          );
        }

        const actStmt = db.prepare(`
          INSERT INTO activities (id, userId, date, activity, duration, productivity, notes, startTime, endTime, associatedMedalKeys)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        activities.forEach(row => actStmt.run(row));
        actStmt.finalize();

        const jouStmt = db.prepare(`
          INSERT INTO journal_entries (id, userId, date, content, sentiment, mood_emoji, mood_label)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        journals.forEach(row => jouStmt.run(row));
        jouStmt.finalize();

        const medalStmt = db.prepare(`
          INSERT OR REPLACE INTO user_medals (id, userId, date, habitType, completed)
          VALUES (?, ?, ?, ?, ?)
        `);
        medals.forEach(row => medalStmt.run(row));
        medalStmt.finalize((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
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

const wrappedDbService = {};
for (const [key, fn] of Object.entries(dbService)) {
  if (typeof fn === 'function') {
    const isWrite = [
      'registerUser', 'addActivity', 'deleteActivity', 'updateActivity', 'addJournalEntry', 'deleteJournalEntry',
      'addTask', 'toggleTaskCompleted', 'deleteTask', 'addBirthday', 'deleteBirthday',
      'addScheduleSlot', 'deleteScheduleSlot', 'toggleScheduleCompleted', 'seedUserData',
      'toggleMedal', 'addCustomHabit'
    ].includes(key);

    wrappedDbService[key] = async function(...args) {
      // Ensure we have the fresh database file from GCS
      await ensureFreshDb();
      // Execute query
      const result = await fn(...args);
      // If it's a write query, upload to GCS immediately
      if (isWrite) {
        // Run upload in background (non-blocking for UI responsiveness)
        gcsSync.uploadDb().catch(err => console.error('Upload GCS error:', err));
      }
      return result;
    };
  } else {
    wrappedDbService[key] = fn;
  }
}

module.exports = wrappedDbService;
