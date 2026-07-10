# dfpp.io Venture Terminal Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild dfpp.io as a dark, tech-forward "Venture Terminal" gateway in the existing black+gold palette, showcasing all three divisions with product grids, scroll-driven motion, and an animated hero — then deploy to Netlify.

**Architecture:** Single static page, three files (`index.html`, `src/style.css`, `src/main.js`), no build step. All visuals are CSS (gradient blobs, grid texture, glass cards); JS is limited to nav, IntersectionObserver reveals, animated counters, and the Netlify form AJAX. Spec: `docs/superpowers/specs/2026-07-09-dfpp-redesign-design.md`.

**Tech Stack:** HTML5, CSS3, vanilla JS, Google Fonts (Space Grotesk + Inter), Netlify Forms, Netlify CLI deploy.

**Verification model:** This project has no test framework (by design — no npm). Each task's "test" is a concrete browser or curl check against the local server (`python3 -m http.server 8080`), driven via Chrome at 1440/768/375 px.

---

### Task 0: Preflight — commit form fix, create feature branch

**Files:**
- Commit: `src/main.js` (existing uncommitted diff), `__forms.html` (untracked)

- [ ] **Step 1: Commit the pending Netlify Forms AJAX fix**

```bash
git add src/main.js __forms.html
git commit -m "fix: post form AJAX to static __forms.html definition for Netlify"
```

- [ ] **Step 2: Create the feature branch off develop**

```bash
git checkout -b redesign/venture-terminal
```

- [ ] **Step 3: Confirm local server is serving** (start if needed)

Run: `curl -sI http://localhost:8080/index.html | head -1`
Expected: `HTTP/1.0 200 OK`. If not: `python3 -m http.server 8080 &` from repo root.

---

### Task 1: Rewrite `index.html`

**Files:**
- Modify: `index.html` (full rewrite)

- [ ] **Step 1: Replace the entire file with the new markup**

Key structural rules:
- Reveal animation uses `data-reveal` attributes (not classes that hide content) — content must be visible without JS.
- All copy below is final, approved in the spec.
- The form block is copied **verbatim** from the current site (do not alter names/attributes) — only wrapper classes change.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DFPP — The Operating System for What's Next</title>
  <meta name="description" content="DFPP builds the machinery behind modern business — workflow automation, financial intelligence, and community infrastructure. Three divisions. One system." />
  <meta property="og:title" content="DFPP — The Operating System for What's Next" />
  <meta property="og:description" content="Three divisions. One system. Workflow automation, financial intelligence, and community infrastructure." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://dfpp.io" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="src/style.css" />
