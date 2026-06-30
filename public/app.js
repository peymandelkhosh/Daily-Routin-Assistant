// Translation Dictionaries
const TRANSLATIONS = {
  fa: {
    appTitle: "SyncRoutine",
    appTagline: "دستیار شخصی هوشمند برای پیگیری روتین، بهره‌وری و روزمره‌نویسی صوتی",
    lblStatDuration: "کل زمان پیگیری‌شده",
    lblStatProductivity: "میانگین بهره‌وری امروز",
    lblStatJournals: "کل یادداشت‌های دفترچه",
    tabVoiceTitle: "🎙 ثبت صوتی",
    tabManualTitle: "✏️ ثبت دستی",
    micStatusIdle: "برای صحبت کردن روی میکروفون کلیک کنید",
    micStatusListening: "🎙 در حال شنیدن صدای شما به زبان فارسی... صحبت کنید",
    micStatusParsing: "⏳ در حال تحلیل پیام با هوش مصنوعی جمینی...",
    micStatusSuccess: "✅ تحلیل هوشمند با موفقیت انجام شد.",
    micStatusError: "❌ خطایی رخ داد. دوباره تلاش کنید.",
    lblTranscriptHeader: "متن شنیده شده:",
    lblAiHeader: "تحلیل هوشمند پیام شما:",
    lblManType: "نوع داده",
    optManAct: "💼 ثبت فعالیت روتین",
    optManJou: "📖 یادداشت روزانه",
    lblManDate: "تاریخ",
    lblManCat: "دسته فعالیت",
    lblManStartTime: "ساعت شروع",
    lblManEndTime: "ساعت پایان",
    lblManDuration: "مدت زمان (ساعت)",
    lblManProductivity: "بهره‌وری (۱ - ۱۰)",
    lblManSentiment: "حس و حال کلی",
    lblManNotes: "یادداشت / توضیحات",
    btnManSave: "ذخیره اطلاعات",
    optCatWork: "💼 کار و پروژه",
    optCatStudy: "📚 درس و مطالعه",
    optCatExercise: "🏃 ورزش و باشگاه",
    optCatLeisure: "🎮 تفریح و سرگرمی",
    optCatSleep: "😴 خواب و استراحت",
    optCatChores: "🧹 کارهای خانه",
    optSentPositive: "😊 عالی و پر انرژی",
    optSentNeutral: "😐 معمولی",
    optSentNegative: "😞 خسته یا کلافه",
    footerText: "© ۲۰۲۶ SyncRoutine. سیستم هوشمند کنترل فردی روتین و پیشرفت.",
    lblTasksTitle: "🎯 تسک‌های معوقه و اهداف",
    lblPrepRequired: "نیاز به آمادگی",
    lblAnniversaryTitle: "📅 در همین تاریخ در سال‌های گذشته",
    lblAiPlannerTitle: "🤖 برنامه‌ریز هوشمند فردا (AI)",
    lblAiPlannerDesc: "هوش مصنوعی با تحلیل روتین‌ها، تسک‌های معوقه و تولدها، برای فردا برنامه پیشنهادی می‌سازد.",
    btnGenerateAiPlan: "دریافت برنامه پیشنهادی فردا",
    lblChartsTitle: "📊 نمودارها و تحلیل‌ها",
    btnChartTime: "سهم فعالیت‌ها",
    btnChartProductivity: "روند بهره‌وری",
    lblSettingsTitle: "⚙️ تنظیمات و ثبت تاریخ تولدها",
    btnTabActivities: "جدول فعالیت‌های روزانه",
    btnTabJournal: "دفترچه خاطرات روزانه (Journal)",
    thDate: "تاریخ",
    thActivity: "فعالیت",
    thDuration: "مدت زمان",
    thProductivity: "بهره‌وری",
    thNotes: "توضیحات",
    thAction: "عملیات",
    confirmDelete: "آیا از حذف این مورد مطمئن هستید؟",
    noLogs: "هیچ فعالیتی ثبت نشده است. از ثبت صوتی استفاده کنید!",
    noJournals: "دفترچه خاطرات خالی است. یک خاطره ثبت کنید!",
    categoryNames: {
      Work: '💼 کار و پروژه',
      Study: '📚 درس و مطالعه',
      Exercise: '🏃 ورزش و باشگاه',
      Leisure: '🎮 تفریح و سرگرمی',
      Sleep: '😴 خواب و استراحت',
      Chores: '🧹 کارهای خانه'
    },
    sentiments: {
      positive: '😊 مثبت و شاد',
      neutral: '😐 معمولی',
      negative: '😞 بی‌حوصله/خسته'
    },
    badgeTypeAct: '💼 فعالیت روتین',
    badgeTypeJou: '📖 یادداشت روزانه',
    badgeTypeTask: '🎯 تسک جدید',
    badgeTypeSchedule: '⏰ برنامه زمانی',
    badgeTypeBirthday: '🎂 ثبت تولد',
    lblTitle: 'عنوان:',
    lblDueDate: 'تاریخ سررسید:',
    lblTime: 'ساعت:',
    lblActivity: 'فعالیت:',
    lblName: 'نام:',
    lblBdayDate: 'تاریخ تولد:',
    lblType: 'نوع ثبت:',
    lblCat: 'دسته فعالیت:',
    lblDuration: 'مدت زمان:',
    lblProdGuess: 'بهره‌وری حدس زده شده:',
    lblNotesSum: 'خلاصه یادداشت:',
    lblSentiment: 'حس و حال:',
    lblContentSum: 'خلاصه متن:',
    btnConfirm: '✅ ثبت اطلاعات',
    btnCancel: '❌ انصراف',
    bdayNamePlaceholder: "نام مخاطب (مثال: سینا)",
    bdayDatePlaceholder: "تاریخ تولد (فرمت: MM-DD)",
    btnBdaySave: "ثبت تولد",
    taskPlaceholder: "کار جدید (مثال: پایان‌نامه...)",
    overdue: "گذشته",
    requiresPrepShort: "پیش‌نیاز دارد",
    
    // Auth translations
    authLogin: "ورود",
    authSignup: "ثبت‌نام",
    lblUsername: "نام کاربری",
    lblPassword: "کلمه عبور",
    usernameTaken: "❌ نام کاربری از قبل وجود دارد",
    invalidCreds: "❌ نام کاربری یا کلمه عبور اشتباه است",
    authError: "❌ ورود ناموفق بود",
    btnAuthLoginSubmit: "ورود به حساب کاربری",
    btnAuthSignupSubmit: "ساخت حساب جدید",
    usernamePlaceholder: "نام کاربری خود را وارد کنید...",
    passwordPlaceholder: "کلمه عبور خود را وارد کنید...",

    // Tutorial translations
    tutWelcomeTitle: "به SyncRoutine خوش آمدید! 👋",
    tutWelcomeBody: "این دستیار با استفاده از هوش مصنوعی و ثبت صوتی، به شما کمک می‌کند روتین‌های روزانه خود را رهگیری کرده و بهره‌وری‌تان را تحلیل کنید. بیایید در چند مرحله کوتاه با بخش‌های مختلف آشنا شویم.",
    tutStatsTitle: "📊 بخش آمارهای کلیدی",
    tutStatsBody: "در این بخش کل زمان روتین ثبت شده، میانگین بهره‌وری امروز و تعداد یادداشت‌های دفترچه خاطرات شما به صورت زنده نمایش داده می‌شود.",
    tutLoggerTitle: "🎙 ثبت صوتی با هوش مصنوعی",
    tutLoggerBody: "در این قسمت می‌توانید صحبت کنید (مثلاً: ۲ ساعت کار کردم و عالی بود). هوش مصنوعی جمینی جملات فارسی شما را تحلیل کرده و اطلاعات را به طور خودکار استخراج می‌کند.",
    tutTasksTitle: "🎯 تسک‌های معوقه و برنامه زمانی",
    tutTasksBody: "تسک‌های مهم خود را اینجا بنویسید. همچنین می‌توانید برنامه روتین فردا را تنظیم کنید. برنامه زمانی دارای سیستم آلارم صوتی بوده و کارها را در ساعت مشخص به شما یادآوری می‌کند.",
    tutPlannerTitle: "🤖 برنامه‌ریز هوشمند جمینی",
    tutPlannerBody: "با کلیک بر روی دکمه دریافت برنامه پیشنهادی، هوش مصنوعی جمینی با تحلیل کارهای عقب افتاده، تاریخ تولدها و سابقهٔ شما، یک برنامه زمان‌بندی دقیق برای فردا پیشنهاد می‌کند.",
    btnNext: "بعدی ➡️",
    btnFinish: "پایان آموزش 🎉",
    btnSkip: "رد کردن راهنما",

    // Dynamic island & Alarms
    islandDefaultText: "SyncRoutine فعال است",
    islandPromptTitle: "⏱ ارزیابی روتین دو ساعته",
    islandPromptBody: "در ۲ ساعت گذشته چه کار مفیدی انجام دادید؟ بگویید تا ثبت کنم.",
    islandBtnStart: "🎙 شروع ثبت صوتی",
    islandBtnLater: "بعداً",
    islandAlarmTitle: "⏰ زمان انجام برنامه فرارسید!",
    islandAlarmBody: "نوبت انجام فعالیت زیر است: ",
    alarmActive: "برنامه زمانی فعال",
    lblWellnessMentorTitle: "💖 منتور سلامت روان و روتین (AI Advisor)",
    btnMentorConsultText: "💬 درد و دل و مشاوره با منتور",
    mentorVentPlaceholder: "امروز چطورید؟ احساسات یا خستگی‌های خود را اینجا بنویسید...",
    sideNavDash: "داشبورد و تقویم",
    sideNavAnalytics: "نمودارها و گزارشات",
    sideNavTasks: "تسک‌ها و آلارم‌ها",
    sideNavWellness: "دستیار سلامت روان",
    sideNavSettings: "تنظیمات تولدها",
    lblLogoutBtn: "خروج از حساب",
    sideNavHome: "نمای کلی",
    sideNavJournal: "دفترچه یادداشت",
    lblJournalWriterTitle: "📓 ثبت یادداشت و حس‌وحال روزانه",
    lblJournalWriterDesc: "یادداشت امروز خود را بنویسید یا ضبط کنید تا هوش مصنوعی حس‌وحال شما را تحلیل کند.",
    lblJournalWriteDate: "تاریخ",
    lblJournalWriteContent: "متن یادداشت",
    lblJournalSaveBtn: "ثبت خاطره روزانه",
    lblJournalHistoryTitle: "📜 تاریخچه یادداشت‌ها",
    lblMoodStickerTitle: "🎭 تحلیل حس‌وحال شما توسط هوش مصنوعی",
    lblSettingsTheme: "🎨 تم رنگی نرم‌افزار (Theme Color)",
    lblSettingsBdayTitle: "🎂 ثبت تاریخ تولدها",
    optThemeAmethyst: "🔮 یاقوتی تاریک (Dark Amethyst)",
    optThemeOcean: "🌊 اقیانوس نیمه‌شب (Midnight Ocean)",
    optThemeForest: "🌲 جنگل زمرد (Emerald Forest)",
    optThemeSunset: "🌅 غروب پرانرژی (Vibrant Sunset)"
  },
  en: {
    appTitle: "SyncRoutine",
    appTagline: "Smart personal assistant to track routines, productivity & voice journaling",
    lblStatDuration: "Total Tracked Time",
    lblStatProductivity: "Average Productivity",
    lblStatJournals: "Total Journal Entries",
    tabVoiceTitle: "🎙 Voice Logging",
    tabManualTitle: "✏️ Manual Log",
    micStatusIdle: "Click the microphone to start speaking",
    micStatusListening: "🎙 Listening in English... Speak now",
    micStatusParsing: "⏳ Analyzing speech with Gemini AI...",
    micStatusSuccess: "✅ Smart analysis completed successfully.",
    micStatusError: "❌ An error occurred. Please try again.",
    lblTranscriptHeader: "Heard Text:",
    lblAiHeader: "AI Parsed Results:",
    lblManType: "Log Type",
    optManAct: "💼 Routine Activity",
    optManJou: "📖 Journal Entry",
    lblManDate: "Date",
    lblManCat: "Category",
    lblManStartTime: "Start Time",
    lblManEndTime: "End Time",
    lblManDuration: "Duration (Hours)",
    lblManProductivity: "Productivity (1 - 10)",
    lblManSentiment: "General Mood",
    lblManNotes: "Notes / Details",
    btnManSave: "Save Entry",
    optCatWork: "💼 Work & Project",
    optCatStudy: "📚 Study & Reading",
    optCatExercise: "🏃 Gym & Exercise",
    optCatLeisure: "🎮 Leisure & Gaming",
    optCatSleep: "😴 Sleep & Rest",
    optCatChores: "🧹 Chores & Cleaning",
    optSentPositive: "😊 Positive & Happy",
    optSentNeutral: "😐 Neutral",
    optSentNegative: "😞 Tired / Stressed",
    footerText: "© 2026 SyncRoutine. Smart personal routine and progress control system.",
    lblTasksTitle: "🎯 Pending Tasks & Goals",
    lblPrepRequired: "Requires Prep",
    lblAnniversaryTitle: "📅 On This Day in Previous Years",
    lblAiPlannerTitle: "🤖 Smart AI Daily Planner",
    lblAiPlannerDesc: "AI analyzes your routines, pending tasks, and birthdays to generate tomorrow's schedule.",
    btnGenerateAiPlan: "Generate Tomorrow's Routine",
    lblChartsTitle: "📊 Analytics & Insights",
    btnChartTime: "Time Allocation",
    btnChartProductivity: "Productivity Trend",
    lblSettingsTitle: "⚙️ Settings & Birthdays Config",
    btnTabActivities: "Activities Table",
    btnTabJournal: "Journal Timeline",
    thDate: "Date",
    thActivity: "Activity",
    thDuration: "Duration",
    thProductivity: "Productivity",
    thNotes: "Notes",
    thAction: "Action",
    confirmDelete: "Are you sure you want to delete this log?",
    noLogs: "No activities logged yet. Try using the voice logger!",
    noJournals: "Your journal is empty. Log a daily reflection!",
    categoryNames: {
      Work: '💼 Work & Project',
      Study: '📚 Study & Reading',
      Exercise: '🏃 Gym & Exercise',
      Leisure: '🎮 Leisure & Gaming',
      Sleep: '😴 Sleep & Rest',
      Chores: '🧹 Chores & Cleaning'
    },
    sentiments: {
      positive: '😊 Positive & Happy',
      neutral: '😐 Neutral',
      negative: '😞 Tired / Stressed'
    },
    badgeTypeAct: '💼 Routine Activity',
    badgeTypeJou: '📖 Journal Entry',
    badgeTypeTask: '🎯 New Task',
    badgeTypeSchedule: '⏰ Schedule Slot',
    badgeTypeBirthday: '🎂 Birthday Reminder',
    lblTitle: 'Title:',
    lblDueDate: 'Due Date:',
    lblTime: 'Time:',
    lblActivity: 'Activity:',
    lblName: 'Name:',
    lblBdayDate: 'Birthday:',
    lblType: 'Type:',
    lblCat: 'Category:',
    lblDuration: 'Duration:',
    lblProdGuess: 'Productivity:',
    lblNotesSum: 'Notes Summary:',
    lblSentiment: 'Mood:',
    lblContentSum: 'Text Summary:',
    btnConfirm: '✅ Confirm & Save',
    btnCancel: '❌ Cancel',
    bdayNamePlaceholder: "Name (e.g. Sina)",
    bdayDatePlaceholder: "Birthday (MM-DD, e.g. 06-25)",
    btnBdaySave: "Save Birthday",
    taskPlaceholder: "New task (e.g. Thesis...)",
    overdue: "overdue",
    requiresPrepShort: "prep needed",

    // Auth
    authLogin: "Login",
    authSignup: "Sign Up",
    lblUsername: "Username",
    lblPassword: "Password",
    usernameTaken: "❌ Username already exists",
    invalidCreds: "❌ Invalid username or password",
    authError: "❌ Login failed",
    btnAuthLoginSubmit: "Login to Account",
    btnAuthSignupSubmit: "Create New Account",
    usernamePlaceholder: "Enter username...",
    passwordPlaceholder: "Enter password...",

    // Tutorial
    tutWelcomeTitle: "Welcome to SyncRoutine! 👋",
    tutWelcomeBody: "This assistant helps you track daily routines and analyze productivity using AI voice logging. Let's go through the main sections in a few steps.",
    tutStatsTitle: "📊 Live Stats Section",
    tutStatsBody: "Shows total routine hours tracked, average productivity score, and daily reflections count.",
    tutLoggerTitle: "🎙 Gemini AI Voice Logger",
    tutLoggerBody: "Click the mic and speak (e.g., 'I worked for 2 hours'). Gemini parses your words, extracts categories, and fills out the database automatically.",
    tutTasksTitle: "🎯 Tasks & Schedule Alarms",
    tutTasksBody: "Manage pending goals and plan your schedules. The app features audible alarms to remind you of your tasks on time.",
    tutPlannerTitle: "🤖 Smart Gemini Planner",
    tutPlannerBody: "Generates tomorrow's detailed routine suggestion based on your pending tasks, history, and birthdays.",
    btnNext: "Next ➡️",
    btnFinish: "Finish Tutorial 🎉",
    btnSkip: "Skip",

    // Dynamic island & Alarms
    islandDefaultText: "SyncRoutine is active",
    islandPromptTitle: "⏱ 2-Hour Routine Check-in",
    islandPromptBody: "What have you done in the last 2 hours? Say it to record.",
    islandBtnStart: "🎙 Start Voice Log",
    islandBtnLater: "Later",
    islandAlarmTitle: "⏰ Activity Alarm!",
    islandAlarmBody: "Time to start: ",
    alarmActive: "Scheduler active",
    lblWellnessMentorTitle: "💖 AI Wellness Mentor & Psychologist",
    btnMentorConsultText: "💬 Vent & Consult AI Mentor",
    mentorVentPlaceholder: "How are you today? Write your feelings or fatigue here...",
    sideNavDash: "Dashboard & Calendar",
    sideNavAnalytics: "Analytics & Reports",
    sideNavTasks: "Tasks & Alarms",
    sideNavWellness: "Mental Wellness",
    sideNavSettings: "Settings & Birthdays",
    lblLogoutBtn: "Logout of Account",
    sideNavHome: "Overview",
    sideNavJournal: "Daily Journal",
    lblJournalWriterTitle: "📓 Log Daily Reflection & Mood",
    lblJournalWriterDesc: "Write or record today's journal entry to analyze your mood with AI.",
    lblJournalWriteDate: "Date",
    lblJournalWriteContent: "Journal Text",
    lblJournalSaveBtn: "Save Journal Reflection",
    lblJournalHistoryTitle: "📜 Journal History Timeline",
    lblMoodStickerTitle: "🎭 AI Mood Analysis Sticker",
    lblSettingsTheme: "🎨 App Theme Color",
    lblSettingsBdayTitle: "🎂 Register Birthday Reminders",
    optThemeAmethyst: "🔮 Dark Amethyst Theme",
    optThemeOcean: "🌊 Midnight Ocean Theme",
    optThemeForest: "🌲 Emerald Forest Theme",
    optThemeSunset: "🌅 Vibrant Sunset Theme"
  },
  de: {
    appTitle: "SyncRoutine",
    appTagline: "Intelligenter Assistent für Routinen, Produktivität & Sprach-Journaling",
    lblStatDuration: "Gesamte aufgezeichnete Zeit",
    lblStatProductivity: "Durchschnittliche Produktivität",
    lblStatJournals: "Journaleinträge insgesamt",
    tabVoiceTitle: "🎙 Sprachaufzeichnung",
    tabManualTitle: "✏️ Manuell eintragen",
    micStatusIdle: "Klicken Sie auf das Mikrofon, um zu sprechen",
    micStatusListening: "🎙 Zuhören auf Deutsch... Sprechen Sie jetzt",
    micStatusParsing: "⏳ Analyse mit Gemini AI...",
    micStatusSuccess: "✅ Intelligente Analyse erfolgreich abgeschlossen.",
    micStatusError: "❌ Ein Fehler ist aufgetreten. Versuchen Sie es erneut.",
    lblTranscriptHeader: "Gehörter Text:",
    lblAiHeader: "KI-Analyseergebnisse:",
    lblManType: "Eintragstyp",
    optManAct: "💼 Routineaktivität",
    optManJou: "📖 Journaleintrag",
    lblManDate: "Datum",
    lblManCat: "Kategorie",
    lblManStartTime: "Startzeit",
    lblManEndTime: "Endzeit",
    lblManDuration: "Dauer (Stunden)",
    lblManProductivity: "Produktivität (1 - 10)",
    lblManSentiment: "Allgemeine Stimmung",
    lblManNotes: "Notizen / Details",
    btnManSave: "Eintrag speichern",
    optCatWork: "💼 Arbeit & Projekt",
    optCatStudy: "📚 Lernen & Lesen",
    optCatExercise: "🏃 Gym & Sport",
    optCatLeisure: "🎮 Freizeit & Spiele",
    optCatSleep: "😴 Schlaf & Erholung",
    optCatChores: "🧹 Hausarbeit & Reinigung",
    optSentPositive: "😊 Positiv & Glücklich",
    optSentNeutral: "😐 Neutral",
    optSentNegative: "😞 Müde / Gestresst",
    footerText: "© 2026 SyncRoutine. Intelligentes persönliches Routine- und Fortschrittskontrollsystem.",
    lblTasksTitle: "🎯 Offene Aufgaben & Ziele",
    lblPrepRequired: "Vorbereitung nötig",
    lblAnniversaryTitle: "📅 An diesem Tag in den vergangenen Jahren",
    lblAiPlannerTitle: "🤖 Intelligenter KI-Tagesplaner",
    lblAiPlannerDesc: "Die KI analysiert Ihre Routinen, Aufgaben und Geburtstage, um den Plan für morgen zu erstellen.",
    btnGenerateAiPlan: "Plan für morgen generieren",
    lblChartsTitle: "📊 Analysen & Einblicke",
    btnChartTime: "Zeitverteilung",
    btnChartProductivity: "Produktivitätstrend",
    lblSettingsTitle: "⚙️ Einstellungen & Geburtstage",
    btnTabActivities: "Aktivitätstabelle",
    btnTabJournal: "Journal-Zeitachse",
    thDate: "Datum",
    thActivity: "Aktivität",
    thDuration: "Dauer",
    thProductivity: "Produktivität",
    thNotes: "Notizen",
    thAction: "Aktion",
    confirmDelete: "Möchten Sie diesen Eintrag wirklich löschen?",
    noLogs: "Noch keine Aktivitäten protokolliert. Verwenden Sie den Sprachlogger!",
    noJournals: "Ihr Journal ist leer. Schreiben Sie eine tägliche Reflexion!",
    categoryNames: {
      Work: '💼 Arbeit & Projekt',
      Study: '📚 Lernen & Lesen',
      Exercise: '🏃 Gym & Sport',
      Leisure: '🎮 Freizeit & Spiele',
      Sleep: '😴 Schlaf & Erholung',
      Chores: '🧹 Hausarbeit & Reinigung'
    },
    sentiments: {
      positive: '😊 Positiv & Glücklich',
      neutral: '😐 Neutral',
      negative: '😞 Müde / Gestresst'
    },
    badgeTypeAct: '💼 Routineaktivität',
    badgeTypeJou: '📖 Journaleintrag',
    badgeTypeTask: '🎯 Neue Aufgabe',
    badgeTypeSchedule: '⏰ Zeitplan',
    badgeTypeBirthday: '🎂 Geburtstag',
    lblTitle: 'Titel:',
    lblDueDate: 'Fälligkeitsdatum:',
    lblTime: 'Zeit:',
    lblActivity: 'Aktivität:',
    lblName: 'Name:',
    lblBdayDate: 'Geburtstag:',
    lblType: 'Eintragstyp:',
    lblCat: 'Kategorie:',
    lblDuration: 'Dauer:',
    lblProdGuess: 'Produktivität:',
    lblNotesSum: 'Notiz-Zusammenfassung:',
    lblSentiment: 'Stimmung:',
    lblContentSum: 'Text-Zusammenfassung:',
    btnConfirm: '✅ Bestätigen',
    btnCancel: '❌ Abbrechen',
    bdayNamePlaceholder: "Name (z.B. Sina)",
    bdayDatePlaceholder: "Geburtstag (MM-DD, z.B. 06-25)",
    btnBdaySave: "Speichern",
    taskPlaceholder: "Neue Aufgabe (z. B. Thesis...)",
    overdue: "überfällig",
    requiresPrepShort: "Vorbereitung nötig",

    // Auth
    authLogin: "Login",
    authSignup: "Registrieren",
    lblUsername: "Benutzername",
    lblPassword: "Passwort",
    usernameTaken: "❌ Benutzername existiert bereits",
    invalidCreds: "❌ Falscher Benutzername oder Passwort",
    authError: "❌ Login fehlgeschlagen",
    btnAuthLoginSubmit: "Einloggen",
    btnAuthSignupSubmit: "Konto erstellen",
    usernamePlaceholder: "Benutzername eingeben...",
    passwordPlaceholder: "Passwort eingeben...",

    // Tutorial
    tutWelcomeTitle: "Willkommen bei SyncRoutine! 👋",
    tutWelcomeBody: "Dieser Assistent hilft Ihnen, tägliche Routinen zu verfolgen und die Produktivität mithilfe der KI-Sprachaufzeichnung zu analysieren. Lassen Sie uns die Hauptabschnitte kurz durchgehen.",
    tutStatsTitle: "📊 Live-Statistik-Bereich",
    tutStatsBody: "Zeigt die aufgezeichneten Routine-Stunden, die durchschnittliche Produktivität und die Anzahl der täglichen Reflexionen an.",
    tutLoggerTitle: "🎙 Gemini KI-Sprachlogger",
    tutLoggerBody: "Klicken Sie auf das Mikrofon und sprechen Sie. Gemini analysiert Ihre Wörter, extrahiert Kategorien und füllt die Datenbank automatisch aus.",
    tutTasksTitle: "🎯 Aufgaben & Zeitplan-Alarme",
    tutTasksBody: "Verwalten Sie offene Ziele und planen Sie Ihre Zeitpläne. Die App bietet akustische Alarme, um Sie rechtzeitig an Ihre Aufgaben zu erinnern.",
    tutPlannerTitle: "🤖 Intelligenter Gemini-Planer",
    tutPlannerBody: "Generiert einen detaillierten Routine-Vorschlag für morgen, basierend auf Ihren offenen Aufgaben, Ihrem Verlauf und Ihren Geburtstagen.",
    btnNext: "Weiter ➡️",
    btnFinish: "Anleitung beenden 🎉",
    btnSkip: "Überspringen",

    // Dynamic island & Alarms
    islandDefaultText: "SyncRoutine ist aktiv",
    islandPromptTitle: "⏱ 2-Stunden Routine-Check",
    islandPromptBody: "Was haben Sie in den letzten 2 Stunden gemacht? Sprechen Sie zum Aufzeichnen.",
    islandBtnStart: "🎙 Sprachlog starten",
    islandBtnLater: "Später",
    islandAlarmTitle: "⏰ Aktivitätsalarm!",
    islandAlarmBody: "Zeit zu starten: ",
    alarmActive: "Tagesplaner aktiv",
    lblWellnessMentorTitle: "💖 AI Wellness-Mentor & Psychologe",
    lblWellnessMentorDesc: "Sie können Ihre Gedanken mit Ihrem Wellness-Berater teilen. Durch Analyse Ihrer vergangenen Routinen und Tagebucheinträge bietet er datengestützte psychologische Unterstützung.",
    btnMentorConsultText: "💬 Beraten & Aussprechen",
    mentorVentPlaceholder: "Wie geht es dir heute? Schreibe deine Gefühle oder Müdigkeit hier...",
    sideNavDash: "Dashboard & Kalender",
    sideNavAnalytics: "Analysen & Berichte",
    sideNavTasks: "Aufgaben & Alarme",
    sideNavWellness: "Mentale Gesundheit",
    sideNavSettings: "Einstellungen & Geburtstage",
    lblLogoutBtn: "Abmelden",
    sideNavHome: "Übersicht",
    sideNavJournal: "Tagebuch",
    lblJournalWriterTitle: "Tagesreflexion & Stimmung aufzeichnen",
    lblJournalWriterDesc: "Schreiben oder nehmen Sie Ihren heutigen Tagebucheintrag auf, um Ihre Stimmung mit KI zu analysieren.",
    lblJournalWriteDate: "Datum",
    lblJournalWriteContent: "Tagebuchtext",
    lblJournalSaveBtn: "Tagebuch speichern",
    lblJournalHistoryTitle: "Tagebuchverlauf",
    lblMoodStickerTitle: "KI-Stimmungsanalyse-Aufkleber",
    lblSettingsTheme: "🎨 App-Farbschema",
    lblSettingsBdayTitle: "🎂 Geburtstage eintragen",
    optThemeAmethyst: "🔮 Dunkler Amethyst (Standard)",
    optThemeOcean: "🌊 Mitternachtsozean",
    optThemeForest: "🌲 Smaragdwald",
    optThemeSunset: "🌅 Lebendiger Sonnenuntergang"
  }
};

