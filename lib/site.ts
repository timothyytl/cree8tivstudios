// Everything you'll want to change lives in this file.

export type ScreenKind = "tasks" | "focus" | "habits";

export type AppEntry = {
  slug: string; // used in URLs: /<slug>, /<slug>/privacy, /<slug>/support
  name: string;
  tagline: string;
  summary: string;
  status: string;
  platforms: string[];
  bundleId: string; // reverse-DNS, permanent once published
  appStoreUrl?: string;
  playStoreUrl?: string;
  waitlist?: boolean; // shows a "Join the waitlist" email button until store links exist
  accent: string; // the app's own colour (the studio stays neutral)
  accentSoft: string; // pale tint of the accent for backgrounds
  story: { title: string; body: string; screen: ScreenKind }[];
  privacy: {
    lastUpdated: string;
    summary?: string; // one-line "in short" under the intro
    collected: { what: string; why: string }[];
    notCollected?: string;
    thirdParties: { name: string; purpose: string }[];
    extra?: string[]; // further paragraphs, e.g. what stays on the device
    storage: string;
  };
  deletion: {
    inApp: string[]; // steps, shown as a numbered list
    timing: string; // what happens and how fast
    emailReply: string; // how quickly an emailed request is handled
    whatIsDeleted: string;
  };
  faq: { q: string; a: string }[];
};

// Which design the homepage apps section uses: "bento", "shelf" or "spotlight".
export type AppsLayout = "bento" | "shelf" | "spotlight";

export const site = {
  appsLayout: "bento" as AppsLayout,

  // Shown after your published apps in the apps section.
  upcoming: [{ name: "App two", note: "Already in the sketchbook. More when it is ready." }],

  name: "Cree8tiv Studios",
  legalName: "Cree8tiv Studios",
  domain: "cree8tivstudios.com",
  // www is the address that resolves today; switch to the bare domain once its A record is in place.
  url: "https://www.cree8tivstudios.com",
  email: "hello@cree8tivstudios.com",
  supportEmail: "support@cree8tivstudios.com",
  location: "Malaysia",
  description: "An independent studio in Malaysia making small, focused iOS and Android apps.",

  hero: {
    badge: "iOS and Android apps",
    title: "Beautifully simple apps for everyday life.",
    intro:
      "Cree8tiv Studios crafts calm, fast apps that help you plan, focus and get more done. Fewer taps, less noise, and a little delight in every screen.",
  },

  // Stacking cards on the homepage. Edit these to match how you really work.
  principles: [
    {
      title: "Offline first",
      body: "Apps open instantly and work without a connection. Sync is there when you want it.",
      tone: "ink",
    },
    {
      title: "Private by default",
      body: "Your data stays on your phone unless you choose to sync. No ads, no tracking for profit.",
      tone: "vivid",
    },
    {
      title: "One fair price",
      body: "Pay for the app, not with your attention. Simple pricing you can understand at a glance.",
      tone: "accent",
    },
    {
      title: "Built to last",
      body: "Regular updates, careful support and no surprise changes. Apps you can rely on for years.",
      tone: "line",
    },
  ],
};

export const apps: AppEntry[] = [
  {
    slug: "daywise",
    name: "Daywise",
    tagline: "Plan the day. Protect your focus. Keep your habits.",
    summary: "Tasks, notes, time blocks and habits in one calm daily view.",
    status: "In development",
    platforms: ["iOS", "Android"],
    bundleId: "com.timlimytn.daywise",
    waitlist: true,
    accent: "#2F4BD8",
    accentSoft: "#E9EDFF",
    story: [
      {
        title: "Plan the day in a minute",
        body: "A short list for today, with everything else out of sight until you need it.",
        screen: "tasks",
      },
      {
        title: "Block time for real work",
        body: "Focus sessions sit right inside your schedule, so deep work actually happens.",
        screen: "focus",
      },
      {
        title: "Close the day",
        body: "Tick off habits, move what's left to tomorrow and watch the week fill up.",
        screen: "habits",
      },
    ],
    privacy: {
      lastUpdated: "2 November 2026",
      summary:
        "In short: we only store what the app needs to work, we don't show ads, we don't sell your data, and we don't track you across apps or websites.",
      collected: [
        {
          what: "Account details: your email address, an optional display name and your password (stored only as a secure hash by our sign-in provider)",
          why: "To sign you in and sync your plans between your devices.",
        },
        {
          what: "Your content: tasks, time blocks, marked days, habits, check-ins and notes, and your Habit Garden (which flower each habit is growing and when it bloomed)",
          why: "To run the app's features and show them back to you on any device you sign in on.",
        },
        {
          what: "Reflections, if you use them: your morning intention and chosen tasks, your evening mood, a line about your day and what you were proud of, and your weekly review",
          why: "Only to show them back to you. They are private to you and never used for advertising or shared with anyone.",
        },
        {
          what: "Feedback you choose to send: your answers and message, plus the app version and platform",
          why: "To fix problems and improve the app.",
        },
      ],
      notCollected:
        "We don't collect your location, contacts, photos, advertising identifiers or usage analytics.",
      thirdParties: [
        {
          name: "Supabase",
          purpose:
            "database and sign-in, hosted in Singapore. Each account can only read its own data.",
        },
        { name: "Resend", purpose: "delivers sign-in and password-reset codes by email." },
      ],
      extra: [
        "A copy of your recent data is kept on your device so the app works offline.",
        "Reminders (habits, priority tasks, time blocks and the weekly review) are scheduled on your device. No push-notification service is used, and reminder settings stay on your device.",
      ],
      storage:
        "Your data is kept until you delete it or delete your account. Deleting your account removes it and everything in it immediately.",
    },
    deletion: {
      inApp: [
        "Open Daywise and tap the settings button (top left).",
        "Scroll to Account and tap Delete account.",
        "Confirm. Your account is deleted immediately.",
      ],
      timing: "Deletion is permanent and can't be undone. Nothing is kept afterwards.",
      emailReply: "We'll confirm within 7 days.",
      whatIsDeleted:
        "Everything: your account and email address, tasks, time blocks, marked days, habits and check-ins, notes, your Habit Garden, your morning intentions, evening reflections and weekly reviews, any sharing invites, and any feedback you sent.",
    },
    faq: [
      {
        q: "I didn't get my sign-in or reset code.",
        a: "Check your spam folder and wait a minute, then tap Send a new code. Codes expire after an hour.",
      },
      {
        q: "How do I check in a habit?",
        a: "Press and hold the habit until it fills. Hold again to undo. A quick tap opens the habit's details.",
      },
      {
        q: "How do I move a task to tomorrow or delete it?",
        a: "Swipe the task left. Swipe right to complete it. Hold and drag a task to reorder.",
      },
      {
        q: "Where do tasks without a date go?",
        a: "Tap + and choose Someday. They wait in the Later list in Plan until you give them a day, and Today suggests a few on quieter days.",
      },
      {
        q: "How does my habit's plant grow?",
        a: "Every habit grows a flower from a mystery seed. Each check-in helps it grow (faster on a 7-day streak): sprout, young plant, bud (where you find out which flower it is), then full bloom. Missing a day never kills a plant.",
      },
      {
        q: "Does it work offline?",
        a: "Yes. Your recent plans are kept on your phone, and changes sync when you're back online.",
      },
    ],
  },
];