</head>
<body>

  <!-- Nav -->
  <nav class="nav" id="nav">
    <a href="/" class="wordmark">DFPP</a>
    <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links" id="nav-links">
      <a href="#divisions" class="nav-link">Divisions</a>
      <a href="#approach" class="nav-link">Approach</a>
      <a href="https://journal.dfpp.io" target="_blank" rel="noopener" class="nav-link">Journal</a>
      <a href="#contact" class="nav-link nav-link--cta">Contact</a>
    </div>
  </nav>

  <main>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg" aria-hidden="true">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
        <div class="hero-grid"></div>
      </div>

      <div class="hero-inner">
        <div class="hero-left">
          <span class="chip"><span class="pulse-dot"></span>Three divisions active · Est. 2022</span>
          <h1 class="hero-heading">The operating<br>system for<br><span class="grad-text">what's next.</span></h1>
          <p class="hero-sub">DFPP builds the machinery behind modern business — workflow automation, financial intelligence, and community infrastructure — from Kansas City, for everywhere.</p>
          <div class="hero-ctas">
            <a href="#divisions" class="btn btn--solid">Explore divisions</a>
            <a href="#contact" class="btn btn--ghost">Start a conversation</a>
          </div>
        </div>

        <div class="hero-right" aria-hidden="false">
          <a href="#agency" class="float-card float-card--1">
            <span class="float-num" style="color:var(--gold)">01</span>
            <span class="float-name">Agency</span>
            <span class="float-desc">Automation for service businesses</span>
          </a>
          <a href="#capital" class="float-card float-card--2">
            <span class="float-num" style="color:var(--champagne)">02</span>
            <span class="float-name">Capital</span>
            <span class="float-desc">Intelligent financial systems</span>
          </a>
          <a href="#collective" class="float-card float-card--3">
            <span class="float-num" style="color:var(--bronze)">03</span>
            <span class="float-name">Collective</span>
            <span class="float-desc">The Assembly — builders, together</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Proof bar -->
    <section class="proof" data-reveal>
      <div class="proof-inner">
        <div class="proof-stat"><span class="proof-num" data-count="2022" data-nogroup>0</span><span class="proof-label">Founded</span></div>
        <div class="proof-stat"><span class="proof-num" data-count="3">0</span><span class="proof-label">Divisions</span></div>
        <div class="proof-stat"><span class="proof-num" data-count="9">0</span><span class="proof-label">Products &amp; platforms</span></div>
        <div class="proof-stat"><span class="proof-num proof-num--text">KC, MO</span><span class="proof-label">Headquarters</span></div>
      </div>
    </section>

    <!-- Divisions -->
    <section class="divisions" id="divisions">
      <div class="divisions-header" data-reveal>
        <p class="eyebrow">Our divisions</p>
        <h2 class="section-heading">Three forces.<br>One system.</h2>
      </div>

      <!-- 01 Agency -->
      <article class="chapter chapter--agency" id="agency">
        <div class="chapter-inner">
          <header class="chapter-head" data-reveal>
            <span class="chapter-num">01</span>
            <div>
              <span class="chip chip--live"><span class="pulse-dot"></span>Live</span>
              <h3 class="chapter-name">DFPP Agency</h3>
              <p class="chapter-mission">Workflow automation and purpose-built software for service businesses. We eliminate phone tag, manual follow-ups, and missed bookings — so your team can focus on the work.</p>
            </div>
          </header>
          <div class="product-grid" data-reveal-group>
            <div class="product-card"><h4>GarageLink</h4><p>Scheduling and customer communication for independent auto shops.</p></div>
            <div class="product-card"><h4>PawBook Connect</h4><p>Booking and client management for pet-care businesses.</p></div>
            <div class="product-card"><h4>Event Booking Connect</h4><p>Inquiry-to-booking pipelines for venues and event pros.</p></div>
            <div class="product-card"><h4>AgentInk</h4><p>Content and publishing automation for independent agents.</p></div>
            <div class="product-card"><h4>Validate First</h4><p>Test demand before you build.</p></div>
          </div>
          <a href="https://dfppagency.com" target="_blank" rel="noopener" class="chapter-cta" data-reveal>Visit dfppagency.com <span class="cta-arrow">→</span></a>
        </div>
      </article>

      <!-- 02 Capital -->
      <article class="chapter chapter--capital" id="capital">
        <div class="chapter-inner">
          <header class="chapter-head" data-reveal>
            <span class="chapter-num">02</span>
            <div>
              <span class="chip chip--live"><span class="pulse-dot"></span>Live</span>
              <h3 class="chapter-name">DFPP Capital</h3>
              <p class="chapter-mission">Intelligent financial systems. We build the infrastructure that makes disciplined, data-driven investing and financial operations run without manual intervention.</p>
            </div>
          </header>
          <div class="product-grid" data-reveal-group>
            <div class="product-card"><h4>AMIS Trading System</h4><p>Automated multi-strategy trading infrastructure.</p></div>
            <div class="product-card"><h4>Inflation Shield</h4><p>Systematic hedging against purchasing-power erosion.</p></div>
            <div class="product-card"><h4>SmartInvoice</h4><p>Invoicing that runs itself.</p></div>
          </div>
          <a href="https://dfppcapital.com" target="_blank" rel="noopener" class="chapter-cta" data-reveal>Visit dfppcapital.com <span class="cta-arrow">→</span></a>
        </div>
      </article>

      <!-- 03 Collective -->
      <article class="chapter chapter--collective" id="collective">
        <div class="chapter-inner">
          <header class="chapter-head" data-reveal>
            <span class="chapter-num">03</span>
            <div>
              <span class="chip chip--live"><span class="pulse-dot"></span>Live</span>
              <h3 class="chapter-name">DFPP Collective</h3>
              <p class="chapter-tagline">"You didn't lose your value. You lost your employer."</p>
              <p class="chapter-mission">A vetted collective of experienced builders — developers, strategists, operators — doing principled work together, with shared upside.</p>
            </div>
          </header>
          <div class="product-grid" data-reveal-group>
            <div class="product-card product-card--wide"><h4>The Assembly</h4><p>The membership home of the Collective: vetted teams, real projects, shared equity.</p></div>
          </div>
          <a href="https://collective.dfpp.io" target="_blank" rel="noopener" class="chapter-cta" data-reveal>Visit collective.dfpp.io <span class="cta-arrow">→</span></a>
        </div>
      </article>
    </section>

    <!-- Approach -->
    <section class="approach" id="approach">
      <div class="approach-inner">
        <div class="approach-header" data-reveal>
          <p class="eyebrow">How we build</p>
          <h2 class="section-heading">Precision over speed.<br>Systems over shortcuts.</h2>
        </div>
        <div class="approach-steps" data-reveal-group>
          <div class="step"><span class="step-num">01</span><h3 class="step-title">Identify</h3><p class="step-desc">We map where time and capital are leaking — in workflows, trading systems, or community infrastructure. No assumptions. Just clarity on the gap.</p></div>
          <div class="step"><span class="step-num">02</span><h3 class="step-title">Architect</h3><p class="step-desc">We design systems purpose-built for the problem. Not off-the-shelf. Not duct-taped integrations. Clean infrastructure that does exactly what it needs to do.</p></div>
          <div class="step"><span class="step-num">03</span><h3 class="step-title">Deploy</h3><p class="step-desc">We ship, then evolve. Every system we build becomes more effective as it operates — learning, adapting, compounding value over time.</p></div>
        </div>
      </div>
    </section>

    <!-- Founder -->
    <section class="founder" id="about">
      <div class="founder-inner" data-reveal>
        <div class="founder-card">
          <div class="founder-photo-wrap" id="founder-photo-wrap">
            <img src="public/brian-jones.jpg" alt="Brian Jones, Founder of DFPP" class="founder-img"
                 onerror="document.getElementById('founder-photo-wrap').classList.add('photo-missing')" />
          </div>
          <div class="founder-content">
            <p class="eyebrow">Founder</p>
            <blockquote class="founder-quote">I built DFPP because I kept watching capable people and great small businesses lose ground to bad systems — not bad work ethic. The tools exist to fix that. We build them.</blockquote>
            <p class="founder-name">Brian Jones</p>
            <p class="founder-title">Founder &amp; CEO, DFPP LLC</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact — form block preserved verbatim from current site -->
    <section class="contact" id="contact">
      <div class="contact-inner">
        <div class="contact-left" data-reveal>
          <p class="eyebrow">Work with us</p>
          <h2 class="contact-heading">Start a<br>conversation.</h2>
          <p class="contact-sub">Whether you're exploring a partnership, evaluating our technology, or looking to build alongside DFPP — we'd like to hear from you.</p>
          <div class="contact-direct">
            <span class="contact-direct-label">Direct</span>
            <a href="mailto:hello@dfpp.io" class="contact-direct-email">hello@dfpp.io</a>
          </div>
        </div>
        <div class="contact-right" data-reveal>
          <form id="contact-form" name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form">
            <input type="hidden" name="form-name" value="contact" />
            <p class="hidden-field"><label>Leave blank: <input name="bot-field" /></label></p>
            <div class="form-row">
              <div class="form-group">
                <label for="name">Name</label>
                <input id="name" name="name" type="text" required placeholder="Your full name" />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@company.com" />
              </div>
            </div>
            <div class="form-group">
              <label for="division">Area of Interest</label>
              <select id="division" name="division" required>
                <option value="" disabled selected>Select one</option>
                <option value="agency">DFPP Agency — Workflow automation &amp; software</option>
                <option value="capital">DFPP Capital — Trading systems &amp; fintech</option>
                <option value="collective">DFPP Collective — Community &amp; builder network</option>
                <option value="partnership">Partnership or investment inquiry</option>
                <option value="general">General inquiry</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell us what you're working on..."></textarea>
            </div>
            <button type="submit" class="btn btn--solid form-btn">Send message</button>
          </form>
          <div id="form-success" class="form-success hidden">
            <p class="success-title">Message received.</p>
            <p class="success-sub">We'll be in touch within one business day.</p>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="wordmark footer-wordmark">DFPP</span>
        <nav class="footer-nav" aria-label="Footer navigation">
          <a href="#divisions" class="footer-nav-link">Divisions</a>
          <a href="#approach" class="footer-nav-link">Approach</a>
          <a href="#contact" class="footer-nav-link">Contact</a>
        </nav>
      </div>
      <div class="footer-right">
        <nav class="footer-nav" aria-label="External properties">
          <a href="https://journal.dfpp.io" target="_blank" rel="noopener" class="footer-nav-link">Journal</a>
          <a href="https://dfppagency.com" target="_blank" rel="noopener" class="footer-nav-link">Agency</a>
          <a href="https://dfppcapital.com" target="_blank" rel="noopener" class="footer-nav-link">Capital</a>
          <a href="https://collective.dfpp.io" target="_blank" rel="noopener" class="footer-nav-link">Collective</a>
        </nav>
        <a href="mailto:hello@dfpp.io" class="footer-email">hello@dfpp.io</a>
        <p class="footer-legal">&copy; <span id="year"></span> DFPP, LLC. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="src/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify the page parses and serves**

