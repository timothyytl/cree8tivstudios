# Cree8tiv Studios website

A Next.js site for an independent app studio. The page scrolls through one day: the sky goes from dawn to night, the sun crosses the screen, a pinned clock runs through the day, the app gallery slides sideways, and the closing paragraph lights up word by word.

Built with Next.js (App Router), [Motion](https://motion.dev) for animation and [Lenis](https://lenis.darkroom.engineering) for smooth scrolling. Plain CSS, no UI framework.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make it yours

Almost everything is in **`lib/site.ts`**: studio name, domain, emails, hero copy, the three "day" moments, the closing paragraph and your apps. Each app automatically gets:

- `/<slug>/privacy` — privacy policy (use as the Privacy Policy URL in App Store Connect and Play Console)
- `/<slug>/support` — support page with FAQ and account deletion steps (use as the Support URL, and `/<slug>/support#delete-account` for Google Play's account deletion URL)

The privacy page is a **template, not legal advice**. Replace the bracketed items, check it against what your app and its SDKs actually collect, then delete the yellow note at the top.

Other places to touch:

| File | What |
|---|---|
| `app/globals.css` | Colours (top of file), type sizes, layout |
| `app/icon.svg` | Favicon |
| `components/PhoneMock.tsx` | CSS phone mock; swap for real screenshots with `next/image` later |
| `public/.well-known/` | Deep-link files (see below) |

Motion respects the system "Reduce motion" setting: entrance animations jump to their end state, smooth scrolling turns off, and pinned sections become a normal list.

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
