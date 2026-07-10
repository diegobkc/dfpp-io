# dfpp.io Complete Redesign — Design Spec

**Date:** 2026-07-09
**Status:** Approved pending user review
**Direction:** "Venture Terminal" — dark tech-forward venture-studio aesthetic in the existing black + gold palette.

## Goal

dfpp.io is the gateway for the entire DFPP ecosystem. The redesign must look like the work of a professional design and marketing team: professional, dynamic, and a balanced router that showcases all three divisions equally and lets visitors self-select.

## Audience

Balanced gateway — no single visitor type is prioritized. Small-business owners (Agency), partners/investors (Capital, company-level), and builders/talent (Collective) all get an equal-weight path.

## Visual System

| Token | Value |
|---|---|
| Canvas | Near-black gradient `#05050A → #0A0A0F` |
| Text primary | `#FFFFFF` |
| Text secondary | Slate `#94A3B8` |
| Accent — Agency | Gold `#C9A227` |
| Accent — Capital | Champagne `#E5C97B` |
| Accent — Collective | Bronze/amber `#B0722E` |
| Surfaces | Glass cards: 4% white fill, 1px 9% white border, backdrop blur, glow on hover |
| Display type | Space Grotesk (Google Fonts) |
| Body type | Inter (Google Fonts) |
| Labels | Small uppercase letterspaced eyebrows and status chips |

- Hero background: faint grid texture + 2–3 large gold-toned gradient blobs drifting slowly (CSS keyframes, `transform`/`opacity` only).
- Status language throughout: live-pulse dots and chips (e.g., "● THREE DIVISIONS ACTIVE") — the company presented as a running system.
- The three division accents are tonal siblings of gold so each chapter is distinct while the brand stays unified.

## Page Structure (single page, top to bottom)

1. **Nav** — fixed; transparent over hero, glass blur after scroll. DFPP wordmark, links: Divisions, Approach, Journal (journal.dfpp.io), Contact CTA. Mobile: overlay menu.
2. **Hero** — status chip, headline **"The operating system for what's next."**, one-line sub naming the three divisions, dual CTA (*Explore divisions* → `#divisions`, *Start a conversation* → `#contact`). Right column: three drifting glass mini-cards, one per division, each clickable to its section/domain.
3. **Proof bar** — animated counters: Est. 2022 · 3 divisions · 9 products & platforms · Kansas City, MO.
4. **Division chapters ×3** — full-bleed sections, each washed in its accent:
   - **01 Agency** (gold) — workflow automation and purpose-built software for service businesses. Product grid: GarageLink, PawBook Connect, Event Booking Connect, AgentInk, Validate First. CTA → dfppagency.com.
   - **02 Capital** (champagne) — intelligent financial systems. Product grid: AMIS Trading System, Inflation Shield, SmartInvoice. CTA → dfppcapital.com.
   - **03 Collective** (bronze) — vetted professional collective for displaced tech workers and independent builders. Product: The Assembly. Message anchor: "You didn't lose your value. You lost your employer." CTA → collective.dfpp.io.
   - Each chapter: number, name, mission line, product cards (name + one-line description), CTA out.
5. **Approach** — Identify → Architect → Deploy as a horizontal timeline that highlights on scroll. Copy carried over from current site.
6. **Founder** — Brian Jones photo (`public/brian-jones.jpg`) + quote, styled as a terminal/ID-card. Keeps `onerror` fallback.
7. **Contact** — split layout: pitch + direct email left, Netlify form right. Form preserved exactly: `data-netlify="true"`, honeypot `bot-field`, name/email/division-select/message, success-state swap.
8. **Footer** — wordmark, sitemap anchors, external links (Journal, Agency, Capital, Collective), hello@dfpp.io, legal.

## Motion & Interaction

- Scroll reveals via IntersectionObserver — staggered fade/slide, tuned timing.
- Proof-bar counters animate from 0 when scrolled into view.
- Card hovers: lift + gold border glow. CTA arrows nudge on hover.
- Hero blobs and floating cards: slow CSS keyframe drift/bob.
- All animation gated behind `prefers-reduced-motion: reduce` (reveals render visible, counters render final values, drift disabled).
- Full keyboard navigability, visible focus states.

## Tech Constraints

- **Stack unchanged:** `index.html`, `src/style.css`, `src/main.js`. No build step, no framework, no npm (per CLAUDE.md).
- Zero external images except the founder photo — all visuals are CSS. (Current Unsplash hero image is dropped.)
- Google Fonts: Space Grotesk + Inter with `preconnect`.
- Performance target: < 1s load on mobile preserved.
- OG/meta tags updated to match new headline and positioning.
- Pre-work: reconcile untracked `__forms.html` and uncommitted `src/main.js` change in the working tree before starting.

## Error Handling

- Form: HTML `required` validation, success message swap on submit, native POST fallback when JS is disabled.
- Founder photo `onerror` fallback retained.
- No-JS: all content visible (reveal classes must not hide content without JS).

## Testing / Verification

- Drive the real site in Chrome at 375px, 768px, and 1440px widths.
- Test: mobile nav open/close, form fill + submit path, every division link, anchor navigation, reduced-motion mode.
- Verify before deploy; deploy = commit on `develop` → merge to `main` → Netlify CLI publish → verify live URL. User confirms before anything goes public.

## Out of Scope

- No changes to division sites (dfppagency.com, dfppcapital.com, collective.dfpp.io).
- No new pages (privacy/terms stubs unchanged if present).
- No CMS, no analytics changes, no email setup.

## Decisions Log

| Decision | Choice |
|---|---|
| Audience priority | Balanced gateway |
| Art direction | C — Venture Terminal, adapted to existing black+gold palette |
| Page architecture | Vertical narrative + scroll-driven polish (no scroll-jacking) |
| Sections | Product showcases per division, proof bar, founder, approach — all in |
| Headline | "The operating system for what's next." |
| Stack | Vanilla HTML/CSS/JS, no build |