Run: `curl -s http://localhost:8080/index.html | grep -c "chapter--"`
Expected: `3`

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: new Venture Terminal markup — hero, proof bar, division chapters"
```

---

### Task 2: Rewrite `src/style.css` — tokens, base, components

**Files:**
- Modify: `src/style.css` (full rewrite)

- [ ] **Step 1: Write the foundation** (top of file)

```css
/* ── Tokens ── */
:root {
  --bg-0: #05050A;
  --bg-1: #0A0A0F;
  --bg-2: #101018;
  --text-1: #FFFFFF;
  --text-2: #94A3B8;
  --text-3: #5B6272;
  --gold: #C9A227;
  --champagne: #E5C97B;
  --bronze: #B0722E;
  --glass: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.09);
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --pad-x: clamp(20px, 6vw, 96px);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg-0);
  color: var(--text-1);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

/* ── Shared components ── */
.eyebrow {
  font-family: var(--font-display);
  font-size: 12px; font-weight: 500;
  letter-spacing: 0.22em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 16px;
}
.section-heading {
  font-family: var(--font-display);
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 700; line-height: 1.05; letter-spacing: -0.02em;
}
.chip {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-size: 11px; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--gold);
  background: rgba(201, 162, 39, 0.08);
  border: 1px solid rgba(201, 162, 39, 0.25);
  border-radius: 99px; padding: 7px 14px;
}
.pulse-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold);
  animation: pulse 2.4s ease-in-out infinite;
}
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.35; } }

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  letter-spacing: 0.04em; border-radius: 8px; padding: 14px 26px;
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.25s;
  cursor: pointer;
}
.btn--solid { background: var(--gold); color: #0A0A0F; border: none; }
.btn--solid:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(201, 162, 39, 0.35); }
.btn--ghost { border: 1px solid var(--glass-border); color: var(--text-1); background: var(--glass); }
.btn--ghost:hover { border-color: rgba(201, 162, 39, 0.5); transform: translateY(-2px); }

