# dfpp.io — Project Memory

Read this file first in every session before any work on this project.

## Project Overview

**Name:** dfpp.io
**Type:** Static brand hub website
**Purpose:** Parent brand entry point for the entire DFPP ecosystem. Routes visitors to the right division (Agency, Capital, Collective). Not a product page — a brand identity page.
**Domain:** dfpp.io (purchased April 2026)
**Hosting:** Netlify free tier (GitHub → auto-deploy)
**Status:** Planning → Build

## DFPP Domain Ecosystem

```
dfpp.io                       ← THIS PROJECT (parent hub)
├── dfppagency.com            ← Agency (Shop Connect, automation services)
├── dfppcapital.com           ← Fintech (AMIS Trading, Inflation Shield)
├── collective.dfpp.io        ← Community (DFPP Collective / The Assembly) [future]
└── [product domains TBD]     ← Shop Connect, etc.
```

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 |
| Styling | CSS3 (no framework — keep it lean) |
| JS | Vanilla JS only (minimal — animations, mobile menu) |
| Hosting | Netlify (free static hosting) |
| Deploy | Push to main → auto-deploy via Netlify GitHub integration |
| DNS | Point dfpp.io A record → Netlify IP |

**No build step. No npm. No framework.** This is intentional — a brand hub should deploy in seconds and load instantly. If animations warrant it, a single CDN-linked library (e.g., AOS.js for scroll animations) is acceptable.

## Project Structure

```
dfpp-io/
├── CLAUDE.md               # This file
├── index.html              # Main page (single page)
├── src/
│   ├── style.css           # All styles
│   └── main.js             # Minimal JS (mobile nav, scroll behavior)
├── public/
│   ├── favicon.ico
│   ├── og-image.png        # Open Graph / social share image (1200x630)
│   └── logo/               # DFPP wordmark variants (SVG)
├── docs/
│   └── copy.md             # All page copy, approved and final
└── netlify.toml            # Netlify config (redirects, headers)
```

## Page Structure (Single Page)

### 1. Hero
- DFPP wordmark / logo
- One-line positioning statement
- Minimal — no CTA button needed here

### 2. Division Cards (3 cards)
- **DFPP Agency** → dfppagency.com — Automation for small businesses
- **DFPP Capital** → dfppcapital.com — Fintech and trading intelligence
- **DFPP Collective** → Coming soon — Community for builders and career changers

### 3. Footer
- hello@dfpp.io
- Kansas City, MO
- © DFPP LLC [year]
- Privacy Policy | Terms (stub pages acceptable at launch)

## Design Spec

| Element | Value |
|---------|-------|
| Background | #0A0A0F (near black) |
| Text primary | #FFFFFF |
| Text secondary | #94A3B8 (slate-400) |
| Accent | TBD — confirm with brand decision |
| Font | Inter (Google Fonts CDN) |
| Card background | #13131A |
| Card border | 1px solid rgba(255,255,255,0.08) |

**Design rules:**
- Mobile-first (most visitors arrive via phone)
- No stock photography
- Geometric/abstract visuals only if decorative elements needed
- Fast load — target < 1s on mobile
- Dark theme throughout

## Netlify Setup

1. Create Netlify account (free)
2. Connect GitHub repo: `dfpp-io`
3. Build settings: No build command, publish directory = `/` (root)
4. Add custom domain: dfpp.io
5. Enable Netlify DNS or update registrar A record to Netlify IP
6. Enable HTTPS (Netlify auto-provisions Let's Encrypt cert)

## netlify.toml (starter)

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Cache-Control = "public, max-age=3600"
```

## Google Workspace / Email

**Primary account:** Google Workspace Business Starter on dfppagency.com ($6/mo)
- brian@dfppagency.com — primary client-facing email
- Google Voice add-on ($10/mo) — KC area code phone number

**dfpp.io email:** Add hello@dfpp.io as email alias or secondary Workspace user.

## Copy Status

- [ ] Company one-liner (positioning statement) — **NEEDS DECISION**
- [ ] Agency card copy — drafted in IdeaVerse doc
- [ ] Capital card copy — drafted in IdeaVerse doc
- [ ] Collective card copy — drafted in IdeaVerse doc
- [ ] Footer legal copy — standard

## Launch Checklist

- [ ] index.html built and tested
- [ ] Mobile responsive (test at 375px, 390px, 414px)
- [ ] All division card links point to correct domains
- [ ] Deployed to Netlify
- [ ] dfpp.io DNS configured and resolving
- [ ] HTTPS active (auto via Netlify)
- [ ] Open Graph meta tags set (title, description, og-image)
- [ ] hello@dfpp.io email active

## Related Docs

- IdeaVerse: dfpp.io — Web Presence
- IdeaVerse: DFPP Master Strategy
- GitHub: dfppagency site (TBD)
- GitHub: shop-connect (agency flagship product)

---
*Created: April 2026 | Status: Planning → Build*
