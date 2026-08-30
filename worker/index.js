// Entry point for the dfpp.io Worker. Everything is static assets except
// the contact form, which the old site handled via Netlify Forms + a
// server-side reCAPTCHA check (see forms.js for the Turnstile replacement).
import { handleFormSubmission } from './forms.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/__forms.html' && request.method === 'POST') {
      return handleFormSubmission(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};