/* ── Reveal system: JS adds .is-hidden at load, removes on intersect. No-JS = fully visible. ── */
[data-reveal].is-hidden, [data-reveal-group] > .is-hidden { opacity: 0; transform: translateY(24px); }
[data-reveal], [data-reveal-group] > * { transition: opacity 0.7s var(--ease), transform 0.7s var(--ease); }
```

- [ ] **Step 2: Nav + hero** (append)

```css
/* ── Nav ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px var(--pad-x);
  transition: background 0.35s, backdrop-filter 0.35s, border-color 0.35s;
  border-bottom: 1px solid transparent;
}
.nav.is-scrolled {
  background: rgba(5, 5, 10, 0.72);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--glass-border);
}
.wordmark { font-family: var(--font-display); font-weight: 700; font-size: 18px; letter-spacing: 0.28em; }
.nav-links { display: flex; align-items: center; gap: 34px; }
.nav-link {
  font-family: var(--font-display); font-size: 12px; font-weight: 500;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-2);
  transition: color 0.2s;
}
.nav-link:hover { color: var(--text-1); }
.nav-link--cta {
  color: var(--gold); border: 1px solid rgba(201, 162, 39, 0.4);
  border-radius: 8px; padding: 9px 18px; transition: background 0.2s, color 0.2s;
}
.nav-link--cta:hover { background: var(--gold); color: #0A0A0F; }
.nav-toggle { display: none; background: none; border: none; }

/* ── Hero ── */
.hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; pointer-events: none; }
.hero-grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 90% 80% at 50% 40%, black 30%, transparent 75%);
}
.blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; will-change: transform; }
.blob-1 { width: 560px; height: 560px; background: rgba(201, 162, 39, 0.20); top: -12%; left: -8%; animation: drift-1 26s ease-in-out infinite alternate; }
.blob-2 { width: 460px; height: 460px; background: rgba(229, 201, 123, 0.10); bottom: -18%; right: 4%; animation: drift-2 32s ease-in-out infinite alternate; }
.blob-3 { width: 380px; height: 380px; background: rgba(176, 114, 46, 0.14); top: 32%; right: 30%; animation: drift-3 38s ease-in-out infinite alternate; }
@keyframes drift-1 { to { transform: translate(90px, 60px) scale(1.12); } }
@keyframes drift-2 { to { transform: translate(-70px, -50px) scale(1.08); } }
@keyframes drift-3 { to { transform: translate(50px, -80px) scale(0.94); } }

