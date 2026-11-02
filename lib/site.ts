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
    collected: { what: string; why: string }[];
    thirdParties: { name: string; purpose: string }[];
    storage: string;
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
  url: "https://cree8tivstudios.com",
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
    bundleId: "com.cree8tivstudios.daywise",
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
      collected: [
        {
          what: "Tasks, notes, schedules and habit history you create",
          why: "To provide the app's core features. Stored on your device and, if you turn on sync, in your account.",
        },
        {
          what: "Email address (only if you create an account)",
          why: "To sign you in and sync your data between devices.",
        },
        {
          what: "Anonymous crash reports",
          why: "To find and fix bugs. These contain no personal content.",
        },
      ],
      thirdParties: [
        { name: "[Your sync/backend provider, e.g. Supabase]", purpose: "Account sign-in and data sync" },
        { name: "[Your crash reporting tool]", purpose: "Crash diagnostics" },
      ],
      storage:
        "Your data is kept until you delete it or delete your account. Deleting your account removes your synced data from our servers within 30 days.",
    },
    faq: [
      {
        q: "Does it work offline?",
        a: "Yes. Everything works without a connection. Changes sync when you're back online if sync is on.",
      },
      {
        q: "How do I move my data to a new phone?",
        a: "Turn on sync in Settings and sign in with the same account on your new phone.",
      },
      {
        q: "How do I cancel a subscription?",
        a: "Subscriptions are managed by Apple or Google. Cancel from your App Store or Google Play subscription settings.",
      },
    ],
  },
];