// Category colors for Chart.js
const CATEGORY_COLORS = {
  Work: '#6366f1',     // Indigo
  Study: '#3b82f6',    // Blue
  Exercise: '#10b981', // Green
  Leisure: '#f59e0b',  // Amber
  Sleep: '#a855f7',    // Purple
  Chores: '#ec4899'    // Pink
};

// State variables
let activeLang = localStorage.getItem('activeLang') || 'fa';
let token = localStorage.getItem('token') || null;
let username = localStorage.getItem('username') || null;

// Global fetch interceptor for JWT authorization & auto-logout on session expiration
const originalFetch = window.fetch;
window.fetch = async function (url, options = {}) {
  if (url.startsWith('/api/') && token) {
    if (!options.headers) options.headers = {};
    if (!options.headers['Authorization']) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (options.body && !options.headers['Content-Type'] && !(options.body instanceof FormData)) {
      options.headers['Content-Type'] = 'application/json';
    }
  }
  try {
    const response = await originalFetch(url, options);
    if (url.startsWith('/api/') && (response.status === 401 || response.status === 403)) {
      console.warn("Session expired or unauthorized. Logging out...");
      handleLogout();
    }
    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
};

let activityLogs = [];
let journalLogs = [];
let taskLogs = [];
let birthdayLogs = [];
let scheduleLogs = [];
let medalLogs = [];
let habitsList = [];

let timeChart = null;
let productivityChart = null;
let dashboardPieChart = null;
let dashboardLineChart = null;
let pendingParsedResult = null;

// Audio elements
const alarmSound = document.getElementById('alarm-sound');
const notifSound = document.getElementById('notif-sound');

// Dynamic Island elements (Removed)
const dynamicIsland = null;
const islandExpandedContent = null;
const islandCollapsedTxt = null;
const islandTitleTxt = null;
const islandBodyTxt = null;
const islandActionBtn = null;
const islandDismissBtn = null;

// Authentication elements
const authOverlay = document.getElementById('auth-overlay');
const authForm = document.getElementById('auth-form');
const authUsernameInput = document.getElementById('auth-username');
const authPasswordInput = document.getElementById('auth-password');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authErrorMsg = document.getElementById('auth-error-msg');
const btnLoginTab = document.getElementById('btn-auth-login-tab');
const btnSignupTab = document.getElementById('btn-auth-signup-tab');
let activeAuthMode = 'login'; // 'login' or 'signup'

// Tutorial elements
const tutorialOverlay = document.getElementById('tutorial-overlay');
const tutStepNum = document.getElementById('tut-step-num');
const tutTitle = document.getElementById('tut-title');
const tutBody = document.getElementById('tut-body');
const tutNextBtn = document.getElementById('tut-next-btn');
const tutSkipBtn = document.getElementById('tut-skip-btn');
let currentTutorialStep = 0;

// Mic and core elements
const micBtn = document.getElementById('mic-btn');
const micStatus = document.getElementById('mic-status');
const transcriptBox = document.getElementById('transcript-box');
const transcriptText = document.getElementById('transcript-text');
const aiResultCard = document.getElementById('ai-result-card');
const aiParsedDetails = document.getElementById('ai-parsed-details');
const aiConfirmBtn = document.getElementById('ai-confirm-btn');
const aiCancelBtn = document.getElementById('ai-cancel-btn');

// Manual form elements
const manualForm = document.getElementById('manual-form');
const manualType = document.getElementById('manual-type');
const manualDate = document.getElementById('manual-date');
const manualActivityFields = document.getElementById('manual-activity-fields');
const manualJournalFields = document.getElementById('manual-journal-fields');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const durationInput = document.getElementById('duration');
const productivityInput = document.getElementById('productivity');
const prodValSpan = document.getElementById('prod-val');
const notesInput = document.getElementById('notes');

// Stats Elements
const statTotalHours = document.getElementById('stat-total-hours');
const statAvgProd = document.getElementById('stat-avg-prod');
const statTotalJournals = document.getElementById('stat-total-journals');

// Birthdays DOM
const bdayList = document.getElementById('bday-list');
const bdayNameInput = document.getElementById('bday-name');
const bdayDateInput = document.getElementById('bday-date');
const addBdayBtn = document.getElementById('add-bday-btn');

// Schedules DOM
const scheduleList = document.getElementById('schedule-list');
const newScheduleActivity = document.getElementById('new-schedule-activity');
const newScheduleTime = document.getElementById('new-schedule-time');
const addScheduleBtn = document.getElementById('add-schedule-btn');

// Tasks list DOM
const taskList = document.getElementById('task-list');
const newTaskTitle = document.getElementById('new-task-title');
const newTaskDue = document.getElementById('new-task-due');
const newTaskPrep = document.getElementById('new-task-prep');
const addTaskBtn = document.getElementById('add-task-btn');

// Anniversary DOM
const anniversaryCardSection = document.getElementById('anniversary-card-section');
const anniversaryContentBox = document.getElementById('anniversary-content-box');

// AI Planner DOM
const generateRoutineBtn = document.getElementById('generate-routine-btn');
const aiSuggestionBox = document.getElementById('ai-suggestion-box');

// Language selector element
const langSelect = document.getElementById('lang-select');

// Speech Recognition
let recognition = null;
let isRecording = false;
let isExplicitStop = false;
let accumulatedTranscript = '';

// Last dynamic island check-in time
let lastCheckInTime = parseInt(localStorage.getItem('lastCheckInTime')) || Date.now();

// Triggered alarm tracker (prevent duplicates in the same minute)
const triggeredAlarms = new Set();

document.addEventListener('DOMContentLoaded', () => {
  // Setup Authentication UI
  initAuthUI();

  // Setup Event Listeners
  langSelect.addEventListener('change', (e) => {
    switchLanguage(e.target.value);
    saveUserLanguagePreference(e.target.value);
  });

  productivityInput.addEventListener('input', (e) => {
    prodValSpan.textContent = e.target.value;
  });

  function calculateDurationFromTimes() {
    const startVal = startTimeInput.value;
    const endVal = endTimeInput.value;
    if (!startVal || !endVal) return;

    const [startH, startM] = startVal.split(':').map(Number);
    const [endH, endM] = endVal.split(':').map(Number);

    let diffMs = (endH * 60 + endM) - (startH * 60 + startM);
    if (diffMs < 0) {
      diffMs += 24 * 60;
    }

    const durationHours = parseFloat((diffMs / 60).toFixed(1));
    durationInput.value = durationHours;
  }

  function calculateEndTimeFromDuration() {
    const startVal = startTimeInput.value;
    const durationVal = parseFloat(durationInput.value);
    if (!startVal || isNaN(durationVal) || durationVal <= 0) return;

    const [startH, startM] = startVal.split(':').map(Number);
    let totalMinutes = startH * 60 + startM + Math.round(durationVal * 60);

    totalMinutes = totalMinutes % (24 * 60);
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;

    endTimeInput.value = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  }

  startTimeInput.addEventListener('input', () => {
    if (endTimeInput.value) {
      calculateDurationFromTimes();
    } else if (durationInput.value) {
      calculateEndTimeFromDuration();
    }
  });

  endTimeInput.addEventListener('input', calculateDurationFromTimes);
  durationInput.addEventListener('input', calculateEndTimeFromDuration);

  manualType.addEventListener('change', (e) => {
    if (e.target.value === 'activity') {
      manualActivityFields.classList.remove('hidden');
      manualJournalFields.classList.add('hidden');
    } else {
      manualActivityFields.classList.add('hidden');
      manualJournalFields.classList.remove('hidden');
    }
  });

  document.getElementById('logout-btn').addEventListener('click', handleLogout);
  manualForm.addEventListener('submit', handleManualSubmit);
  micBtn.addEventListener('click', toggleRecording);
  aiConfirmBtn.addEventListener('click', confirmAiResult);
  aiCancelBtn.addEventListener('click', cancelAiResult);
  
  addTaskBtn.addEventListener('click', handleAddTask);
  addBdayBtn.addEventListener('click', handleAddBirthday);
  addScheduleBtn.addEventListener('click', handleAddSchedule);
  generateRoutineBtn.addEventListener('click', handleGenerateRoutine);
  document.getElementById('btn-mentor-consult').addEventListener('click', handleGenerateMentorAdvice);

  const seedBtn = document.getElementById('seed-data-btn');
  if (seedBtn) {
    seedBtn.addEventListener('click', handleSeedMockData);
  }

  // Bind logger tab buttons
  document.querySelectorAll('.logger-panel .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.logger-panel .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab');
      if (tab === 'voice') {
        document.getElementById('voice-tab').classList.remove('hidden');
        document.getElementById('manual-tab').classList.add('hidden');
      } else {
        document.getElementById('voice-tab').classList.add('hidden');
        document.getElementById('manual-tab').classList.remove('hidden');
      }
    });
  });

  // Bind log tabs
  document.querySelectorAll('.log-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.log-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const logType = btn.getAttribute('data-log');
      if (logType === 'activities') {
        document.getElementById('activities-log-content').classList.remove('hidden');
        document.getElementById('journal-log-content').classList.add('hidden');
      } else {
        document.getElementById('activities-log-content').classList.add('hidden');
        document.getElementById('journal-log-content').classList.remove('hidden');
      }
    });
  });

  // Bind chart toggles
  document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.btn-toggle').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const chartType = btn.getAttribute('data-chart');
      if (chartType === 'time') {
        document.getElementById('timeChart').classList.remove('hidden');
        document.getElementById('productivityChart').classList.add('hidden');
      } else {
        document.getElementById('timeChart').classList.add('hidden');
        document.getElementById('productivityChart').classList.remove('hidden');
      }
    });
  });

  // Dynamic Island actions
  if (islandActionBtn) islandActionBtn.addEventListener('click', handleIslandMicTrigger);
  if (islandDismissBtn) islandDismissBtn.addEventListener('click', dismissIslandPrompt);

  // Tutorial actions
  tutNextBtn.addEventListener('click', progressTutorial);
  tutSkipBtn.addEventListener('click', endTutorial);

  // Sidebar View Switcher
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.dataset.view;
      switchView(targetView);
    });
  });

  // Initialize Floating Chat
  initFloatingChat();

  // Hamburger Toggle Button
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const appSidebar = document.getElementById('app-sidebar');
  if (sidebarToggleBtn && appSidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
      appSidebar.classList.toggle('collapsed');
    });
  }

  // Background Timers (Check every 15 seconds)
  setInterval(backgroundHeartbeat, 15000);

  // Initialize Calendar & Rescheduling
  initCalendar();
  initDragAndDrop();

  // Bind daily medals checkboxes
  bindMedalEvents();

  // Bind Add Custom Medal Modal
  const btnAddMedal = document.getElementById('btn-add-medal');
  const medalAddModal = document.getElementById('medal-add-modal');
  const medalAddClose = document.getElementById('medal-add-modal-close-btn');
  const medalAddForm = document.getElementById('medal-add-form');

  if (btnAddMedal && medalAddModal) {
    btnAddMedal.addEventListener('click', () => {
      document.getElementById('medal-add-name').value = '';
      document.getElementById('medal-add-emoji').value = '💧';
      document.getElementById('medal-add-key').value = '';
      document.getElementById('medal-add-desc').value = '';
      medalAddModal.classList.remove('hidden');
    });
  }

  if (medalAddClose && medalAddModal) {
    medalAddClose.addEventListener('click', () => {
      medalAddModal.classList.add('hidden');
    });
  }

  if (medalAddForm && medalAddModal) {
    medalAddForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!token) return;

      const habitKey = document.getElementById('medal-add-key').value.trim().toLowerCase();
      const habitName = document.getElementById('medal-add-name').value.trim();
      const habitEmoji = document.getElementById('medal-add-emoji').value.trim();
      const habitDesc = document.getElementById('medal-add-desc').value.trim();

      try {
        const res = await fetch('/api/habits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ habitKey, habitName, habitEmoji, habitDesc })
        });

        if (res.ok) {
          medalAddModal.classList.add('hidden');
          notifSound.play().catch(e => console.log(e));
          await fetchData();
          alert(activeLang === 'fa' ? '✅ مدال جدید با موفقیت ایجاد شد!' : '✅ Custom habit medal created successfully!');
        } else {
          const errData = await res.json().catch(() => ({}));
          alert((activeLang === 'fa' ? '❌ خطا در تعریف مدال: ' : '❌ Error creating medal: ') + (errData.error || res.statusText));
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  // Bind journal writer form and mic events
  bindJournalWriterEvents();

  // Initialize Color Theme
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    const savedTheme = localStorage.getItem('theme') || 'amethyst';
    themeSelect.value = savedTheme;
    applyTheme(savedTheme);
    themeSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      localStorage.setItem('theme', val);
      applyTheme(val);
    });
  } else {
    // If select is not yet loaded, apply saved theme directly
    applyTheme(localStorage.getItem('theme') || 'amethyst');
  }
});