.hero-inner {
  position: relative; display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 48px; align-items: center; padding: 140px var(--pad-x) 80px; max-width: 1400px; margin: 0 auto; width: 100%;
}
.hero-heading {
  font-family: var(--font-display);
  font-size: clamp(44px, 7vw, 86px);
  font-weight: 700; line-height: 1.02; letter-spacing: -0.03em;
  margin: 28px 0 24px;
}
.grad-text {
  background: linear-gradient(92deg, var(--gold), var(--champagne) 60%, var(--bronze));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero-sub { color: var(--text-2); font-size: 17px; max-width: 520px; margin-bottom: 36px; }
.hero-ctas { display: flex; gap: 16px; flex-wrap: wrap; }

.hero-right { position: relative; display: flex; flex-direction: column; gap: 20px; }
.float-card {
  display: flex; flex-direction: column; gap: 4px;
  background: var(--glass); border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border-radius: 14px; padding: 20px 22px;
  transition: transform 0.3s var(--ease), border-color 0.3s, box-shadow 0.3s;
  animation: bob 7s ease-in-out infinite;
}
.float-card--2 { animation-delay: -2.3s; transform: translateX(28px); }
.float-card--3 { animation-delay: -4.6s; }
.float-card:hover { border-color: rgba(201, 162, 39, 0.45); box-shadow: 0 12px 40px rgba(0,0,0,0.45); transform: translateY(-4px) !important; animation-play-state: paused; }
@keyframes bob { 0%,100% { translate: 0 0; } 50% { translate: 0 -10px; } }
.float-num { font-family: var(--font-display); font-size: 12px; letter-spacing: 0.2em; }
.float-name { font-family: var(--font-display); font-size: 20px; font-weight: 600; }
.float-desc { font-size: 13px; color: var(--text-2); }
```

- [ ] **Step 3: Proof bar + chapters + product cards** (append)

```css
/* ── Proof bar ── */
.proof { border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border); background: var(--bg-1); }
.proof-inner {
  max-width: 1400px; margin: 0 auto; padding: 40px var(--pad-x);
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
}
.proof-stat { display: flex; flex-direction: column; gap: 4px; }
.proof-num { font-family: var(--font-display); font-size: clamp(28px, 3.4vw, 44px); font-weight: 700; color: var(--gold); font-variant-numeric: tabular-nums; }
.proof-num--text { color: var(--text-1); }
.proof-label { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-3); }

/* ── Division chapters ── */
.divisions-header { max-width: 1400px; margin: 0 auto; padding: 110px var(--pad-x) 40px; }
.chapter { position: relative; border-top: 1px solid var(--glass-border); }
.chapter-inner { max-width: 1400px; margin: 0 auto; padding: 88px var(--pad-x); position: relative; }
.chapter--agency    { --accent: var(--gold);      background: linear-gradient(180deg, rgba(201,162,39,0.05), transparent 55%); }
.chapter--capital   { --accent: var(--champagne); background: linear-gradient(180deg, rgba(229,201,123,0.045), transparent 55%); }
.chapter--collective{ --accent: var(--bronze);    background: linear-gradient(180deg, rgba(176,114,46,0.06), transparent 55%); }

