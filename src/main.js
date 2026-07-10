// ── Hero load reveal ──────────────────────────
// Add .loaded to body → triggers staggered CSS animations
document.addEventListener('DOMContentLoaded', () => {
  // Small rAF to ensure styles are applied before animation fires
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('loaded');
    });
  });
});

// ── Nav: blur on scroll ───────────────────────
const nav = document.getElementById('nav');

if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 48);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on init in case page loads mid-scroll
}

// ── Mobile hamburger menu ─────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('open', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Scroll reveal ─────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-up').forEach((el) => revealObserver.observe(el));

// ── Current year in footer ────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Contact form — Netlify AJAX submission ────
const contactForm    = document.getElementById('contact-form');
const formSuccess    = document.getElementById('form-success');
const formBtn        = contactForm?.querySelector('.form-btn');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

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
        formSuccess.classList.remove('hidden');
      })
      .catch(() => {
        // Fallback: native form submission
        contactForm.submit();
      });
  });
}