// Authentication UI & State
async function initAuthUI() {
  const islandContainer = document.querySelector('.dynamic-island-container');
  
  if (!token) {
    try {
      // 1. Try to login guest
      let res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'guest', password: 'guestpassword123' })
      });
      
      // 2. If login fails, try to sign up guest
      if (!res.ok) {
        res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'guest', password: 'guestpassword123' })
        });
      }
      
      if (res.ok) {
        const data = await res.json();
        token = data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', 'guest');
        if (data.lang) {
          activeLang = data.lang;
          localStorage.setItem('activeLang', data.lang);
        }
      }
    } catch (err) {
      console.error("Unified guest auto-login failed:", err);
    }
  }

  if (token) {
    authOverlay.classList.add('hidden');
    document.getElementById('main-app-content').classList.remove('hidden');
    if (islandContainer) islandContainer.classList.remove('hidden');
    
    // Set language select option value
    if (langSelect) {
      langSelect.value = activeLang;
    }
    switchLanguage(activeLang);
    switchView('dashboard');

    // Initialize data
    const today = new Date().toISOString().split('T')[0];
    manualDate.value = today;
    newTaskDue.value = today;

    initSpeechRecognition();
    fetchData();
    fetchTasks();
    fetchBirthdays();
    fetchSchedules();
    fetchAnniversaries(today);
    
    // Check if tutorial needed
    if (!localStorage.getItem('tutorial-finished')) {
      startTutorial();
    }
  } else {
    authOverlay.classList.remove('hidden');
    document.getElementById('main-app-content').classList.add('hidden');
    if (islandContainer) islandContainer.classList.add('hidden');
    setupAuthListeners();
  }
}

function setupAuthListeners() {
  btnLoginTab.addEventListener('click', () => {
    activeAuthMode = 'login';
    btnLoginTab.classList.add('active');
    btnSignupTab.classList.remove('active');
    authSubmitBtn.textContent = TRANSLATIONS[activeLang].btnAuthLoginSubmit;
    authErrorMsg.classList.add('hidden');
  });

  btnSignupTab.addEventListener('click', () => {
    activeAuthMode = 'signup';
    btnSignupTab.classList.add('active');
    btnLoginTab.classList.remove('active');
    authSubmitBtn.textContent = TRANSLATIONS[activeLang].btnAuthSignupSubmit;
    authErrorMsg.classList.add('hidden');
  });

  authForm.addEventListener('submit', handleAuthSubmit);
}

async function handleAuthSubmit(e) {
  e.preventDefault();
  const usernameVal = authUsernameInput.value.trim();
  const passwordVal = authPasswordInput.value;

  if (!usernameVal || !passwordVal) return;

  const url = activeAuthMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usernameVal, password: passwordVal })
    });

    const data = await res.json();
    if (res.ok) {
      token = data.token;
      username = data.username;
      activeLang = data.lang || 'fa';
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('activeLang', activeLang);
      authErrorMsg.classList.add('hidden');
      
      // Clean inputs
      authUsernameInput.value = '';
      authPasswordInput.value = '';
      
      initAuthUI();
    } else {
      const dict = TRANSLATIONS[activeLang];
      let errText = dict.authError;
      if (data.error === 'Username already exists') errText = dict.usernameTaken;
      if (data.error === 'Invalid username or password') errText = dict.invalidCreds;
      
      authErrorMsg.textContent = errText;
      authErrorMsg.classList.remove('hidden');
    }
  } catch (err) {
    console.error(err);
    authErrorMsg.textContent = TRANSLATIONS[activeLang].authError;
    authErrorMsg.classList.remove('hidden');
  }
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  token = null;
  username = null;
  initAuthUI();
}

// Save User Lang Setting
async function saveUserLanguagePreference(lang) {
  if (!token) return;
  try {
    await fetch('/api/users/lang', {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ lang })
    });
  } catch (err) { console.error(err); }
}

// Fetch all logs
async function fetchData() {
  if (!token) return;
  try {
    const [actRes, jRes, medalRes, habitsRes] = await Promise.all([
      fetch('/api/activities', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/api/journal', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/api/medals', { headers: { 'Authorization': `Bearer ${token}` } }),
      fetch('/api/habits', { headers: { 'Authorization': `Bearer ${token}` } })
    ]);
    activityLogs = await actRes.json();
    journalLogs = await jRes.json();
    medalLogs = await medalRes.json();
    habitsList = await habitsRes.json();

    updateStats();
    renderActivitiesTable();
    renderJournalTimeline();
    renderCharts();
    renderMedals();
    
    // Render Calendar View
    renderCalendar();
  } catch (err) { console.error(err); }
}

// Dynamic Island Reminders & Scheduled Alarms Heartbeat
function backgroundHeartbeat() {
  if (!token) return;
  
  const now = new Date();
  const currentTimeStr = now.toTimeString().split(' ')[0].substring(0, 5); // "09:00"

  // 1. Check Scheduled Alarms
  scheduleLogs.forEach(s => {
    if (s.time === currentTimeStr && !triggeredAlarms.has(`${s.id}-${currentTimeStr}`)) {
      triggeredAlarms.add(`${s.id}-${currentTimeStr}`);
      triggerAlarmNotification(s);
    }
  });

  // 2. Check 2-Hour Routine prompter
  const elapsed = Date.now() - lastCheckInTime;
  // If more than 2 hours (2 * 60 * 60 * 1000 = 7,200,000 ms), expand Dynamic Island!
  // For easy testing and demonstration: if they haven't logged in the last 2 hours (or on first start), it will fire.
  if (elapsed > 7200000) {
    triggerIslandPrompt();
  }
}

// Trigger Alarms
function triggerAlarmNotification(schedule) {
  const dict = TRANSLATIONS[activeLang];
  alarmSound.play().catch(e => console.log("Audio play blocked by browser policy"));
  
  if (!dynamicIsland) return;
  // Expand Dynamic Island for Alarm
  dynamicIsland.classList.add('expanded');
  dynamicIsland.classList.add('expanded-pulse');
  if (islandExpandedContent) islandExpandedContent.classList.remove('hidden');
  
  if (islandTitleTxt) islandTitleTxt.textContent = dict.islandAlarmTitle;
  if (islandBodyTxt) islandBodyTxt.textContent = `${dict.islandAlarmBody}"${schedule.activity}"`;
  
  // Custom button behavior for alarm
  if (islandActionBtn) {
    islandActionBtn.textContent = activeLang === 'fa' ? '✅ متوجه شدم' : 'OK';
    islandActionBtn.onclick = () => {
      collapseIsland();
      alarmSound.pause();
      alarmSound.currentTime = 0;
    };
  }
  
  if (islandDismissBtn) islandDismissBtn.classList.add('hidden');
}

// Trigger 2-Hour Routine prompt
function triggerIslandPrompt() {
  const dict = TRANSLATIONS[activeLang];
  notifSound.play().catch(e => console.log("Audio play blocked by browser policy"));
  
  if (!dynamicIsland) return;
  dynamicIsland.classList.add('expanded');
  if (islandExpandedContent) islandExpandedContent.classList.remove('hidden');
  
  if (islandTitleTxt) islandTitleTxt.textContent = dict.islandPromptTitle;
  if (islandBodyTxt) islandBodyTxt.textContent = dict.islandPromptBody;
  if (islandActionBtn) {
    islandActionBtn.textContent = dict.islandBtnStart;
    islandActionBtn.onclick = handleIslandMicTrigger;
  }
  if (islandDismissBtn) {
    islandDismissBtn.classList.remove('hidden');
    islandDismissBtn.textContent = dict.islandBtnLater;
  }
}

function handleIslandMicTrigger() {
  collapseIsland();
  // Focus logger panel, click voice tab, start recording
  const voiceTab = document.querySelector('.tab-btn[data-tab="voice"]');
  if (voiceTab) voiceTab.click();
  toggleRecording();
}

function dismissIslandPrompt() {
  collapseIsland();
  // Snooze prompter for 30 minutes
  lastCheckInTime = Date.now() - 5400000; // sets elapsed time to 1.5 hours, so it prompts again in 30 minutes
  localStorage.setItem('lastCheckInTime', lastCheckInTime);
}

function collapseIsland() {
  if (!dynamicIsland) return;
  dynamicIsland.classList.remove('expanded');
  dynamicIsland.classList.remove('expanded-pulse');
  if (islandExpandedContent) islandExpandedContent.classList.add('hidden');
  
  // Reset buttons
  if (islandActionBtn) islandActionBtn.onclick = handleIslandMicTrigger;
}

// Interactive Onboarding Tutorial Steps
function startTutorial() {
  currentTutorialStep = 1;
  tutorialOverlay.classList.remove('hidden');
  renderTutorialStep();
}

function renderTutorialStep() {
  const dict = TRANSLATIONS[activeLang];
  tutStepNum.textContent = currentTutorialStep;

  // Clear previous spotlights
  document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

  let targetEl = null;

  if (currentTutorialStep === 1) {
    tutTitle.textContent = dict.tutWelcomeTitle;
    tutBody.textContent = dict.tutWelcomeBody;
    tutNextBtn.textContent = dict.btnNext;
    
    // Position card in center
    const card = document.querySelector('.tutorial-card');
    card.style.top = '50%';
    card.style.left = '50%';
    card.style.transform = 'translate(-50%, -50%)';
  } else if (currentTutorialStep === 2) {
    targetEl = document.getElementById('tut-stats-card');
    tutTitle.textContent = dict.tutStatsTitle;
    tutBody.textContent = dict.tutStatsBody;
    tutNextBtn.textContent = dict.btnNext;
  } else if (currentTutorialStep === 3) {
    targetEl = document.getElementById('tut-logger-panel');
    tutTitle.textContent = dict.tutLoggerTitle;
    tutBody.textContent = dict.tutLoggerBody;
    tutNextBtn.textContent = dict.btnNext;
  } else if (currentTutorialStep === 4) {
    targetEl = document.getElementById('tut-tasks-panel');
    tutTitle.textContent = dict.tutTasksTitle;
    tutBody.textContent = dict.tutTasksBody;
    tutNextBtn.textContent = dict.btnFinish;
  }

  if (targetEl) {
    targetEl.classList.add('tutorial-highlight');
    const card = document.querySelector('.tutorial-card');
    
    if (window.innerWidth >= 600) {
      const rect = targetEl.getBoundingClientRect();
      card.style.position = 'absolute';
      card.style.left = `${rect.left + (rect.width / 2) - 160}px`;
      
      const targetCenterY = rect.top + rect.height / 2;
      const viewportHeight = window.innerHeight;
      
      if (targetCenterY > viewportHeight / 2) {
        card.style.top = `${window.scrollY + rect.top - 20}px`;
        card.style.transform = 'translateY(-100%)';
      } else {
        card.style.top = `${window.scrollY + rect.bottom + 20}px`;
        card.style.transform = 'none';
      }
      card.style.bottom = 'auto';
      card.style.width = '320px';
    } else {
      card.style.position = 'fixed';
      card.style.bottom = '20px';
      card.style.top = 'auto';
      card.style.left = '5%';
      card.style.width = '90%';
      card.style.transform = 'none';
    }
  }
}