.chapter-head { display: flex; gap: 32px; align-items: flex-start; margin-bottom: 44px; }
.chapter-num {
  font-family: var(--font-display); font-size: clamp(48px, 6vw, 84px); font-weight: 700;
  color: transparent; -webkit-text-stroke: 1px var(--accent); line-height: 1;
  opacity: 0.85; flex-shrink: 0;
}
.chip--live { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 35%, transparent); background: color-mix(in srgb, var(--accent) 9%, transparent); margin-bottom: 14px; }
.chip--live .pulse-dot { background: var(--accent); }
.chapter-name { font-family: var(--font-display); font-size: clamp(30px, 4vw, 48px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 14px; }
.chapter-tagline { font-family: var(--font-display); font-size: 19px; color: var(--accent); margin-bottom: 10px; font-weight: 500; }
.chapter-mission { color: var(--text-2); max-width: 640px; font-size: 16.5px; }

.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 40px; }
.product-card {
  background: var(--glass); border: 1px solid var(--glass-border); border-radius: 12px;
  padding: 22px; transition: transform 0.3s var(--ease), border-color 0.3s, background 0.3s;
}
.product-card:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--accent) 45%, transparent); background: rgba(255,255,255,0.06); }
.product-card h4 { font-family: var(--font-display); font-size: 17px; font-weight: 600; margin-bottom: 8px; }
.product-card p { font-size: 13.5px; color: var(--text-2); }
.product-card--wide { grid-column: 1 / -1; max-width: 560px; }

.chapter-cta {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent);
}
.chapter-cta .cta-arrow { transition: transform 0.25s var(--ease); }
.chapter-cta:hover .cta-arrow { transform: translateX(6px); }
```

- [ ] **Step 4: Approach, founder, contact, footer** (append)

```css
/* ── Approach ── */
.approach { border-top: 1px solid var(--glass-border); background: var(--bg-1); }
.approach-inner { max-width: 1400px; margin: 0 auto; padding: 110px var(--pad-x); }
.approach-header { margin-bottom: 64px; }
.approach-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; position: relative; }
.approach-steps::before {
  content: ''; position: absolute; top: 22px; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, var(--gold), var(--champagne), var(--bronze));
  opacity: 0.3;
}
.step { position: relative; padding-top: 52px; }
.step-num {
  position: absolute; top: 0; left: 0;
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-display); font-size: 13px; font-weight: 600;
  background: var(--bg-0); border: 1px solid rgba(201, 162, 39, 0.4); color: var(--gold);
}
.step-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; margin-bottom: 12px; }
.step-desc { color: var(--text-2); font-size: 15px; }

/* ── Founder ── */
.founder-inner { max-width: 1400px; margin: 0 auto; padding: 110px var(--pad-x); }
.founder-card {
  display: grid; grid-template-columns: 200px 1fr; gap: 48px; align-items: center;
  background: var(--glass); border: 1px solid var(--glass-border); border-radius: 18px;
  padding: 48px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.founder-photo-wrap { border-radius: 12px; overflow: hidden; border: 1px solid rgba(201,162,39,0.3); }
.founder-photo-wrap.photo-missing { display: none; }
.founder-quote { font-family: var(--font-display); font-size: clamp(19px, 2.2vw, 26px); font-weight: 500; line-height: 1.4; margin-bottom: 24px; }
.founder-name { font-weight: 600; }
.founder-title { color: var(--text-3); font-size: 14px; }

/* ── Contact ── */
.contact { border-top: 1px solid var(--glass-border); background: var(--bg-1); }
.contact-inner {
  max-width: 1400px; margin: 0 auto; padding: 110px var(--pad-x);
  display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 72px;
}
.contact-heading { font-family: var(--font-display); font-size: clamp(36px, 5vw, 60px); font-weight: 700; line-height: 1.04; letter-spacing: -0.02em; margin-bottom: 20px; }
.contact-sub { color: var(--text-2); margin-bottom: 40px; max-width: 420px; }
.contact-direct-label { display: block; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-3); margin-bottom: 6px; }
.contact-direct-email { font-family: var(--font-display); font-size: 19px; color: var(--gold); }

.contact-form { display: flex; flex-direction: column; gap: 22px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-3); }
.form-group input, .form-group select, .form-group textarea {
  background: var(--glass); border: 1px solid var(--glass-border); border-radius: 8px;
  padding: 14px 16px; color: var(--text-1); font-family: var(--font-body); font-size: 15px;
  transition: border-color 0.2s;
}
.form-group input:focus, .form-group select:focus, .form-group textarea:focus {
  outline: none; border-color: rgba(201, 162, 39, 0.55);
}
.form-group select { appearance: none; }
.form-group select option { background: var(--bg-2); }
.hidden-field { display: none; }
.form-btn { align-self: flex-start; }
.form-success.hidden { display: none; }
.success-title { font-family: var(--font-display); font-size: 24px; font-weight: 600; color: var(--gold); margin-bottom: 8px; }
.success-sub { color: var(--text-2); }

