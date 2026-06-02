# Optimum Knowledge Challenge

A community quiz challenge for the Optimum project — the Universal Data Acceleration Network.

10 randomized questions (drawn from a bank of 40), four rank tiers, and a downloadable
certificate-banner with a ready-to-post tweet in your voice.

## Files

```
index.html        → main page (intro / quiz / results)
style.css         → all styling (premium dark + liquid metal accents)
app.js            → quiz logic, randomization, certificate generation, tweet builder
questions.js      → the 40-question bank
assets/
  optimum-logo-white.png   → wordmark logo (nav + certificate)
  optimum-icon-white.svg   → icon-only logo
  favicon.svg              → browser tab icon
  mascot.png               → ⚠️ ADD YOUR MASCOT HERE (used on certificate)
```

## Setup

1. Drop your mascot image into `assets/mascot.png` (transparent PNG works best,
   roughly square or portrait. it renders bottom-right on the certificate).
2. That's it. Open `index.html` or deploy the folder.

## Deploy

**GitHub Pages:** push repo → Settings → Pages → deploy from `main` branch root.

**Vercel:** import the GitHub repo, no build step needed (static site).

## Customization quick-reference

- **Add/edit questions:** `questions.js`. Each entry has `d` (difficulty),
  `q` (question), `o` (4 options), `a` (correct index), `e` (explanation).
- **Change tiers / rank names:** `TIERS` array at the top of `app.js`.
- **Edit the tweet text:** `buildTweet()` in `app.js`.
- **Brand colors:** CSS variables at the top of `style.css`.

The quiz picks ~4 easy / 4 medium / 2 hard each run, shuffles question order,
and shuffles answer positions — so repeat plays feel fresh.