function progressTutorial() {
  if (currentTutorialStep < 4) {
    currentTutorialStep++;
    renderTutorialStep();
  } else {
    endTutorial();
  }
}

function endTutorial() {
  tutorialOverlay.classList.add('hidden');
  document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
  localStorage.setItem('tutorial-finished', 'true');
}

// Switch Tasks / Schedules subpanels
window.switchTaskPanel = function(panel) {
  const btnTask = document.getElementById('btn-task-tab');
  const btnSchedule = document.getElementById('btn-schedule-tab');
  const panelTasks = document.getElementById('panel-tasks-list');
  const panelSchedules = document.getElementById('panel-schedules-list');

  if (panel === 'tasks') {
    btnTask.classList.add('active');
    btnSchedule.classList.remove('active');
    panelTasks.classList.remove('hidden');
    panelSchedules.classList.add('hidden');
  } else {
    btnSchedule.classList.add('active');
    btnTask.classList.remove('active');
    panelSchedules.classList.remove('hidden');
    panelTasks.classList.add('hidden');
  }
};

// Add Daily Schedule Slot
async function handleAddSchedule() {
  if (!token) return;
  const time = newScheduleTime.value.trim();
  const activity = newScheduleActivity.value.trim();

  if (!time || !activity) return;

  try {
    const res = await fetch('/api/schedules', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ time, activity })
    });

    if (res.ok) {
      newScheduleActivity.value = '';
      newScheduleTime.value = '';
      fetchSchedules();
    }
  } catch (err) { console.error(err); }
}

// Fetch Schedules
async function fetchSchedules() {
  if (!token) return;
  try {
    const res = await fetch('/api/schedules', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    scheduleLogs = await res.json();
    renderSchedules();
  } catch (err) { console.error(err); }
}

// Render Schedules
function renderSchedules() {
  scheduleList.innerHTML = '';
  if (scheduleLogs.length === 0) {
    scheduleList.innerHTML = `<li style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 10px;">${activeLang === 'fa' ? 'هیچ روتینی برنامه‌ریزی نشده است.' : 'No schedules planned.'}</li>`;
    return;
  }

  scheduleLogs.forEach(s => {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
      <div class="task-left-section">
        <span class="task-title" style="font-weight: 700;">⏰ ${s.time}</span>
        <span class="task-title" style="margin-right: 10px;">- ${s.activity}</span>
      </div>
      <div class="task-meta">
        <button class="btn-delete" onclick="deleteSchedule('${s.id}')" style="padding: 2px 4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
        </button>
      </div>
    `;
    scheduleList.appendChild(li);
  });
}

// Delete Schedule
window.deleteSchedule = async function(id) {
  const dict = TRANSLATIONS[activeLang];
  if (!confirm(dict.confirmDelete)) return;
  try {
    const res = await fetch(`/api/schedules/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchSchedules();
  } catch (err) { console.error(err); }
};

// Fetch Tasks
async function fetchTasks() {
  if (!token) return;
  try {
    const res = await fetch('/api/tasks', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    taskLogs = await res.json();
    renderTasks();
  } catch (err) { console.error(err); }
}

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  const dict = TRANSLATIONS[activeLang];

  if (taskLogs.length === 0) {
    taskList.innerHTML = `<li style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 10px;">${activeLang === 'fa' ? 'هیچ تسکی ثبت نشده است.' : 'No tasks logged.'}</li>`;
    return;
  }

  taskLogs.forEach(task => {
    const li = document.createElement('li');
    li.className = `task-item ${task.completed ? 'completed' : ''}`;

    const formattedDue = task.dueDate ? formatDateLocal(task.dueDate) : '';
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
    const dueClass = isOverdue ? 'task-due-date overdue' : 'task-due-date';
    const dueLabel = isOverdue ? `(${dict.overdue})` : '';

    li.innerHTML = `
      <div class="task-left-section">
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}', this.checked)">
        <span class="task-title">${task.title}</span>
      </div>
      <div class="task-meta">
        ${task.requiresPrep ? `<span class="task-prep-badge">${dict.requiresPrepShort}</span>` : ''}
        ${task.dueDate ? `<span class="${dueClass}">${formattedDue} ${dueLabel}</span>` : ''}
        <button class="btn-delete" onclick="deleteTask('${task.id}')" style="padding: 2px 4px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
        </button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Toggle Task completed
window.toggleTask = async function(id, completed) {
  if (!token) return;
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ completed })
    });
    if (res.ok) fetchTasks();
  } catch (err) { console.error(err); }
};

// Add Task
async function handleAddTask() {
  if (!token) return;
  const title = newTaskTitle.value.trim();
  const due = newTaskDue.value;
  const prep = newTaskPrep.checked;

  if (!title) return;

  try {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        date: new Date().toISOString().split('T')[0],
        title,
        dueDate: due,
        requiresPrep: prep
      })
    });

    if (res.ok) {
      newTaskTitle.value = '';
      newTaskPrep.checked = false;
      fetchTasks();
    }
  } catch (err) { console.error(err); }
}

// Delete Task
window.deleteTask = async function(id) {
  const dict = TRANSLATIONS[activeLang];
  if (!confirm(dict.confirmDelete)) return;
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchTasks();
  } catch (err) { console.error(err); }
};

// Fetch Anniversaries
async function fetchAnniversaries(dateStr) {
  if (!token) return;
  try {
    const res = await fetch(`/api/journal/anniversaries?date=${dateStr}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const anniversaries = await res.json();
    renderAnniversaries(anniversaries);
  } catch (err) { console.error(err); }
}

// Render Anniversaries
function renderAnniversaries(items) {
  if (items.length === 0) {
    anniversaryCardSection.classList.add('hidden');
    return;
  }

  anniversaryCardSection.classList.remove('hidden');
  anniversaryContentBox.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'anniversary-memory';
    
    const yearDiff = new Date().getFullYear() - new Date(item.date).getFullYear();
    const yearText = activeLang === 'fa' ? `${yearDiff} سال پیش` : `${yearDiff} ${yearDiff === 1 ? 'year' : 'years'} ago`;

    card.innerHTML = `
      <div class="anniversary-year-badge">${yearText} - (${formatDateLocal(item.date)})</div>
      <div class="anniversary-text">${item.content}</div>
    `;
    anniversaryContentBox.appendChild(card);
  });
}

// Fetch Birthdays
async function fetchBirthdays() {
  if (!token) return;
  try {
    const res = await fetch('/api/birthdays', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    birthdayLogs = await res.json();
    renderBirthdays();
  } catch (err) { console.error(err); }
}

// Render Birthdays
function renderBirthdays() {
  bdayList.innerHTML = '';
  if (birthdayLogs.length === 0) {
    bdayList.innerHTML = `<li style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 10px;">${activeLang === 'fa' ? 'تاریخ تولدی ثبت نشده است.' : 'No birthdays configured.'}</li>`;
    return;
  }

  birthdayLogs.forEach(b => {
    const li = document.createElement('li');
    li.className = 'bday-item';

    li.innerHTML = `
      <div>
        <span class="bday-item-name">${b.name}</span>
        <span class="bday-item-date">(${b.date})</span>
      </div>
      <button class="btn-delete" onclick="deleteBirthday('${b.id}')" style="padding: 2px 4px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
      </button>
    `;
    bdayList.appendChild(li);
  });
}

// Add Birthday
async function handleAddBirthday() {
  if (!token) return;
  const name = bdayNameInput.value.trim();
  const date = bdayDateInput.value.trim();

  if (!name || !date) return;

  try {
    const res = await fetch('/api/birthdays', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, date })
    });
    if (res.ok) {
      bdayNameInput.value = '';
      bdayDateInput.value = '';
      fetchBirthdays();
    }
  } catch (err) { console.error(err); }
}