/* ── Footer ── */
.footer { border-top: 1px solid var(--glass-border); }
.footer-inner {
  max-width: 1400px; margin: 0 auto; padding: 56px var(--pad-x);
  display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap;
}
.footer-left, .footer-right { display: flex; flex-direction: column; gap: 18px; }
.footer-right { align-items: flex-end; text-align: right; }
.footer-nav { display: flex; gap: 22px; flex-wrap: wrap; }
.footer-nav-link { font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-3); transition: color 0.2s; }
.footer-nav-link:hover { color: var(--gold); }
.footer-email { color: var(--gold); font-family: var(--font-display); }
.footer-legal { color: var(--text-3); font-size: 13px; }
```

- [ ] **Step 5: Responsive + reduced motion** (append; end of file)

```css
/* ── Responsive ── */
@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; padding-top: 120px; gap: 40px; }
  .float-card--2 { transform: none; }
  .proof-inner { grid-template-columns: repeat(2, 1fr); }
  .approach-steps { grid-template-columns: 1fr; gap: 32px; }
  .approach-steps::before { display: none; }
  .founder-card { grid-template-columns: 1fr; padding: 32px; }
  .founder-photo-wrap { max-width: 200px; }
  .contact-inner { grid-template-columns: 1fr; gap: 48px; }
  .chapter-head { flex-direction: column; gap: 16px; }
  .footer-right { align-items: flex-start; text-align: left; }

  .nav-toggle { display: flex; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; z-index: 110; }
  .nav-toggle span { width: 22px; height: 2px; background: var(--text-1); transition: transform 0.3s, opacity 0.3s; }
  .nav-toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle.is-open span:nth-child(2) { opacity: 0; }
  .nav-toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav-links {
    position: fixed; inset: 0; background: rgba(5, 5, 10, 0.96);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    flex-direction: column; justify-content: center; gap: 32px;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .nav-links.is-open { opacity: 1; pointer-events: auto; }
  .nav-links .nav-link { font-size: 18px; }
}
@media (max-width: 480px) {
  .form-row { grid-template-columns: 1fr; }
  .proof-inner { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
}

/* ── Focus visibility (spec: keyboard navigable, visible focus) ── */
a:focus-visible, button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
  border-radius: 4px;
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .blob, .float-card, .pulse-dot { animation: none !important; }
  [data-reveal], [data-reveal-group] > * { transition: none !important; }
  [data-reveal].is-hidden, [data-reveal-group] > .is-hidden { opacity: 1; transform: none; }
}
```

- [ ] **Step 6: Verify serving + visual smoke check**

Run: `curl -sI http://localhost:8080/src/style.css | head -1` → `HTTP/1.0 200 OK`
Then screenshot http://localhost:8080 in Chrome — hero renders with blobs, grid, floating cards; no unstyled content.

- [ ] **Step 7: Commit**

```bash
git add src/style.css
git commit -m "feat: Venture Terminal styles — glass system, blobs, chapters, responsive"
```

---

### Task 3: Rewrite `src/main.js`

**Files:**
- Modify: `src/main.js` (full rewrite)

- [ ] **Step 1: Replace the file**

Behavior notes:
- Reveals: JS adds `.is-hidden` at load, then removes it when intersecting — so no-JS visitors see everything.
- Counters: count from 0 to `data-count` in ~1.2s when the proof bar enters view; elements with `data-nogroup` render without thousands separators (the year "2022", not "2,022").
- Form: preserves the AJAX POST to `/__forms.html` (Netlify static form definition).
- Reduced motion: skip reveal-hiding and counter animation entirely.

