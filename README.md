# Cree8tiv Studios website

The studio site for Cree8tiv Studios. The studio brand is neutral (ink and white) with one accent, signal orange, on the 8 of the C8 monogram. Each app brings its own colour on its own page.

- **Homepage:** headline with the monogram in 3D that turns, grows and drifts as you scroll; an "Our apps" section with a phone that rises into place; a band of giant sliding type; stacking cards for how you make apps; headings whose words rise in on scroll; and a footer revealed from beneath the page like a curtain.
- **App pages (`/<slug>`):** app hero in the app's colour and a pinned device story where the phone turns to face you and its screen changes per feature.
- **Privacy and support pages** for every app.

Built with Next.js (App Router), [Motion](https://motion.dev) for animation and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling. Plain CSS, no UI framework. Light and dark mode follow the visitor's system setting.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours

Almost everything is in **`lib/site.ts`**: studio details, hero copy, the four principles and your apps. Check the principles match how you really work.

The "Our apps" section has three designs. Switch with one line in `lib/site.ts`:

```ts
appsLayout: "bento" as AppsLayout, // or "shelf" or "spotlight"
```

- **bento:** a large feature card for your main app with smaller cards beside it
- **shelf:** App Store-style cards in a swipeable row with arrow buttons
- **spotlight:** a list of apps on the left; the selected one fills a large preview

Each app automatically gets:

- `/<slug>` — landing page (the device story steps come from the app's `story` list)
- `/<slug>/privacy` — privacy policy (use as the Privacy Policy URL in App Store Connect and Play Console)
- `/<slug>/support` — support page with FAQ (use as the Support URL)
- `/<slug>/delete-account` — account deletion steps (use as Google Play's account deletion URL)

The privacy page is built from each app's `privacy` entry in `lib/site.ts` and is **not legal advice**. Keep it in step with what the app and its SDKs actually collect.

Add store links (`appStoreUrl`, `playStoreUrl`) when an app launches; the waitlist button disappears automatically.

| File | What |
|---|---|
| `app/globals.css` | Brand tokens at the top (light and dark), then layout |
| `components/Logo.tsx` | The C8 mark and lockup used across the site |
| `components/PhoneScreens.tsx` | CSS-drawn app screens; swap for real screenshots later |
| `public/brand/` | Logo files (see below) |
| `public/.well-known/` | Deep-link files (see below) |

Motion respects the system "Reduce motion" setting: the 3D sway stops, smooth scrolling turns off, pinned sections become normal sections and the app window starts open.

## Brand files

`public/brand/` holds the logo:

| File | Use |
|---|---|
| `cree8tiv-mark.svg` | Main mark on light backgrounds |
| `cree8tiv-mark-on-dark.svg` | Mark on dark backgrounds |
| `cree8tiv-mark-mono-black.svg`, `-mono-white.svg` | One-colour use (print, stamps, watermarks) |
| `app-icon-dark.svg` / `-light.svg` (+ 1024 PNGs) | Social avatars, store developer profile |
| `favicon.svg`, `favicon-*.png`, `/favicon.ico` | Browser tabs |

Colours: ink `#111116`, white `#FFFFFF`, signal orange `#FF5A1F` (the 8 and highlights; use `#C2410C` for small orange text on white; orange cards use an orange-to-violet gradient with white text) and electric violet `#6E4BFF` (the second, vibrant colour for highlights and cards). Dark mode: `#0E0F14` background, `#F2F2F5` text, `#FF7A45` orange, `#8F73FF` violet. Wordmark: Syne ExtraBold. UI text: Plus Jakarta Sans.

The wordmark is live text, so for print or a vector lockup, set "CREE8TIV" in Syne ExtraBold with the 8 in orange and "STUDIOS" in Syne SemiBold with wide letter spacing, then convert to outlines in Figma.

## Put it on GitHub

```bash
git init
git add .
git commit -m "Cree8tiv Studios website"
git branch -M main
git remote add origin https://github.com/timothyytl/cree8tivstudios.git
git push -u origin main
```

(Create the empty repo on github.com first, or use `gh repo create <repo> --private --source . --push`.)

## Deploy on Vercel

1. Go to vercel.com → **Add New… → Project** → import the GitHub repo.
2. Vercel detects Next.js. Keep the defaults and click **Deploy**.
3. From now on, every push to `main` deploys to production and every pull request gets a preview URL.

## Connect your Namecheap domain

1. In Vercel: **Project → Settings → Domains**, add `cree8tivstudios.com` and `www.cree8tivstudios.com`. Make the bare domain primary and redirect `www` to it.
2. Vercel shows the DNS records it needs. In Namecheap: **Domain List → Manage → Advanced DNS**, add exactly those records (usually an `A` record for `@` and a `CNAME` for `www`). Delete Namecheap's default parking records for `@` and `www`.
3. Leave your email (`MX`, SPF/DKIM `TXT`) records alone; Vercel only needs the web records.
4. HTTPS is issued automatically once DNS resolves, usually within minutes.

If you later move DNS to Cloudflare, set the Vercel records to **DNS only** (grey cloud).

## Deep links (Universal Links / App Links)

`public/.well-known/` holds placeholder files. Before you rely on them:

- **`apple-app-site-association`** — replace `TEAMID` with your Apple Developer Team ID and adjust the paths that should open the app.
- **`assetlinks.json`** — replace the fingerprint with your app signing certificate's SHA-256 from **Play Console → Test and release → App integrity**.

`next.config.ts` serves both as `application/json`. After deploying, check:

```bash
curl -I https://cree8tivstudios.com/.well-known/apple-app-site-association
curl -I https://cree8tivstudios.com/.well-known/assetlinks.json
```

Both should return `200` with `content-type: application/json` and no redirect.