// Delete Birthday
window.deleteBirthday = async function(id) {
  const dict = TRANSLATIONS[activeLang];
  if (!confirm(dict.confirmDelete)) return;
  try {
    const res = await fetch(`/api/birthdays/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchBirthdays();
  } catch (err) { console.error(err); }
};

// Generate AI suggestion schedule
async function handleGenerateRoutine() {
  if (!token) return;
  aiSuggestionBox.classList.remove('hidden');
  aiSuggestionBox.innerHTML = activeLang === 'fa' ? '⏳ در حال تولید برنامه پیشنهادی فردا توسط جمینی...' : '⏳ Generating tomorrow\'s plan with Gemini AI...';

  const todayStr = new Date().toISOString().split('T')[0];
  try {
    const res = await fetch('/api/suggest-routine', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        date: todayStr,
        lang: activeLang
      })
    });

    if (res.ok) {
      const data = await res.json();
      aiSuggestionBox.innerHTML = formatMarkdown(data.suggestion);
      
      if (data.slots && data.slots.length > 0) {
        pendingAiSlots = data.slots;
        const btnBox = document.createElement('div');
        btnBox.className = 'ai-apply-plan-box';
        
        const applyBtn = document.createElement('button');
        applyBtn.className = 'btn-apply-plan';
        applyBtn.id = 'apply-ai-plan-btn';
        applyBtn.textContent = activeLang === 'fa' ? '✅ اعمال برنامه به تقویم' : (activeLang === 'de' ? '✅ Plan auf Kalender anwenden' : '✅ Apply plan to calendar');
        
        applyBtn.onclick = handleApplyAiPlanToCalendar;
        btnBox.appendChild(applyBtn);
        aiSuggestionBox.appendChild(btnBox);
      }
    } else {
      aiSuggestionBox.innerHTML = '❌ Error generating plan.';
    }
  } catch (err) {
    console.error(err);
    aiSuggestionBox.innerHTML = '❌ Connection failed.';
  }
}

async function handleApplyAiPlanToCalendar() {
  if (!token || pendingAiSlots.length === 0) return;
  const btn = document.getElementById('apply-ai-plan-btn');
  btn.disabled = true;
  btn.textContent = activeLang === 'fa' ? '⌛ در حال اعمال...' : '⌛ Applying...';

  // Get tomorrow's date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const payload = pendingAiSlots.map(slot => {
    return {
      date: tomorrowStr,
      activity: slot.activity,
      duration: calculateDurationHours(slot.startTime, slot.endTime),
      productivity: 7,
      notes: slot.notes || '',
      startTime: slot.startTime,
      endTime: slot.endTime
    };
  });

  try {
    const res = await fetch('/api/activities/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ activities: payload })
    });

    if (res.ok) {
      btn.textContent = activeLang === 'fa' ? '✔️ اعمال شد!' : '✔️ Applied!';
      setTimeout(() => {
        fetchData();
        // Switch calendar date to tomorrow and view to Day view to show the result
        currentCalendarDate = tomorrow;
        switchCalendarView('day');
      }, 1000);
    } else {
      btn.disabled = false;
      btn.textContent = '❌ Error';
    }
  } catch (err) {
    console.error(err);
    btn.disabled = false;
    btn.textContent = '❌ Failed';
  }
}

// AI Wellness Mentor Consult Handler
async function handleGenerateMentorAdvice() {
  if (!token) return;
  const inputEl = document.getElementById('mentor-vent-input');
  const adviceBox = document.getElementById('mentor-advice-box');
  const btnTextEl = document.getElementById('btn-mentor-consult-text');
  
  const text = inputEl.value.trim();
  if (!text) return;

  adviceBox.classList.remove('hidden');
  adviceBox.innerHTML = activeLang === 'fa' ? '⏳ منتور در حال تحلیل داده‌های روتین و نگارش بازخورد...' : (activeLang === 'de' ? '⏳ Mentor analysiert Routinen und schreibt Feedback...' : '⏳ Mentor is analyzing routines and writing feedback...');
  
  const btnTextOriginal = btnTextEl.textContent;
  btnTextEl.textContent = activeLang === 'fa' ? '⏳ در حال تحلیل...' : '⏳ Analyzing...';
  document.getElementById('btn-mentor-consult').disabled = true;

  try {
    const res = await fetch('/api/mentor/consult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        text: text,
        lang: activeLang
      })
    });

    if (res.ok) {
      const data = await res.json();
      adviceBox.innerHTML = formatMarkdown(data.advice);
      inputEl.value = ''; // clear input after successful consultation
    } else {
      adviceBox.innerHTML = activeLang === 'fa' ? '❌ خطا در دریافت پاسخ منتور.' : '❌ Error generating advice.';
    }
  } catch (err) {
    console.error(err);
    adviceBox.innerHTML = activeLang === 'fa' ? '❌ خطای ارتباط با سرور.' : '❌ Connection failed.';
  } finally {
    btnTextEl.textContent = btnTextOriginal;
    document.getElementById('btn-mentor-consult').disabled = false;
  }
}

// Simple Markdown Formatter Helper
function formatMarkdown(text) {
  let html = text;
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/### (.*?)\n/g, '<h4>$1</h4>');
  html = html.replace(/## (.*?)\n/g, '<h3>$1</h3>');
  html = html.replace(/^\s*[\-\*]\s*(.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/g, '');
  html = html.replace(/\n/g, '<br>');
  return html;
}

// Speech Recording and MediaRecorder Config
let mediaRecorder = null;
let audioChunks = [];

function initSpeechRecognition() {
  // Dummy function for compatibility
}

async function startAudioRecording() {
  const dict = TRANSLATIONS[activeLang];
  audioChunks = [];
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    let mimeType = 'audio/webm';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'audio/ogg';
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = 'audio/mp4';
    }
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      mimeType = ''; 
    }

    mediaRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : {});
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstart = () => {
      isRecording = true;
      micBtn.classList.add('recording');
      micStatus.textContent = activeLang === 'fa' 
        ? '🎙 در حال ضبط صدای شما... برای اتمام دوباره کلیک کنید' 
        : (activeLang === 'de' ? '🎙 Aufnahme läuft... Zum Beenden erneut klicken' : '🎙 Recording audio... Click again to stop');
      transcriptBox.classList.add('hidden');
      aiResultCard.classList.add('hidden');
    };

    mediaRecorder.onstop = async () => {
      isRecording = false;
      micBtn.classList.remove('recording');
      micStatus.textContent = dict.micStatusParsing;

      const audioBlob = new Blob(audioChunks, { type: mediaRecorder.mimeType || 'audio/webm' });
      
      stream.getTracks().forEach(track => track.stop());

      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Data = reader.result.split(',')[1];
        
        try {
          const res = await fetch('/api/parse-audio', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              audio: base64Data,
              mimeType: audioBlob.type,
              lang: activeLang
            })
          });

          if (res.ok) {
            pendingParsedResult = await res.json();
            showAiParsedResults(pendingParsedResult);
          } else {
            micStatus.textContent = dict.micStatusError;
          }
        } catch (err) {
          console.error("Audio parsing failed:", err);
          micStatus.textContent = dict.micStatusError;
        }
      };
    };

    mediaRecorder.start();
  } catch (err) {
    console.error("Failed to start media recorder:", err);
    micStatus.textContent = activeLang === 'fa' 
      ? '❌ دسترسی به میکروفون مسدود شده است یا مرورگر پشتیبانی نمی‌کند.' 
      : '❌ Microphone access error or unsupported browser.';
  }
}

function stopAudioRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }
}

function toggleRecording() {
  if (isRecording) {
    stopAudioRecording();
  } else {
    startAudioRecording();
  }
}

// Show AI Parsed result card
function showAiParsedResults(data) {
  const dict = TRANSLATIONS[activeLang];
  micStatus.textContent = dict.micStatusIdle;

  // 1. Programmatically switch to Manual Log tab
  const manualTabBtn = document.querySelector('.tab-btn[data-tab="manual"]');
  if (manualTabBtn) manualTabBtn.click();

  // 2. Clear previous transcript UI
  transcriptBox.classList.add('hidden');
  aiResultCard.classList.add('hidden');

  // 3. Populate form fields based on parsed result
  if (data.type === 'activity') {
    manualType.value = 'activity';
    manualType.dispatchEvent(new Event('change'));

    document.getElementById('activity-cat').value = data.activity || 'Work';
    durationInput.value = data.duration || '';
    productivityInput.value = data.productivity || 7;
    prodValSpan.textContent = data.productivity || 7;
    notesInput.value = data.notes || '';
    startTimeInput.value = data.startTime || '';
    endTimeInput.value = data.endTime || '';
    
    // Alert user that form has been populated
    alert(activeLang === 'fa' 
      ? '📝 فیلدهای ثبت دستی بر اساس صحبت‌های شما پر شدند. لطفاً پس از بازبینی، دکمه ذخیره اطلاعات را بزنید.' 
      : '📝 Manual log fields populated based on your speech. Please review and click save.');
  } else if (data.type === 'journal') {
    manualType.value = 'journal';
    manualType.dispatchEvent(new Event('change'));

    document.getElementById('journal-sentiment').value = data.sentiment || 'neutral';
    notesInput.value = data.content || '';

    alert(activeLang === 'fa' 
      ? '📝 فیلدهای دفترچه خاطرات بر اساس صحبت‌های شما پر شدند. لطفاً پس از بازبینی، دکمه ذخیره را بزنید.' 
      : '📝 Journal fields populated based on your speech. Please review and click save.');
  } else if (data.type === 'task') {
    newTaskTitle.value = data.title || '';
    if (data.dueDate) newTaskDue.value = data.dueDate;
    newTaskPrep.checked = !!data.requiresPrep;

    // Focus task list section
    document.getElementById('btn-task-tab').click();
    newTaskTitle.focus();

    alert(activeLang === 'fa' 
      ? '🎯 فیلدهای ثبت تسک بر اساس صحبت‌های شما پر شدند. لطفاً دکمه ➕ را برای ذخیره بزنید.' 
      : '🎯 Task fields populated based on your speech. Please click ➕ to save.');
  } else if (data.type === 'schedule') {
    newScheduleActivity.value = data.activity || '';
    newScheduleTime.value = data.time || '';

    // Switch to schedule panel
    switchTaskPanel('schedules');
    newScheduleActivity.focus();

    alert(activeLang === 'fa' 
      ? '⏰ فیلدهای برنامه زمانی بر اساس صحبت‌های شما پر شدند. لطفاً دکمه ثبت برنامه را بزنید.' 
      : '⏰ Schedule fields populated based on your speech. Please click Save Schedule to save.');
  } else if (data.type === 'birthday') {
    bdayNameInput.value = data.name || '';
    bdayDateInput.value = data.date || '';

    bdayNameInput.focus();

    alert(activeLang === 'fa' 
      ? '🎂 فیلدهای ثبت تولد بر اساس صحبت‌های شما پر شدند. لطفاً دکمه ثبت تولد را بزنید.' 
      : '🎂 Birthday fields populated based on your speech. Please click Save Birthday.');
  }
}

// Confirm AI results
async function confirmAiResult() {
  if (!pendingParsedResult || !token) return;

  const today = new Date().toISOString().split('T')[0];
  let url = '';
  let payload = {};

  if (pendingParsedResult.type === 'activity') {
    url = '/api/activities';
    payload = {
      date: today,
      activity: pendingParsedResult.activity,
      duration: pendingParsedResult.duration,
      productivity: pendingParsedResult.productivity,
      notes: pendingParsedResult.notes
    };
  } else if (pendingParsedResult.type === 'journal') {
    url = '/api/journal';
    payload = {
      date: today,
      content: pendingParsedResult.content,
      sentiment: pendingParsedResult.sentiment
    };
  } else if (pendingParsedResult.type === 'task') {
    url = '/api/tasks';
    payload = {
      date: today,
      title: pendingParsedResult.title,
      dueDate: pendingParsedResult.dueDate || today,
      requiresPrep: pendingParsedResult.requiresPrep ? 1 : 0
    };
  } else if (pendingParsedResult.type === 'schedule') {
    url = '/api/schedules';
    payload = {
      time: pendingParsedResult.time,
      activity: pendingParsedResult.activity
    };
  } else if (pendingParsedResult.type === 'birthday') {
    url = '/api/birthdays';
    payload = {
      name: pendingParsedResult.name,
      date: pendingParsedResult.date
    };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      aiResultCard.classList.add('hidden');
      transcriptBox.classList.add('hidden');
      pendingParsedResult = null;
      micStatus.textContent = TRANSLATIONS[activeLang].micStatusIdle;
      
      // Update check-in heartbeat timer
      lastCheckInTime = Date.now();
      localStorage.setItem('lastCheckInTime', lastCheckInTime);

      fetchData();
      fetchTasks();
      fetchBirthdays();
      fetchSchedules();
      fetchAnniversaries(today);
    }
  } catch (err) { console.error(err); }
}

// Cancel AI result card
function cancelAiResult() {
  aiResultCard.classList.add('hidden');
  transcriptBox.classList.add('hidden');
  pendingParsedResult = null;
  micStatus.textContent = TRANSLATIONS[activeLang].micStatusIdle;
}

// Handle manual form submission
async function handleManualSubmit(e) {
  e.preventDefault();
  if (!token) return;

  const type = manualType.value;
  let url = '';
  let payload = {};

  if (type === 'activity') {
    url = '/api/activities';
    payload = {
      date: manualDate.value,
      activity: document.getElementById('activity-cat').value,
      duration: parseFloat(durationInput.value),
      productivity: parseInt(productivityInput.value),
      notes: notesInput.value,
      startTime: startTimeInput.value || null,
      endTime: endTimeInput.value || null
    };
  } else {
    url = '/api/journal';
    payload = {
      date: manualDate.value,
      content: notesInput.value,
      sentiment: document.getElementById('journal-sentiment').value
    };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      durationInput.value = '';
      notesInput.value = '';
      if (startTimeInput) startTimeInput.value = '';
      if (endTimeInput) endTimeInput.value = '';
      productivityInput.value = 7;
      prodValSpan.textContent = 7;
      
      lastCheckInTime = Date.now();
      localStorage.setItem('lastCheckInTime', lastCheckInTime);

      fetchData();
      fetchAnniversaries(manualDate.value);
      alert(activeLang === 'fa' ? '✅ اطلاعات با موفقیت در دیتابیس ذخیره شد!' : '✅ Information saved to database successfully!');
    } else {
      const errData = await res.json().catch(() => ({}));
      alert((activeLang === 'fa' ? '❌ خطا در ذخیره اطلاعات: ' : '❌ Error saving information: ') + (errData.error || res.statusText));
    }
  } catch (err) { 
    console.error(err); 
    alert(activeLang === 'fa' ? '❌ خطای شبکه در ارتباط با سرور' : '❌ Network error communicating with server');
  }
}

// Charting
function renderCharts() {
  if (typeof Chart === 'undefined') {
    console.warn("Chart.js is not loaded. Skipping chart rendering.");
    return;
  }

  const dict = TRANSLATIONS[activeLang];

  // 1. Doughnut time allocation
  const timeAlloc = {};
  Object.keys(CATEGORY_COLORS).forEach(c => { timeAlloc[c] = 0; });
  activityLogs.forEach(log => {
    if (timeAlloc[log.activity] !== undefined) {
      timeAlloc[log.activity] += log.duration;
    }
  });

  const activeCategories = Object.keys(timeAlloc).filter(c => timeAlloc[c] > 0);
  const dataValues = activeCategories.map(c => timeAlloc[c]);
  const bgColors = activeCategories.map(c => CATEGORY_COLORS[c]);
  const labels = activeCategories.map(c => dict.categoryNames[c] || c);

  // Time Chart (Overview)
  if (timeChart) timeChart.destroy();
  const canvasTime = document.getElementById('timeChart');
  if (canvasTime) {
    const ctxTime = canvasTime.getContext('2d');
    timeChart = new Chart(ctxTime, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: '#111827',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f1f5f9',
              font: { family: activeLang === 'fa' ? 'Vazirmatn' : 'Inter', size: 11 }
            }
          }
        }
      }
    });
  }

  // Dashboard Pie Chart
  if (dashboardPieChart) dashboardPieChart.destroy();
  const canvasDashTime = document.getElementById('dashboardPieChart');
  if (canvasDashTime) {
    const ctxDashTime = canvasDashTime.getContext('2d');
    dashboardPieChart = new Chart(ctxDashTime, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: bgColors,
          borderWidth: 2,
          borderColor: '#111827',
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#f1f5f9',
              font: { family: activeLang === 'fa' ? 'Vazirmatn' : 'Inter', size: 11 }
            }
          }
        }
      }
    });
  }

  // 2. Productivity trend line
  const prodByDate = {};
  activityLogs.forEach(log => {
    if (!prodByDate[log.date]) {
      prodByDate[log.date] = { sum: 0, count: 0 };
    }
    prodByDate[log.date].sum += log.productivity;
    prodByDate[log.date].count += 1;
  });

  const sortedDates = Object.keys(prodByDate).sort((a, b) => new Date(a) - new Date(b));
  const avgScores = sortedDates.map(d => prodByDate[d].sum / prodByDate[d].count);
  const formattedDates = sortedDates.map(d => formatDateLocal(d));

  // Productivity Chart (Overview)
  if (productivityChart) productivityChart.destroy();
  const canvasProd = document.getElementById('productivityChart');
  if (canvasProd) {
    const ctxProd = canvasProd.getContext('2d');
    productivityChart = new Chart(ctxProd, {
      type: 'line',
      data: {
        labels: formattedDates,
        datasets: [{
          data: avgScores,
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          borderWidth: 3,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#818cf8',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: activeLang === 'fa' ? 'Vazirmatn' : 'Inter', size: 10 } }
          },
          y: {
            min: 1,
            max: 10,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: activeLang === 'fa' ? 'Vazirmatn' : 'Inter' }, stepSize: 1 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // Dashboard Line Chart
  if (dashboardLineChart) dashboardLineChart.destroy();
  const canvasDashProd = document.getElementById('dashboardLineChart');
  if (canvasDashProd) {
    const ctxDashProd = canvasDashProd.getContext('2d');
    dashboardLineChart = new Chart(ctxDashProd, {
      type: 'line',
      data: {
        labels: formattedDates,
        datasets: [{
          data: avgScores,
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          borderWidth: 3,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#818cf8',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: activeLang === 'fa' ? 'Vazirmatn' : 'Inter', size: 10 } }
          },
          y: {
            min: 1,
            max: 10,
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8', font: { family: activeLang === 'fa' ? 'Vazirmatn' : 'Inter' }, stepSize: 1 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}

// Stats & Dashboard render functions
function updateStats() {
  // 1. Total hours
  const totalHours = activityLogs.reduce((sum, log) => sum + (log.duration || 0), 0);
  const formattedHours = Number(totalHours.toFixed(1));
  statTotalHours.textContent = activeLang === 'fa' 
    ? `${formattedHours} ساعت` 
    : (activeLang === 'de' ? `${formattedHours} Std` : `${formattedHours} hrs`);

  // 2. Today's average productivity
  const todayStr = new Date().toISOString().split('T')[0];
  const todayActs = activityLogs.filter(log => log.date === todayStr);
  let avgProd = 0;
  if (todayActs.length > 0) {
    const sum = todayActs.reduce((s, log) => s + (log.productivity || 0), 0);
    avgProd = Number((sum / todayActs.length).toFixed(1));
  } else {
    avgProd = 0;
  }
  statAvgProd.textContent = `${avgProd} / 10`;

  // 3. Total journals
  const count = journalLogs.length;
  statTotalJournals.textContent = activeLang === 'fa'
    ? `${count} یادداشت`
    : (activeLang === 'de' ? `${count} Einträge` : `${count} entries`);
}

function renderActivitiesTable() {
  const tbody = document.getElementById('logs-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const dict = TRANSLATIONS[activeLang];

  if (activityLogs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 15px;">${dict.noLogs}</td></tr>`;
    return;
  }

  activityLogs.forEach(log => {
    const tr = document.createElement('tr');
    
    const catClass = `badge-${(log.activity || '').toLowerCase()}`;
    const catName = dict.categoryNames[log.activity] || log.activity;
    
    let dotColor = '#94a3b8';
    if (log.productivity >= 8) dotColor = 'var(--accent-green)';
    else if (log.productivity >= 5) dotColor = 'var(--accent-blue)';
    else dotColor = '#ef4444';

    const formattedDate = formatDateLocal(log.date);

    tr.innerHTML = `
      <td style="white-space: nowrap; font-size: 0.8rem;">${formattedDate}</td>
      <td><span class="badge ${catClass}">${catName}</span></td>
      <td style="font-family: 'Inter', sans-serif; font-weight: 600;">
        ${log.duration} ${activeLang === 'fa' ? 'ساعت' : (activeLang === 'de' ? 'Std' : 'hrs')}
        ${(log.startTime && log.endTime) ? `<br><span style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal;">(${log.startTime} - ${log.endTime})</span>` : ''}
      </td>
      <td>
        <div class="prod-score">
          <span class="score-dot" style="background-color: ${dotColor}; box-shadow: 0 0 6px ${dotColor};"></span>
          <span style="font-family: 'Inter', sans-serif;">${log.productivity} / 10</span>
        </div>
      </td>
      <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${log.notes || ''}">${log.notes || '-'}</td>
      <td>
        <button class="btn-delete" onclick="deleteActivity('${log.id}')" title="${activeLang === 'fa' ? 'حذف' : 'Delete'}">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function renderJournalTimeline() {
  const timeline = document.getElementById('journal-timeline');
  if (!timeline) return;
  timeline.innerHTML = '';
  const dict = TRANSLATIONS[activeLang];

  if (journalLogs.length === 0) {
    timeline.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">${dict.noJournals}</div>`;
    return;
  }

  journalLogs.forEach(entry => {
    const item = document.createElement('div');
    const sentiment = entry.sentiment || 'neutral';
    item.className = `timeline-item ${sentiment}`;

    const formattedDate = formatDateLocal(entry.date);
    const sentimentLabel = dict.sentiments[sentiment] || sentiment;
    const sentimentBadgeClass = sentiment === 'positive' ? 'badge-pos' : (sentiment === 'negative' ? 'badge-neg' : 'badge-neu');

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <span class="timeline-date">${formattedDate}</span>
          <span class="badge ${sentimentBadgeClass}" style="font-size: 0.7rem;">${sentimentLabel}</span>
        </div>
        <p class="timeline-body">${entry.content}</p>
        <div style="display: flex; justify-content: flex-end; margin-top: 5px;">
          <button class="btn-delete" onclick="deleteJournal('${entry.id}')" style="padding: 2px;" title="${activeLang === 'fa' ? 'حذف یادداشت' : 'Delete Entry'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
          </button>
        </div>
      </div>
    `;
    timeline.appendChild(item);
  });
}

async function handleSeedMockData() {
  if (!token) return;
  const confirmMsg = activeLang === 'fa' 
    ? 'آیا مایلید اطلاعات نمونه ۱۰ روز گذشته برای ماه ژوئن تولید و ثبت شود؟' 
    : (activeLang === 'de' 
       ? 'Möchten Sie Beispieldaten für die letzten 10 Tage im Juni generieren?' 
       : 'Do you want to generate mock data for the last 10 days in June?');
       
  if (!confirm(confirmMsg)) return;

  const btnText = document.getElementById('lbl-seed-data-btn');
  const originalText = btnText ? btnText.textContent : '';
  if (btnText) {
    btnText.textContent = activeLang === 'fa' ? '⏳ در حال تولید...' : (activeLang === 'de' ? '⏳ Generierung...' : '⏳ Seeding...');
  }

  try {
    const res = await fetch('/api/users/seed', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (res.ok) {
      alert(activeLang === 'fa' ? '✅ اطلاعات نمونه با موفقیت تولید شد!' : '✅ Mock data generated successfully!');
      fetchData();
      const today = new Date().toISOString().split('T')[0];
      fetchAnniversaries(today);
    } else {
      alert(activeLang === 'fa' ? '❌ خطا در تولید اطلاعات نمونه' : '❌ Error seeding mock data');
    }
  } catch (err) {
    console.error(err);
    alert(activeLang === 'fa' ? '❌ خطای ارتباط با سرور' : '❌ Server communication error');
  } finally {
    if (btnText) btnText.textContent = originalText;
  }
}

// Delete functions
window.deleteActivity = async function(id) {
  const dict = TRANSLATIONS[activeLang];
  if (!confirm(dict.confirmDelete)) return;
  try {
    const res = await fetch(`/api/activities/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchData();
  } catch (err) { console.error(err); }
};

window.deleteJournal = async function(id) {
  const dict = TRANSLATIONS[activeLang];
  if (!confirm(dict.confirmDelete)) return;
  try {
    const res = await fetch(`/api/journal/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) fetchData();
  } catch (err) { console.error(err); }
};

// Date Formatter helper
function formatDateLocal(dateStr) {
  try {
    const date = new Date(dateStr + 'T00:00:00');
    const locales = { fa: 'fa-IR', en: 'en-US', de: 'de-DE' };
    return new Intl.DateTimeFormat(locales[activeLang], { month: 'long', day: 'numeric', weekday: 'short' }).format(date);
  } catch (e) {
    return dateStr;
  }
}

// Translate UI elements and set layout direction
function switchLanguage(lang) {
  activeLang = lang;
  localStorage.setItem('activeLang', lang);
  const dict = TRANSLATIONS[lang];
  
  // Set HTML language and dir attributes
  const htmlEl = document.getElementById('app-html');
  if (htmlEl) {
    htmlEl.lang = lang;
    if (lang === 'fa') {
      htmlEl.dir = 'rtl';
    } else {
      htmlEl.dir = 'ltr';
    }
  }

  // Update title
  document.title = lang === 'fa' 
    ? 'SyncRoutine | دستیار روتین و بهره‌وری هوشمند' 
    : (lang === 'de' 
       ? 'SyncRoutine | Intelligenter Routine-Assistent' 
       : 'SyncRoutine | Smart Routine Assistant');

  // Update static text elements
  const elementsToTranslate = {
    'app-tagline': dict.appTagline,
    'lbl-stat-duration': dict.lblStatDuration,
    'lbl-stat-productivity': dict.lblStatProductivity,
    'lbl-stat-journals': dict.lblStatJournals,
    'tab-voice-title': dict.tabVoiceTitle,
    'tab-manual-title': dict.tabManualTitle,
    'lbl-transcript-header': dict.lblTranscriptHeader,
    'lbl-ai-header': dict.lblAiHeader,
    'lbl-man-type': dict.lblManType,
    'opt-man-act': dict.optManAct,
    'opt-man-jou': dict.optManJou,
    'lbl-man-date': dict.lblManDate,
    'lbl-man-cat': dict.lblManCat,
    'lbl-man-start-time': dict.lblManStartTime,
    'lbl-man-end-time': dict.lblManEndTime,
    'lbl-man-duration': dict.lblManDuration,
    'lbl-man-productivity': dict.lblManProductivity,
    'lbl-man-sentiment': dict.lblManSentiment,
    'lbl-man-notes': dict.lblManNotes,
    'btn-man-save': dict.btnManSave,
    'lbl-prep-required': dict.lblPrepRequired,
    'lbl-anniversary-title': dict.lblAnniversaryTitle,
    'lbl-ai-planner-title': dict.lblAiPlannerTitle,
    'lbl-ai-planner-desc': dict.lblAiPlannerDesc,
    'btn-generate-ai-plan': dict.btnGenerateAiPlan,
    'lbl-charts-title': dict.lblChartsTitle,
    'btn-chart-time': dict.btnChartTime,
    'btn-chart-productivity': dict.btnChartProductivity,
    'lbl-settings-title': dict.lblSettingsTitle,
    'btn-tab-activities': dict.btnTabActivities,
    'btn-tab-journal': dict.btnTabJournal,
    'th-date': dict.thDate,
    'th-activity': dict.thActivity,
    'th-duration': dict.thDuration,
    'th-productivity': dict.thProductivity,
    'th-notes': dict.thNotes,
    'th-action': dict.thAction,
    'add-bday-btn': dict.btnBdaySave,
    'add-schedule-btn': activeLang === 'fa' ? 'ثبت برنامه' : (activeLang === 'de' ? 'Zeitplan speichern' : 'Save Schedule'),
    'lbl-seed-data-btn': activeLang === 'fa' ? 'تولید اطلاعات نمونه (ژوئن ۲۰۲۶)' : (activeLang === 'de' ? 'Beispieldaten generieren (Juni 2026)' : 'Seed Mock Data (June 2026)'),
    'lbl-wellness-mentor-title': dict.lblWellnessMentorTitle,
    'lbl-wellness-mentor-desc': dict.lblWellnessMentorDesc,
    'btn-mentor-consult-text': dict.btnMentorConsultText,
    'opt-cat-work': dict.optCatWork,
    'opt-cat-study': dict.optCatStudy,
    'opt-cat-exercise': dict.optCatExercise,
    'opt-cat-leisure': dict.optCatLeisure,
    'opt-cat-sleep': dict.optCatSleep,
    'opt-cat-chores': dict.optCatChores,
    'opt-sent-pos': dict.optSentPositive,
    'opt-sent-neu': dict.optSentNeutral,
    'opt-sent-neg': dict.optSentNegative,
    'app-footer-text': dict.footerText,
    'side-nav-dash': dict.sideNavDash,
    'side-nav-analytics': dict.sideNavAnalytics,
    'side-nav-tasks': dict.sideNavTasks,
    'side-nav-wellness': dict.sideNavWellness,
    'side-nav-settings': dict.sideNavSettings,
    'lbl-logout-btn': dict.lblLogoutBtn,
    'side-nav-home': dict.sideNavHome,
    'side-nav-journal': dict.sideNavJournal,
    'lbl-settings-theme': dict.lblSettingsTheme,
    'lbl-settings-bday-title': dict.lblSettingsBdayTitle,
    'opt-theme-amethyst': dict.optThemeAmethyst,
    'opt-theme-ocean': dict.optThemeOcean,
    'opt-theme-forest': dict.optThemeForest,
    'opt-theme-sunset': dict.optThemeSunset
  };

  for (const [id, text] of Object.entries(elementsToTranslate)) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  // Update input placeholders
  const bdayName = document.getElementById('bday-name');
  if (bdayName) bdayName.placeholder = dict.bdayNamePlaceholder;

  const bdayDate = document.getElementById('bday-date');
  if (bdayDate) bdayDate.placeholder = dict.bdayDatePlaceholder;

  const newTaskTitle = document.getElementById('new-task-title');
  if (newTaskTitle) newTaskTitle.placeholder = dict.taskPlaceholder;

  const newScheduleActivity = document.getElementById('new-schedule-activity');
  if (newScheduleActivity) newScheduleActivity.placeholder = activeLang === 'fa' ? 'فعالیت (مثال: جلسه کاری...)' : (activeLang === 'de' ? 'Aktivität (z.B. Meeting...)' : 'Activity (e.g., meeting...)');

  const newScheduleTime = document.getElementById('new-schedule-time');
  if (newScheduleTime) newScheduleTime.placeholder = activeLang === 'fa' ? 'ساعت (مثال: 09:00)' : (activeLang === 'de' ? 'Zeit (z.B. 09:00)' : 'Time (e.g., 09:00)');

  const mentorVentInput = document.getElementById('mentor-vent-input');
  if (mentorVentInput) mentorVentInput.placeholder = dict.mentorVentPlaceholder;

  // Update tab buttons for Tasks / Schedules
  const btnTaskTab = document.getElementById('btn-task-tab');
  if (btnTaskTab) btnTaskTab.textContent = activeLang === 'fa' ? '🎯 تسک‌های معوقه' : (activeLang === 'de' ? '🎯 Offene Aufgaben' : '🎯 Pending Tasks');
  
  const btnScheduleTab = document.getElementById('btn-schedule-tab');
  if (btnScheduleTab) btnScheduleTab.textContent = activeLang === 'fa' ? '⏰ برنامه زمانی و آلارم' : (activeLang === 'de' ? '⏰ Zeitplan & Alarm' : '⏰ Schedule & Alarms');

  // Update mic status text
  if (!isRecording) {
    micStatus.textContent = dict.micStatusIdle;
  } else {
    micStatus.textContent = dict.micStatusListening;
  }

  // Re-initialize speech recognition language if recognition is active
  if (recognition) {
    const speechLangs = { fa: 'fa-IR', en: 'en-US', de: 'de-DE' };
    recognition.lang = speechLangs[lang];
  }

  // Re-render components with translated categories/dates
  updateStats();
  renderActivitiesTable();
  renderJournalTimeline();
  renderCharts();
  renderTasks();
  renderSchedules();
  renderBirthdays();
  renderCalendar();
  
  // Re-fetch anniversaries to update memory card headers
  const today = new Date().toISOString().split('T')[0];
  fetchAnniversaries(today);
}

// Calendar & Interactive Scheduling System
const HOUR_HEIGHT = 80;
let currentCalendarDate = new Date();
let currentCalendarView = 'week'; // 'day', 'week', 'month'
let pendingAiSlots = [];
let draggedActivity = null;
let dragStartY = 0;
let dragStartTop = 0;

function initCalendar() {
  const calTodayBtn = document.getElementById('cal-today-btn');
  const calPrevBtn = document.getElementById('cal-prev-btn');
  const calNextBtn = document.getElementById('cal-next-btn');
  const calViewDay = document.getElementById('cal-view-day-btn');
  const calViewWeek = document.getElementById('cal-view-week-btn');
  const calViewMonth = document.getElementById('cal-view-month-btn');
  const calAddBtn = document.getElementById('cal-add-slot-btn');
  
  const calAddModal = document.getElementById('cal-add-modal');
  const calAddForm = document.getElementById('cal-add-form');
  const calAddClose = document.getElementById('cal-add-modal-close-btn');

  const calEditModal = document.getElementById('cal-edit-modal');
  const calEditForm = document.getElementById('cal-edit-form');
  const calEditClose = document.getElementById('cal-edit-modal-close-btn');
  const calEditDelete = document.getElementById('btn-edit-modal-delete');

  // Navigation handlers
  calTodayBtn.addEventListener('click', () => {
    currentCalendarDate = new Date();
    renderCalendar();
  });
  calPrevBtn.addEventListener('click', () => {
    adjustCalendarDate(-1);
  });
  calNextBtn.addEventListener('click', () => {
    adjustCalendarDate(1);
  });

  // View switches
  calViewDay.addEventListener('click', () => {
    switchCalendarView('day');
  });
  calViewWeek.addEventListener('click', () => {
    switchCalendarView('week');
  });
  calViewMonth.addEventListener('click', () => {
    switchCalendarView('month');
  });

  // Modals close
  calAddClose.addEventListener('click', () => calAddModal.classList.add('hidden'));
  calEditClose.addEventListener('click', () => calEditModal.classList.add('hidden'));

  // Open add modal
  calAddBtn.addEventListener('click', () => {
    document.getElementById('cal-add-date').value = currentCalendarDate.toISOString().split('T')[0];
    document.getElementById('cal-add-start-time').value = '09:00';
    document.getElementById('cal-add-end-time').value = '10:00';
    document.getElementById('cal-add-notes').value = '';
    calAddModal.classList.remove('hidden');
  });

  // Add form submit
  calAddForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!token) return;
    const cat = document.getElementById('cal-add-cat').value;
    const date = document.getElementById('cal-add-date').value;
    const prod = parseInt(document.getElementById('cal-add-productivity').value);
    const start = document.getElementById('cal-add-start-time').value;
    const end = document.getElementById('cal-add-end-time').value;
    const notes = document.getElementById('cal-add-notes').value;

    const dur = calculateDurationHours(start, end);

    try {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date,
          activity: cat,
          duration: dur,
          productivity: prod,
          notes,
          startTime: start,
          endTime: end
        })
      });
      if (res.ok) {
        calAddModal.classList.add('hidden');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Edit form submit
  calEditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!token) return;
    const id = document.getElementById('cal-edit-id').value;
    const cat = document.getElementById('cal-edit-cat').value;
    const date = document.getElementById('cal-edit-date').value;
    const prod = parseInt(document.getElementById('cal-edit-productivity').value);
    const start = document.getElementById('cal-edit-start-time').value;
    const end = document.getElementById('cal-edit-end-time').value;
    const notes = document.getElementById('cal-edit-notes').value;

    const dur = calculateDurationHours(start, end);

    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          date,
          activity: cat,
          duration: dur,
          productivity: prod,
          notes,
          startTime: start,
          endTime: end
        })
      });
      if (res.ok) {
        calEditModal.classList.add('hidden');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  });

  // Delete from modal
  calEditDelete.addEventListener('click', async () => {
    if (!token) return;
    const id = document.getElementById('cal-edit-id').value;
    const dict = TRANSLATIONS[activeLang];
    if (!confirm(dict.confirmDelete)) return;
    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        calEditModal.classList.add('hidden');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  });
}

function adjustCalendarDate(direction) {
  if (currentCalendarView === 'day') {
    currentCalendarDate.setDate(currentCalendarDate.getDate() + direction);
  } else if (currentCalendarView === 'week') {
    currentCalendarDate.setDate(currentCalendarDate.getDate() + direction * 7);
  } else if (currentCalendarView === 'month') {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
  }
  renderCalendar();
}

function switchCalendarView(view) {
  currentCalendarView = view;
  document.querySelectorAll('.calendar-view-group .btn-toggle').forEach(b => b.classList.remove('active'));
  document.getElementById(`cal-view-${view}-btn`).classList.add('active');

  document.getElementById('cal-day-view-container').classList.add('hidden');
  document.getElementById('cal-week-view-container').classList.add('hidden');
  document.getElementById('cal-month-view-container').classList.add('hidden');
  document.getElementById(`cal-${view}-view-container`).classList.remove('hidden');

  renderCalendar();
}

function renderCalendar() {
  const dateTxt = document.getElementById('cal-current-date-txt');
  if (!dateTxt) return;

  if (currentCalendarView === 'day') {
    dateTxt.textContent = formatDateLocal(currentCalendarDate);
    renderDayView();
  } else if (currentCalendarView === 'week') {
    const startOfWeek = getStartOfWeek(currentCalendarDate);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    dateTxt.textContent = `${formatDateLocal(startOfWeek)} - ${formatDateLocal(endOfWeek)}`;
    renderWeekView();
  } else if (currentCalendarView === 'month') {
    const options = { year: 'numeric', month: 'long' };
    const locale = activeLang === 'fa' ? 'fa-IR' : (activeLang === 'de' ? 'de-DE' : 'en-US');
    dateTxt.textContent = currentCalendarDate.toLocaleDateString(locale, options);
    renderMonthView();
  }
}

function renderDayView() {
  const container = document.querySelector('#cal-day-view-container .cal-hourly-grid');
  if (!container) return;
  container.innerHTML = '';

  // Render hour rows (24 hours)
  for (let h = 0; h < 24; h++) {
    const row = document.createElement('div');
    row.className = 'cal-hour-row';
    row.dataset.hour = h;

    const label = document.createElement('span');
    label.className = 'cal-hour-label';
    label.textContent = formatHourLabel(h);
    row.appendChild(label);

    container.appendChild(row);
  }

  // Filter activities for the current day
  const dateStr = currentCalendarDate.toISOString().split('T')[0];
  const dayActs = activityLogs.filter(act => act.date === dateStr && act.startTime);

  // Render activity cards
  dayActs.forEach(act => {
    const card = createActivityCardElement(act);
    
    // Calculate top and height
    const [startH, startM] = act.startTime.split(':').map(Number);
    const topOffset = (startH * HOUR_HEIGHT) + (startM / 60 * HOUR_HEIGHT) + 10;
    const durationMins = calculateDurationMinutes(act.startTime, act.endTime);
    const cardHeight = (durationMins / 60) * HOUR_HEIGHT;

    card.style.top = `${topOffset}px`;
    card.style.height = `${cardHeight}px`;
    card.style.left = '80px';
    card.style.width = 'calc(100% - 95px)';

    // Attach Drag and Drop attributes
    card.draggable = true;
    setupCardDragEvents(card, act);

    container.appendChild(card);
  });
}

function renderWeekView() {
  const container = document.getElementById('cal-week-view-container');
  if (!container) return;
  container.innerHTML = '';

  const startOfWeek = getStartOfWeek(currentCalendarDate);

  // 1. Create Header Row
  const headerRow = document.createElement('div');
  headerRow.className = 'cal-week-header-row';

  // Corner cell
  const cornerCell = document.createElement('div');
  cornerCell.className = 'cal-week-header-cell';
  cornerCell.style.width = '80px';
  headerRow.appendChild(cornerCell);

  const daysOfWeek = activeLang === 'fa' 
    ? ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const todayStr = new Date().toISOString().split('T')[0];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(dayDate.getDate() + i);

    const cell = document.createElement('div');
    const isToday = dayDate.toISOString().split('T')[0] === todayStr;
    cell.className = `cal-week-header-cell ${isToday ? 'active-day' : ''}`;
    cell.innerHTML = `<div>${daysOfWeek[i]}</div><div style="font-size: 1.1rem; font-weight:800; margin-top:3px;">${dayDate.getDate()}</div>`;
    headerRow.appendChild(cell);
  }
  container.appendChild(headerRow);

  // 2. Create Grid Body
  const gridBody = document.createElement('div');
  gridBody.className = 'cal-week-grid';
  gridBody.style.height = `${24 * HOUR_HEIGHT}px`;

  // Render vertical separator lines
  for (let i = 0; i <= 7; i++) {
    const line = document.createElement('div');
    line.className = 'cal-week-col-line';
    line.style.left = i === 0 ? '80px' : `calc(80px + (100% - 80px) * ${i - 1} / 7)`;
    gridBody.appendChild(line);
  }

  // Render hourly labels on the left column
  for (let h = 0; h < 24; h++) {
    const label = document.createElement('span');
    label.className = 'cal-hour-label';
    label.textContent = formatHourLabel(h);
    label.style.top = `${h * HOUR_HEIGHT}px`;
    label.style.left = '10px';
    gridBody.appendChild(label);
    
    // Horizontal separator dashed line
    const dashLine = document.createElement('div');
    dashLine.style.position = 'absolute';
    dashLine.style.left = '80px';
    dashLine.style.right = '0';
    dashLine.style.top = `${h * HOUR_HEIGHT}px`;
    dashLine.style.borderTop = '1px dashed rgba(255, 255, 255, 0.04)';
    gridBody.appendChild(dashLine);
  }

  // Render weekly activity cards
  const startStr = startOfWeek.toISOString().split('T')[0];
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  const endStr = endOfWeek.toISOString().split('T')[0];

  const weekActs = activityLogs.filter(act => act.date >= startStr && act.date <= endStr && act.startTime);

  weekActs.forEach(act => {
    const actDate = new Date(act.date);
    const dayIndex = (actDate.getDay() - startOfWeek.getDay() + 7) % 7;

    const card = createActivityCardElement(act);
    card.draggable = true;
    setupCardDragEvents(card, act);

    // Calculate vertical offset and height
    const [startH, startM] = act.startTime.split(':').map(Number);
    const topOffset = (startH * HOUR_HEIGHT) + (startM / 60 * HOUR_HEIGHT);
    const durationMins = calculateDurationMinutes(act.startTime, act.endTime);
    const cardHeight = (durationMins / 60) * HOUR_HEIGHT;

    card.style.top = `${topOffset}px`;
    card.style.height = `${cardHeight}px`;

    // Position horizontally in correct column
    card.style.left = `calc(82px + (100% - 80px) * ${dayIndex} / 7)`;
    card.style.width = `calc((100% - 80px) / 7 - 4px)`;

    gridBody.appendChild(card);
  });

  container.appendChild(gridBody);
}

function renderMonthView() {
  const container = document.getElementById('cal-month-view-container');
  if (!container) return;
  container.innerHTML = '';

  const tempDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), 1);
  const firstDayIndex = tempDate.getDay();
  
  const startDate = new Date(tempDate);
  startDate.setDate(startDate.getDate() - firstDayIndex);

  const todayStr = new Date().toISOString().split('T')[0];

  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(startDate);
    cellDate.setDate(cellDate.getDate() + i);

    const cell = document.createElement('div');
    const cellDateStr = cellDate.toISOString().split('T')[0];
    const isToday = cellDateStr === todayStr;
    const isDiffMonth = cellDate.getMonth() !== currentCalendarDate.getMonth();

    cell.className = `cal-month-cell ${isToday ? 'today-cell' : ''} ${isDiffMonth ? 'different-month' : ''}`;
    cell.dataset.date = cellDateStr;

    cell.addEventListener('click', () => {
      document.getElementById('cal-add-date').value = cellDateStr;
      document.getElementById('cal-add-start-time').value = '09:00';
      document.getElementById('cal-add-end-time').value = '10:00';
      document.getElementById('cal-add-notes').value = '';
      document.getElementById('cal-add-modal').classList.remove('hidden');
    });

    const dayNum = document.createElement('span');
    dayNum.className = 'cal-month-day-num';
    dayNum.textContent = cellDate.getDate().toString().padStart(2, '0');
    cell.appendChild(dayNum);

    const dayActs = activityLogs.filter(act => act.date === cellDateStr);

    if (dayActs.length > 0) {
      const badgeList = document.createElement('div');
      badgeList.className = 'cal-month-badge-list';

      dayActs.forEach(act => {
        const badge = document.createElement('div');
        badge.className = `cal-month-badge badge-${act.activity.toLowerCase()}`;
        badge.textContent = `${act.activity} (${act.duration}h)`;
        badge.title = `${act.activity}: ${act.notes || ''}`;
        
        badge.addEventListener('click', (e) => {
          e.stopPropagation();
          openEditActivityModal(act.id);
        });

        badgeList.appendChild(badge);
      });

    // Render day medals indicators
    if (typeof medalLogs !== 'undefined' && medalLogs.length > 0) {
      const dayMedals = medalLogs.filter(m => m.date === cellDateStr && m.completed === 1);
      if (dayMedals.length > 0) {
        const medalsContainer = document.createElement('div');
        medalsContainer.className = 'day-medals-container';
        dayMedals.forEach(m => {
          const dot = document.createElement('div');
          dot.className = `cal-medal-dot ${m.habitType}`;
          dot.title = m.habitType === 'reading' ? 'مطالعه کتاب' : (m.habitType === 'meditation' ? 'مدیتیشن' : 'ورزش');
          medalsContainer.appendChild(dot);
        });
        cell.appendChild(medalsContainer);
      }
    }

    cell.appendChild(badgeList);
  }

    container.appendChild(cell);
  }
}

function setupCardDragEvents(card, act) {
  card.addEventListener('dragstart', (e) => {
    draggedActivity = act;
    dragStartY = e.clientY;
    dragStartTop = parseInt(card.style.top);
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
  });
}

function initDragAndDrop() {
  const dayGrid = document.querySelector('#cal-day-view-container');
  const weekGrid = document.querySelector('#cal-week-view-container');

  if (dayGrid) {
    dayGrid.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    dayGrid.addEventListener('drop', async (e) => {
      e.preventDefault();
      if (!draggedActivity) return;
      const rect = dayGrid.getBoundingClientRect();
      const relativeY = e.clientY - rect.top + dayGrid.scrollTop;
      const topMinutes = ((relativeY - 10) / HOUR_HEIGHT) * 60;
      const snappedMinutes = Math.round(topMinutes / 15) * 15;
      const startHour = Math.floor(snappedMinutes / 60);
      const startMin = snappedMinutes % 60;

      if (startHour >= 0 && startHour < 24) {
        const durationMins = calculateDurationMinutes(draggedActivity.startTime, draggedActivity.endTime);
        const newStartStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
        let endMinutes = snappedMinutes + durationMins;
        const endHour = Math.floor(endMinutes / 60) % 24;
        const endMin = endMinutes % 60;
        const newEndStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
        await rescheduleActivity(draggedActivity.id, draggedActivity.date, newStartStr, newEndStr);
      }
      draggedActivity = null;
    });
  }

  if (weekGrid) {
    weekGrid.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
    });
    weekGrid.addEventListener('drop', async (e) => {
      e.preventDefault();
      if (!draggedActivity) return;
      const rect = weekGrid.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top + weekGrid.scrollTop;
      const gridWidth = rect.width - 80;
      const colIndex = Math.floor((relativeX - 80) / (gridWidth / 7));

      if (colIndex >= 0 && colIndex < 7) {
        const startOfWeek = getStartOfWeek(currentCalendarDate);
        const newDate = new Date(startOfWeek);
        newDate.setDate(newDate.getDate() + colIndex);
        const newDateStr = newDate.toISOString().split('T')[0];

        const topMinutes = ((relativeY - 40) / HOUR_HEIGHT) * 60;
        const snappedMinutes = Math.round(topMinutes / 15) * 15;
        const startHour = Math.floor(snappedMinutes / 60);
        const startMin = snappedMinutes % 60;

        if (startHour >= 0 && startHour < 24) {
          const durationMins = calculateDurationMinutes(draggedActivity.startTime, draggedActivity.endTime);
          const newStartStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
          let endMinutes = snappedMinutes + durationMins;
          const endHour = Math.floor(endMinutes / 60) % 24;
          const endMin = endMinutes % 60;
          const newEndStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;
          await rescheduleActivity(draggedActivity.id, newDateStr, newStartStr, newEndStr);
        }
      }
      draggedActivity = null;
    });
  }
}

async function rescheduleActivity(id, date, startTime, endTime) {
  if (!token) return;
  const originalAct = activityLogs.find(a => a.id === id);
  if (!originalAct) return;

  const duration = calculateDurationHours(startTime, endTime);

  try {
    const res = await fetch(`/api/activities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        date,
        activity: originalAct.activity,
        duration,
        productivity: originalAct.productivity,
        notes: originalAct.notes || '',
        startTime,
        endTime
      })
    });
    if (res.ok) {
      fetchData();
    }
  } catch (err) {
    console.error("Failed to reschedule activity:", err);
  }
}

window.openEditActivityModal = function(id) {
  const act = activityLogs.find(a => a.id === id);
  if (!act) return;

  document.getElementById('cal-edit-id').value = act.id;
  document.getElementById('cal-edit-cat').value = act.activity;
  document.getElementById('cal-edit-date').value = act.date;
  document.getElementById('cal-edit-productivity').value = act.productivity;
  document.getElementById('cal-edit-start-time').value = act.startTime || '09:00';
  document.getElementById('cal-edit-end-time').value = act.endTime || '10:00';
  document.getElementById('cal-edit-notes').value = act.notes || '';

  document.getElementById('cal-edit-modal').classList.remove('hidden');
};

window.deleteActivitySlot = async function(id) {
  const dict = TRANSLATIONS[activeLang];
  if (!confirm(dict.confirmDelete)) return;
  try {
    const res = await fetch(`/api/activities/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      fetchData();
    }
  } catch (err) {
    console.error(err);
  }
};

function calculateDurationHours(start, end) {
  if (!start || !end) return 1.0;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diffMinutes = (eh * 60 + em) - (sh * 60 + sm);
  if (diffMinutes < 0) diffMinutes += 24 * 60;
  return parseFloat((diffMinutes / 60).toFixed(1));
}

function calculateDurationMinutes(start, end) {
  if (!start || !end) return 60;
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 0) diff += 24 * 60;
  return diff;
}

function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
}

function formatHourLabel(h) {
  const ampm = h >= 12 ? 'PM' : 'AM';
  let hour = h % 12;
  if (hour === 0) hour = 12;
  return `${hour}:00 ${ampm}`;
}

function createActivityCardElement(act) {
  const dict = TRANSLATIONS[activeLang];
  const card = document.createElement('div');
  card.className = `cal-activity-card cal-card-${act.activity.toLowerCase()}`;
  card.dataset.id = act.id;

  const displayTime = act.startTime && act.endTime ? `${act.startTime} - ${act.endTime}` : `${act.duration}h`;
  const noteSnippet = act.notes ? `<div class="cal-card-notes">${act.notes}</div>` : '';

  card.innerHTML = `
    <div class="cal-card-header">
      <span class="cal-card-title">${dict['optCat' + act.activity] || act.activity}</span>
      <div class="cal-card-actions">
        <button class="cal-card-btn edit" onclick="openEditActivityModal('${act.id}')">✏️</button>
        <button class="cal-card-btn delete" onclick="deleteActivitySlot('${act.id}')">❌</button>
      </div>
    </div>
    <div class="cal-card-time">${displayTime} (Prod: ${act.productivity}/10)</div>
  `;
  return card;
}

// Sidebar multi-page view router & parent relocator
window.switchView = function(targetView) {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const appViews = document.querySelectorAll('.app-view');

  sidebarLinks.forEach(l => {
    if (l.getAttribute('data-view') === targetView) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  appViews.forEach(view => {
    if (view.id === `view-${targetView}`) {
      view.classList.remove('hidden');
    } else {
      view.classList.add('hidden');
    }
  });

  // Move panels dynamically to keep unique DOM IDs intact and prevent event listener loss
  const calendarCard = document.querySelector('.calendar-card');
  const chartsPanel = document.querySelector('.charts-panel');
  const logsPanel = document.querySelector('.logs-panel');
  const tasksPanel = document.getElementById('tut-tasks-panel');
  const wellnessPanel = document.getElementById('wellness-mentor-section');
  const settingsPanel = document.querySelector('.settings-panel');
  const anniversaryCard = document.getElementById('anniversary-card-section');
  const calendarBody = document.querySelector('.calendar-body');
  const medalsPanel = document.getElementById('tut-medals-panel');

  if (targetView === 'home') {
    if (calendarCard) document.getElementById('home-center-col').appendChild(calendarCard);
    if (chartsPanel) document.getElementById('home-right-col').appendChild(chartsPanel);
    if (logsPanel) document.getElementById('home-right-col').appendChild(logsPanel);
    if (tasksPanel) document.getElementById('home-left-col').appendChild(tasksPanel);
    if (wellnessPanel) document.getElementById('home-left-col').appendChild(wellnessPanel);
    if (settingsPanel) document.getElementById('home-right-col').appendChild(settingsPanel);
    if (anniversaryCard) document.getElementById('home-right-col').appendChild(anniversaryCard);
    if (medalsPanel) {
      const col = document.getElementById('home-left-col');
      col.insertBefore(medalsPanel, col.firstChild);
    }
    
    if (calendarBody) calendarBody.style.height = '600px';
    renderCalendar();
  } else if (targetView === 'dashboard') {
    if (calendarCard) document.getElementById('calendar-view-placeholder').appendChild(calendarCard);
    if (calendarBody) calendarBody.style.height = '800px';
    renderCalendar();
  } else if (targetView === 'analytics') {
    if (chartsPanel) document.getElementById('analytics-charts-placeholder').appendChild(chartsPanel);
    if (logsPanel) document.getElementById('analytics-logs-placeholder').appendChild(logsPanel);
    setTimeout(renderCharts, 50);
  } else if (targetView === 'tasks-alarms') {
    if (medalsPanel) document.getElementById('tasks-medals-placeholder').appendChild(medalsPanel);
    if (tasksPanel) document.getElementById('tasks-view-placeholder').appendChild(tasksPanel);
  } else if (targetView === 'wellness') {
    if (wellnessPanel) document.getElementById('wellness-view-placeholder').appendChild(wellnessPanel);
  } else if (targetView === 'settings') {
    if (settingsPanel) document.getElementById('settings-view-placeholder').appendChild(settingsPanel);
    if (anniversaryCard) document.getElementById('settings-view-placeholder').appendChild(anniversaryCard);
  } else if (targetView === 'journal') {
    renderVerticalJournalTimeline();
  }
};

// Form highlighting glow effect
function triggerPrefillHighlight(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.style.border = '2px solid var(--primary)';
    el.style.boxShadow = '0 0 20px var(--primary-glow)';
    el.style.transform = 'scale(1.02)';
    el.style.transition = 'all 0.4s ease';
    setTimeout(() => {
      el.style.border = '';
      el.style.boxShadow = '';
      el.style.transform = '';
    }, 4000);
  }
}

// Unified Floating Chat Assistant initializer
function initFloatingChat() {
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatWindow = document.getElementById('chat-window');
  const chatCloseBtn = document.getElementById('chat-window-close-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const chatMicBtn = document.getElementById('chat-mic-btn');

  if (!chatToggleBtn || !chatWindow) return;

  chatToggleBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    chatInput.focus();
  });

  chatCloseBtn.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
  });

  function appendChatMsg(text, type = 'system') {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${type}`;
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function handleSend(text = '', audio = null, mimeType = null) {
    if (!text && !audio) return;

    if (text) {
      appendChatMsg(text, 'user');
      chatInput.value = '';
    } else {
      appendChatMsg(activeLang === 'fa' ? '🎙 پیام صوتی فرستاده شد' : '🎙 Audio message sent', 'user');
    }

    // Add thinking indicator
    const thinkingDiv = document.createElement('div');
    thinkingDiv.className = 'chat-msg system thinking';
    thinkingDiv.textContent = activeLang === 'fa' ? '⏳ در حال فکر کردن...' : '⏳ Thinking...';
    chatMessages.appendChild(thinkingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text, audio, mimeType, lang: activeLang })
      });

      thinkingDiv.remove();

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const res = await response.json();
      
      // Append reply or action explanation
      if (res.message) {
        appendChatMsg(res.message, 'system');
      } else if (res.data && res.data.reply) {
        appendChatMsg(res.data.reply, 'system');
      } else if (res.data && res.data.advice) {
        appendChatMsg(res.data.advice, 'system');
      }

      // Handle redirect and prefill actions
      if (res.targetView) {
        switchView(res.targetView);
      }

      const data = res.data;
      if (res.intent === 'log_activity' && data) {
        // Open manual log tab
        const tabBtn = document.querySelector('.tab-btn[data-tab="manual"]');
        if (tabBtn) tabBtn.click();
        const typeSelect = document.getElementById('manual-type');
        if (typeSelect) {
          typeSelect.value = 'activity';
          typeSelect.dispatchEvent(new Event('change'));
        }

        // Prefill fields
        const dateInput = document.getElementById('manual-date');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        
        if (data.activity) {
          const actCat = document.getElementById('activity-cat');
          if (actCat) actCat.value = data.activity;
        }
        if (data.startTime) {
          const st = document.getElementById('start-time');
          if (st) st.value = data.startTime;
        }
        if (data.endTime) {
          const et = document.getElementById('end-time');
          if (et) et.value = data.endTime;
        }
        if (data.duration) {
          const dur = document.getElementById('duration');
          if (dur) dur.value = data.duration;
        }
        if (data.productivity) {
          const prod = document.getElementById('productivity');
          if (prod) {
            prod.value = data.productivity;
            const pVal = document.getElementById('prod-val');
            if (pVal) pVal.textContent = data.productivity;
          }
        }
        if (data.notes) {
          const notesText = document.getElementById('notes');
          if (notesText) notesText.value = data.notes;
        }

        triggerPrefillHighlight('tut-logger-panel');
      } else if (res.intent === 'log_journal' && data) {
        // Open manual log tab
        const tabBtn = document.querySelector('.tab-btn[data-tab="manual"]');
        if (tabBtn) tabBtn.click();
        const typeSelect = document.getElementById('manual-type');
        if (typeSelect) {
          typeSelect.value = 'journal';
          typeSelect.dispatchEvent(new Event('change'));
        }

        // Prefill fields
        const dateInput = document.getElementById('manual-date');
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
        
        if (data.sentiment) {
          const sentSelect = document.getElementById('journal-sentiment');
          if (sentSelect) sentSelect.value = data.sentiment;
        }
        if (data.content) {
          const notesText = document.getElementById('notes');
          if (notesText) notesText.value = data.content;
        }

        triggerPrefillHighlight('tut-logger-panel');
      } else if (res.intent === 'add_task' && data) {
        const taskTabBtn = document.getElementById('btn-task-tab');
        if (taskTabBtn) taskTabBtn.click();
        
        if (data.title) {
          const taskTitle = document.getElementById('new-task-title');
          if (taskTitle) taskTitle.value = data.title;
        }
        if (data.dueDate) {
          const taskDue = document.getElementById('new-task-due');
          if (taskDue) taskDue.value = data.dueDate;
        }
        const taskPrep = document.getElementById('new-task-prep');
        if (taskPrep) taskPrep.checked = !!data.requiresPrep;
        
        triggerPrefillHighlight('tut-tasks-panel');
        const taskTitle = document.getElementById('new-task-title');
        if (taskTitle) taskTitle.focus();
      } else if (res.intent === 'add_schedule' && data) {
        const schedTabBtn = document.getElementById('btn-schedule-tab');
        if (schedTabBtn) schedTabBtn.click();
        
        if (data.activity) {
          const schedAct = document.getElementById('new-schedule-activity');
          if (schedAct) schedAct.value = data.activity;
        }
        if (data.time) {
          const schedTime = document.getElementById('new-schedule-time');
          if (schedTime) schedTime.value = data.time;
        }

        triggerPrefillHighlight('tut-tasks-panel');
        const schedAct = document.getElementById('new-schedule-activity');
        if (schedAct) schedAct.focus();
      } else if (res.intent === 'add_birthday' && data) {
        if (data.name) {
          const bdayName = document.getElementById('bday-name');
          if (bdayName) bdayName.value = data.name;
        }
        if (data.date) {
          const bdayDate = document.getElementById('bday-date');
          if (bdayDate) bdayDate.value = data.date;
        }

        triggerPrefillHighlight('view-settings');
        const bdayName = document.getElementById('bday-name');
        if (bdayName) bdayName.focus();
      } else if (res.intent === 'wellness_consult' && data) {
        const adviceBox = document.getElementById('mentor-advice-box');
        if (adviceBox) {
          adviceBox.textContent = data.advice || '';
          adviceBox.classList.remove('hidden');
        }
        triggerPrefillHighlight('wellness-mentor-section');
      } else if (res.intent === 'add_medal' && data) {
        if (data.habitName) {
          document.getElementById('medal-add-name').value = data.habitName;
        }
        if (data.habitEmoji) {
          document.getElementById('medal-add-emoji').value = data.habitEmoji;
        }
        if (data.habitKey) {
          document.getElementById('medal-add-key').value = data.habitKey;
        }
        if (data.habitDesc) {
          document.getElementById('medal-add-desc').value = data.habitDesc;
        }
        
        const modal = document.getElementById('medal-add-modal');
        if (modal) modal.classList.remove('hidden');

        triggerPrefillHighlight('tut-medals-panel');
        const nameInput = document.getElementById('medal-add-name');
        if (nameInput) nameInput.focus();
      }
    } catch (err) {
      console.error(err);
      thinkingDiv.remove();
      appendChatMsg(activeLang === 'fa' ? '❌ خطایی در پردازش رخ داد. لطفاً دوباره تلاش کنید.' : '❌ Error processing input. Please try again.', 'system');
    }
  }

  chatSendBtn.addEventListener('click', () => {
    const val = chatInput.value.trim();
    if (val) handleSend(val);
  });

  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = chatInput.value.trim();
      if (val) handleSend(val);
    }
  });

  // Assistant Recording logic
  let chatMediaRecorder = null;
  let chatAudioChunks = [];
  let isChatRecording = false;

  chatMicBtn.addEventListener('click', async () => {
    if (!isChatRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        chatAudioChunks = [];
        chatMediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        
        chatMediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) chatAudioChunks.push(e.data);
        };

        chatMediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chatAudioChunks, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            handleSend('', base64Data, 'audio/webm');
          };
          
          stream.getTracks().forEach(track => track.stop());
        };

        chatMediaRecorder.start();
        isChatRecording = true;
        chatMicBtn.classList.add('recording');
        chatInput.placeholder = activeLang === 'fa' ? '🎙 در حال ضبط صدا... دوباره کلیک کنید تا متوقف شود.' : '🎙 Recording... Click again to stop.';
      } catch (err) {
        console.error(err);
        alert(activeLang === 'fa' ? 'خطا در دسترسی به میکروفون.' : 'Microphone access denied.');
      }
    } else {
      if (chatMediaRecorder && chatMediaRecorder.state !== 'inactive') {
        chatMediaRecorder.stop();
      }
      isChatRecording = false;
      chatMicBtn.classList.remove('recording');
      chatInput.placeholder = activeLang === 'fa' ? 'چیزی بنویسید یا ضبط کنید...' : 'Write something or record...';
    }
  });
}