```js
// ── Helpers ──
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Nav: glass on scroll ──
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile nav ──
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// ── Scroll reveals ──
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const singles = [...document.querySelectorAll('[data-reveal]')];
  const groups = [...document.querySelectorAll('[data-reveal-group]')];
  const groupChildren = groups.flatMap((g) => [...g.children]);

  [...singles, ...groupChildren].forEach((el) => el.classList.add('is-hidden'));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.hasAttribute('data-reveal-group')) {
          [...el.children].forEach((child, i) =>
            setTimeout(() => child.classList.remove('is-hidden'), i * 90)
          );
        } else {
          el.classList.remove('is-hidden');
        }
        io.unobserve(el);
      });
    },
    { threshold: 0.15 }
  );

  singles.forEach((el) => io.observe(el));
  groups.forEach((el) => io.observe(el));
}

// ── Animated counters ──
const counters = [...document.querySelectorAll('[data-count]')];
const renderCount = (el, value) => {
  el.textContent = el.hasAttribute('data-nogroup')
    ? String(value)
    : value.toLocaleString('en-US');
};
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  counters.forEach((el) => renderCount(el, Number(el.dataset.count)));
} else {
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const t0 = performance.now();
        const dur = 1200;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          renderCount(el, Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        cio.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((el) => cio.observe(el));
}

// ── Contact form (Netlify AJAX) ──
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formBtn = contactForm.querySelector('.form-btn');
    if (formBtn) {
      formBtn.textContent = 'Sending…';
      formBtn.disabled = true;
    }
    fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(contactForm)).toString(),
    })
      .then(() => {
        contactForm.classList.add('hidden');
        contactForm.style.display = 'none';
        formSuccess.classList.remove('hidden');
      })
      .catch(() => {
        if (formBtn) {
          formBtn.textContent = 'Send message';
          formBtn.disabled = false;
        }
        alert('Something went wrong — email us directly at hello@dfpp.io');
      });
  });
}

// ── Footer year ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
```

- [ ] **Step 2: Verify in browser**

Reload http://localhost:8080 — check: nav gains glass after scrolling; sections fade in; counters animate in proof bar ("2022" has no comma); footer year shows current year; no console errors.

- [ ] **Step 3: Commit**

```bash
git add src/main.js
git commit -m "feat: rewrite main.js — reveals, counters, mobile nav, form AJAX"
```

---

### Task 4: Full browser verification

**Files:** none (verification only)

- [ ] **Step 1: Desktop pass (1440px)** — screenshot every section top to bottom. Check: hero blobs animate, floating cards bob and link to `#agency`/`#capital`/`#collective`, chapter accents differ (gold/champagne/bronze), product cards hover-lift, approach line gradient renders, founder card shows photo, form renders.
- [ ] **Step 2: Tablet pass (768px)** — hero stacks single-column, proof bar 2×2, approach vertical, footer left-aligned.
- [ ] **Step 3: Mobile pass (375px)** — hamburger opens/closes overlay menu, menu link closes overlay and scrolls, form fields single-column, no horizontal scroll.
- [ ] **Step 4: Links pass** — click all: 3 chapter CTAs, journal, footer links (Agency/Capital/Collective/Journal), mailto renders. External links open new tabs.
- [ ] **Step 5: Form pass** — fill name/email/division/message, submit. On localhost the fetch to `/__forms.html` returns 501 (python server) → the `.catch` alert path fires; that's expected locally. Verify button re-enables. (Real submission verified post-deploy.)
- [ ] **Step 6: Reduced-motion pass** — in Chrome DevTools: Rendering → emulate `prefers-reduced-motion`. Reload: no blob/bob animation, all content visible immediately, counters show final values.
- [ ] **Step 7: Fix anything found, then commit fixes**

```bash
git add -A && git commit -m "fix: polish pass from browser verification"
```

---

### Task 5: Merge and deploy

**Files:** none (git + Netlify CLI)

- [ ] **Step 1: Merge feature → develop → main**

```bash
git checkout develop && git merge --no-ff redesign/venture-terminal -m "merge: Venture Terminal redesign"
git checkout main && git merge develop
```

- [ ] **Step 2: Confirm with user before publishing** (outward-facing action)

- [ ] **Step 3: Push (Netlify auto-deploys from GitHub) and/or CLI deploy**

```bash
git push origin main develop
npx netlify deploy --prod --dir . 2>/dev/null || netlify deploy --prod --dir .
```

Note: repo has `.netlify/` so the site is already linked. If GitHub auto-deploy is active, the push alone triggers it — check `netlify status` / deploy log rather than double-deploying.

- [ ] **Step 4: Verify live** — fetch https://dfpp.io, confirm new `<title>`, spot-check in browser, submit one real test form entry and confirm it appears in Netlify Forms dashboard.

- [ ] **Step 5: Return to develop**

```bash
git checkout develop
```
