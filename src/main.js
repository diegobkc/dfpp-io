// ── Helpers ──
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Nav: glass on scroll ──
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── Mobile nav ──
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navLinks.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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
      .then((response) => {
        if (!response.ok) throw new Error('Form submission rejected');
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