// Render Daily Medals completion and calculate streaks
function renderMedals() {
  const todayStr = new Date().toISOString().split('T')[0];
  const container = document.querySelector('.medals-container');
  if (!container) return;

  container.innerHTML = '';
  
  const list = habitsList && habitsList.length > 0 ? habitsList : [
    { habitKey: 'reading', habitEmoji: '📖', habitName: 'مطالعه کتاب (حداقل ۱ صفحه)', habitDesc: 'عادت روزانه' },
    { habitKey: 'meditation', habitEmoji: '🧘', habitName: 'مدیتیشن و تمرکز (حداقل ۱ دقیقه)', habitDesc: 'عادت روزانه' },
    { habitKey: 'exercise', habitEmoji: '🏃', habitName: 'ورزش و تندرستی (بدون محدودیت زمان)', habitDesc: 'عادت روزانه' }
  ];

  list.forEach(habit => {
    const isDoneToday = medalLogs.some(m => m.date === todayStr && m.habitType === habit.habitKey && m.completed === 1);
    const streakVal = calculateStreak(habit.habitKey);
    
    let habitName = habit.habitName;
    let habitDesc = habit.habitDesc;
    let badgeEmoji = habit.habitEmoji;

    // Apply translations for default habits
    if (habit.habitKey === 'reading') {
      habitName = activeLang === 'fa' ? '📖 مطالعه کتاب (حداقل ۱ صفحه)' : (activeLang === 'de' ? '📖 Buch lesen (min. 1 Seite)' : '📖 Read Book (min. 1 page)');
      habitDesc = activeLang === 'fa' ? 'عادت روزانه' : (activeLang === 'de' ? 'Tägliche Gewohnheit' : 'Daily habit');
    } else if (habit.habitKey === 'meditation') {
      habitName = activeLang === 'fa' ? '🧘 مدیتیشن و تمرکز (حداقل ۱ دقیقه)' : (activeLang === 'de' ? '🧘 Meditation (min. 1 Minute)' : '🧘 Meditation (min. 1 minute)');
      habitDesc = activeLang === 'fa' ? 'عادت روزانه' : (activeLang === 'de' ? 'Tägliche Gewohnheit' : 'Daily habit');
    } else if (habit.habitKey === 'exercise') {
      habitName = activeLang === 'fa' ? '🏃 ورزش و تندرستی (بدون محدودیت زمان)' : (activeLang === 'de' ? '🏃 Sport & Gesundheit' : '🏃 Exercise & Wellness');
      habitDesc = activeLang === 'fa' ? 'عادت روزانه' : (activeLang === 'de' ? 'Tägliche Gewohnheit' : 'Daily habit');
    }

    let streakHTML = '';
    if (streakVal > 0) {
      streakHTML = activeLang === 'fa' ? `🔥 رکورد: ${streakVal} روز متوالی` : `🔥 Streak: ${streakVal} days`;
    } else {
      streakHTML = activeLang === 'fa' ? 'بدون رکورد فعال' : 'No active streak';
    }

    const row = document.createElement('div');
    row.className = 'medal-row';
    row.style = 'display: flex; align-items: center; justify-content: space-between; padding: 12px; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: 12px;';
    
    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <input type="checkbox" class="medal-checkbox" id="chk-medal-${habit.habitKey}" data-habit="${habit.habitKey}" ${isDoneToday ? 'checked' : ''} style="width: 18px; height: 18px; cursor: pointer;">
        <div class="medal-info">
          <div style="font-weight: 700; font-size: 0.9rem;">${habitName}</div>
          <div style="font-size: 0.75rem; color: ${streakVal > 0 ? '#f59e0b' : 'var(--text-muted)'};" id="lbl-streak-${habit.habitKey}">${streakHTML}</div>
        </div>
      </div>
      <div class="medal-badge ${isDoneToday ? 'active' : 'inactive'}" id="badge-medal-${habit.habitKey}" style="font-size: 1.8rem; filter: ${isDoneToday ? 'none' : 'grayscale(1)'}; transition: all 0.3s;" title="${habitName}">${badgeEmoji}</div>
    `;
    container.appendChild(row);
  });
}

// Calculate streaks consecutively backwards starting from today/yesterday
function calculateStreak(habitType) {
  let streak = 0;
  const today = new Date();
  
  while (true) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() - streak);
    const checkDateStr = checkDate.toISOString().split('T')[0];
    
    const hasMedal = medalLogs.some(m => m.date === checkDateStr && m.habitType === habitType && m.completed === 1);
    if (hasMedal) {
      streak++;
    } else {
      // Check yesterday to keep current streak alive if user hasn't ticked off today's habit yet
      if (streak === 0) {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const hasYesterday = medalLogs.some(m => m.date === yesterdayStr && m.habitType === habitType && m.completed === 1);
        
        if (hasYesterday) {
          let yStreak = 0;
          while (true) {
            const yCheckDate = new Date(yesterday);
            yCheckDate.setDate(yesterday.getDate() - yStreak);
            const yCheckDateStr = yCheckDate.toISOString().split('T')[0];
            const hasYMedal = medalLogs.some(m => m.date === yCheckDateStr && m.habitType === habitType && m.completed === 1);
            if (hasYMedal) {
              yStreak++;
            } else {
              break;
            }
          }
          return yStreak;
        }
      }
      break;
    }
  }
  return streak;
}

// Bind daily medals checkboxes actions
function bindMedalEvents() {
  document.querySelectorAll('.medal-checkbox').forEach(chk => {
    chk.addEventListener('change', async () => {
      if (!token) return;
      const habitType = chk.dataset.habit;
      const completed = chk.checked;
      const todayStr = new Date().toISOString().split('T')[0];

      try {
        const res = await fetch('/api/medals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            date: todayStr,
            habitType,
            completed
          })
        });

        if (res.ok) {
          if (completed) {
            notifSound.play().catch(e => console.log("Audio blocked by policy"));
          }
          await fetchMedalsOnly();
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
}

// Fetch medals helper
async function fetchMedalsOnly() {
  if (!token) return;
  try {
    const res = await fetch('/api/medals', { headers: { 'Authorization': `Bearer ${token}` } });
    if (res.ok) {
      medalLogs = await res.json();
      renderMedals();
      renderCalendar();
    }
  } catch (err) {
    console.error(err);
  }
}

// Render vertical journal list with AI mood stickers
function renderVerticalJournalTimeline() {
  const container = document.getElementById('journal-timeline-vertical');
  if (!container) return;
  container.innerHTML = '';
  
  const dict = TRANSLATIONS[activeLang];
  
  if (journalLogs.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 20px;">${activeLang === 'fa' ? 'هیچ یادداشتی ثبت نشده است.' : 'No journal entries yet.'}</div>`;
    return;
  }
  
  journalLogs.forEach(entry => {
    const card = document.createElement('div');
    const sentimentClass = entry.sentiment || 'neutral';
    card.className = `journal-card-vertical ${sentimentClass}`;
    
    const formattedDate = formatDateLocal(entry.date);
    const moodEmoji = entry.mood_emoji || '🧘';
    const moodLabel = entry.mood_label || (activeLang === 'fa' ? 'آرام' : 'Peaceful');
    
    card.innerHTML = `
      <div class="journal-card-header">
        <span class="journal-card-date">${formattedDate}</span>
        <div class="journal-card-sticker">
          <span>${moodEmoji}</span>
          <span>${moodLabel}</span>
        </div>
      </div>
      <div class="journal-card-body">${entry.content}</div>
    `;
    container.appendChild(card);
  });
}

// Voice recording and form submit logic for journal view
let journalMediaRecorder = null;
let journalAudioChunks = [];
let isJournalRecording = false;

function bindJournalWriterEvents() {
  const form = document.getElementById('journal-writer-form');
  const journalDateInput = document.getElementById('journal-writer-date');
  const contentInput = document.getElementById('journal-writer-content');
  const micBtnJournal = document.getElementById('journal-mic-btn');
  
  if (journalDateInput) {
    journalDateInput.value = new Date().toISOString().split('T')[0];
  }
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!token) return;
      
      const date = journalDateInput.value;
      const content = contentInput.value.trim();
      if (!content) return;
      
      const saveBtn = document.getElementById('btn-journal-writer-save');
      const originalText = saveBtn.innerHTML;
      saveBtn.disabled = true;
      saveBtn.innerHTML = activeLang === 'fa' ? '⏳ در حال تحلیل حس‌وحال...' : '⏳ Analyzing Mood...';
      
      try {
        const res = await fetch('/api/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ date, content })
        });
        
        if (res.ok) {
          const data = await res.json();
          contentInput.value = '';
          
          // Show Mood Sticker card
          const stickerPanel = document.getElementById('mood-sticker-panel');
          const stickerEmoji = document.getElementById('mood-sticker-emoji');
          const stickerLabel = document.getElementById('mood-sticker-label');
          const stickerInsight = document.getElementById('mood-sticker-insight');
          
          if (stickerPanel) {
            stickerEmoji.textContent = data.mood_emoji || '🧘';
            stickerLabel.textContent = data.mood_label || 'Peaceful';
            stickerInsight.textContent = data.insight || '';
            stickerPanel.classList.remove('hidden');
          }
          
          notifSound.play().catch(e => console.log(e));
          await fetchData();
          renderVerticalJournalTimeline();
        }
      } catch (err) {
        console.error(err);
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = originalText;
      }
    });
  }
  
  if (micBtnJournal && contentInput) {
    micBtnJournal.addEventListener('click', async () => {
      if (isJournalRecording) {
        if (journalMediaRecorder && journalMediaRecorder.state !== 'inactive') {
          journalMediaRecorder.stop();
        }
        isJournalRecording = false;
        micBtnJournal.classList.remove('recording');
        contentInput.placeholder = activeLang === 'fa' ? 'امروز چطور بود؟ چه کارهایی انجام دادید...' : 'How was today? What did you do...';
      } else {
        journalAudioChunks = [];
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          journalMediaRecorder = new MediaRecorder(stream);
          
          journalMediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) journalAudioChunks.push(event.data);
          };
          
          journalMediaRecorder.onstart = () => {
            isJournalRecording = true;
            micBtnJournal.classList.add('recording');
            contentInput.value = '';
            contentInput.placeholder = activeLang === 'fa' ? '🎙 در حال ضبط صحبت‌های شما... دوباره دکمه میکروفون را بزنید تا متوقف شود.' : '🎙 Recording... Click mic button again to stop.';
          };
          
          journalMediaRecorder.onstop = async () => {
            contentInput.placeholder = activeLang === 'fa' ? '⏳ در حال تبدیل صدا به متن...' : '⏳ Transcribing audio...';
            const audioBlob = new Blob(journalAudioChunks, { type: 'audio/webm' });
            stream.getTracks().forEach(track => track.stop());
            
            const reader = new FileReader();
            reader.readAsDataURL(audioBlob);
            reader.onloadend = async () => {
              const base64Data = reader.result.split(',')[1];
              try {
                const res = await fetch('/api/parse-audio', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify({
                    audio: base64Data,
                    mimeType: audioBlob.type,
                    lang: activeLang
                  })
                });
                
                if (res.ok) {
                  const data = await res.json();
                  if (data.type === 'journal') {
                    contentInput.value = data.content || '';
                  } else {
                    contentInput.value = data.notes || '';
                  }
                }
              } catch (err) {
                console.error(err);
              } finally {
                contentInput.placeholder = activeLang === 'fa' ? 'امروز چطور بود؟ چه کارهایی انجام دادید...' : 'How was today? What did you do...';
              }
            };
          };
          
          journalMediaRecorder.start();
        } catch (err) {
          console.error(err);
          alert(activeLang === 'fa' ? 'دسترسی به میکروفون داده نشد.' : 'Microphone access denied.');
        }
      }
    });
  }
}

