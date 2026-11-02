// Everything you'll want to change lives in this file.
// Swap the placeholder studio name, domain, emails and apps for your own.

export type AppEntry = {
  slug: string; // used in URLs: /<slug>/privacy, /<slug>/support
  name: string;
  workingTitle?: boolean;
  summary: string;
  status: string;
  platforms: string[];
  bundleId: string; // reverse-DNS, permanent once published
  appStoreUrl?: string;
  playStoreUrl?: string;
  accent: string; // card + phone mock colour
  accentInk: string; // text colour that reads on the accent
  screen: "planner" | "generic"; // which phone mock to draw
  privacy: {
    lastUpdated: string;
    collected: { what: string; why: string }[];
    thirdParties: { name: string; purpose: string }[];
    storage: string;
  };
  faq: { q: string; a: string }[];
};

export const site = {
  name: "Cree8tiv Studios",
  legalName: "Cree8tiv Studios",
  domain: "cree8tivstudios.com",
  url: "https://cree8tivstudios.com",
  email: "hello@cree8tivstudios.com",
  supportEmail: "support@cree8tivstudios.com",
  location: "Malaysia",
  description:
    "An independent studio making focused iOS and Android apps for planning, focus and habits.",

  hero: {
    lines: ["Software for", "the hours", "you have."],
    intro:
      "Cree8tiv Studios is a one-person app studio in Malaysia. I make small, careful apps for planning the day, doing the work and keeping good habits.",
  },

  // The pinned "day" section. Times are a real sequence, so they're shown.
  day: [
    {
      time: "07:00",
      title: "Plan the morning",
      body: "Start with a short list, not a wall of tasks. Decide what matters before the day decides for you.",
    },
    {
      time: "13:00",
      title: "Protect the afternoon",
      body: "Block time for deep work and keep the rest out. Notes and tasks stay one tap away when you need them.",
    },
    {
      time: "21:00",
      title: "Look back at night",
      body: "Tick off habits, move what's left to tomorrow, and close the day knowing where you stand.",
    },
  ],

  manifesto:
    "One developer, a short list of apps and no growth hacks. Each app does one job well, opens fast, works offline and charges a fair price instead of taking your attention.",
};

export const apps: AppEntry[] = [
  {
    slug: "daywise",
    name: "Daywise",
    summary: "Tasks, notes, time blocks and habits in one calm daily view.",
    status: "In development",
    platforms: ["iOS", "Android"],
    bundleId: "com.cree8tivstudios.daywise",
    accent: "#2F4BD8",
    accentInk: "#FFFFFF",
    screen: "planner",
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
