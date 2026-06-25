# PSM Sports Analytics — FootballOS marketing site

A self-contained, static marketing website for **PSM Sports Analytics** and the **FootballOS** platform.
No backend, no build step — just open it or drop it on any static host.

```
marketing_site/
├─ index.html              ← the whole page
├─ assets/
│  ├─ css/styles.css       ← all styling (burgundy #7b1b38 · gold #dbc078 · white)
│  ├─ js/main.js           ← nav, scroll reveal, counters, mock heatmap
│  └─ img/favicon.svg      ← PSM emblem (replace with your real logo)
├─ screenshots/            ← drop your real product "prints" here (see below)
└─ README.md
```

## View it locally

Just double-click `index.html`, **or** serve it (recommended, so fonts/paths behave exactly like production):

```bash
cd marketing_site
python -m http.server 5500
# open http://localhost:5500
```

## Deploy it

It's pure static files — host anywhere:

- **Netlify / Vercel** — drag the `marketing_site` folder onto the dashboard, or point to it in a repo.
- **GitHub Pages** — push the folder and enable Pages.
- **Your own subdomain** — upload the folder to any web server (e.g. `www.psmsportsanalytics.com`).

## Swapping the placeholder mockups for REAL screenshots ("prints")

The page currently ships with **high-fidelity HTML mockups** of five product views so it looks complete out of the box. When you have real screenshots, you can replace any mockup:

1. Capture the screen in the live app (a clean, data-rich view looks best — e.g. the coaching dashboard, a player profile, a shadow team, the recruitment board).
2. Save the PNG into `screenshots/` (e.g. `screenshots/coaching-dashboard.png`).
3. In `index.html`, find the mock block — each lives inside a `<div class="frame"> … </div>`. Replace the inner `<div class="mock …"> … </div>` with:
   ```html
   <img class="mock" src="screenshots/coaching-dashboard.png" alt="Coaching dashboard" />
   ```
   The browser frame, shadow and rounded corners stay; only the screen swaps.

The five swappable views, in order of appearance:
| Location in page | `class` on the mock | Suggested screenshot |
|---|---|---|
| Hero | `mock-dash` | Coaching / Matchday dashboard |
| Intelligence #1 | `mock-pillars` | `/performance` KPI pillars |
| Intelligence #2 | `mock-targets` | AI-Suggested Targets widget |
| Intelligence #3 | `mock-profile` | `/analytics` player profile |
| Intelligence #4 | `mock-pitch` | Shadow Team pitch |

## Theme

Clean **light / white** theme: white page, warm off-white alternating sections, a deep-burgundy AI band + footer for rhythm. Brand palette — burgundy `#7b1b38`, gold `#dbc078`, white — lives at the top of `assets/css/styles.css` under `:root`. The **product mockups stay dark on purpose** (they read like real app screenshots); their dark colours are scoped to `.frame` via CSS variables, so changing the site theme never touches them.

## The logo

The nav and footer currently use a clean CSS **wordmark** (burgundy `PSM` in the Oswald font + `Sports Analytics`), styled by `.brand-word` / `.brand-sub`. To use your exact logo artwork instead:

1. Save your logo as `assets/img/psm-logo.svg` (or `.png`).
2. In `index.html`, replace the two `<a class="brand">…</a>` blocks (nav + footer) with:
   ```html
   <a class="brand" href="#top"><img src="assets/img/psm-logo.svg" alt="PSM Sports Analytics" height="40" /></a>
   ```
   (Use a light/standard logo in the nav and a white/knock-out version in the deep-burgundy footer.)

## Editing the essentials

- **Brand name / slogan** — search `PSM Sports Analytics`, `FootballOS`, and `Your club, unified` in `index.html`.
- **Colours** — `:root` in `assets/css/styles.css` (`--wine`, `--gold`, `--gold-ink`, …). Note: gold is decorative — for gold-flavoured *text on white* use `--gold-ink`; gold text only sits on dark/burgundy areas.
- **Contact email** — search `hello@psmsportsanalytics.com` in `index.html` and replace.
- **Plans** — two tiers (`Scout`, `FootballOS`) in the `#plans` section.
- **Standings demo** — the hero mock shows real MLS Western Conference clubs (Minnesota United highlighted); edit the `.mk-standings` rows to taste.

## Notes

- Fonts (Inter + Fraunces + Oswald) load from Google Fonts. For fully offline hosting, self-host them and update the `<link>` in `index.html`.
- Everything is responsive (desktop → mobile) and respects `prefers-reduced-motion`.