// Apply selected color theme to HTML document
function applyTheme(theme) {
  const themes = {
    amethyst: {
      '--bg-color': '#0b0f19',
      '--card-bg': 'rgba(22, 28, 45, 0.65)',
      '--primary': '#6366f1',
      '--primary-hover': '#4f46e5',
      '--primary-glow': 'rgba(99, 102, 241, 0.35)',
      '--input-focus': '#818cf8'
    },
    ocean: {
      '--bg-color': '#050c1e',
      '--card-bg': 'rgba(13, 27, 56, 0.65)',
      '--primary': '#00b4d8',
      '--primary-hover': '#0077b6',
      '--primary-glow': 'rgba(0, 180, 216, 0.35)',
      '--input-focus': '#90e0ef'
    },
    forest: {
      '--bg-color': '#051610',
      '--card-bg': 'rgba(11, 37, 26, 0.65)',
      '--primary': '#10b981',
      '--primary-hover': '#059669',
      '--primary-glow': 'rgba(16, 185, 129, 0.35)',
      '--input-focus': '#34d399'
    },
    sunset: {
      '--bg-color': '#150a0a',
      '--card-bg': 'rgba(40, 18, 18, 0.65)',
      '--primary': '#f59e0b',
      '--primary-hover': '#d97706',
      '--primary-glow': 'rgba(245, 158, 11, 0.35)',
      '--input-focus': '#fbbf24'
    }
  };

  const themeVars = themes[theme] || themes.amethyst;
  for (const [key, val] of Object.entries(themeVars)) {
    document.documentElement.style.setProperty(key, val);
  }
}



