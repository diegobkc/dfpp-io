// Netlify Forms + reCAPTCHA replacement. Handles POST /__forms.html (kept as
// the endpoint name so no frontend POST-target changes were needed) with
// honeypot-then-Turnstile verification, an R2 submission archive, and Resend
// notification + confirmation emails.
import { verifyTurnstile } from './turnstile.js';
import { sendContactConfirmation, sendOperatorNotification } from './emails.js';

async function archiveSubmission(env, fields) {
  if (!env.SUBMISSIONS) return;
  const key = `contact/${new Date().toISOString()}-${crypto.randomUUID()}.json`;
  await env.SUBMISSIONS.put(key, JSON.stringify(fields, null, 2), {
    httpMetadata: { contentType: 'application/json' },
  });
}

export async function handleFormSubmission(request, env, ctx) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const contentType = request.headers.get('content-type') || '';
  let fields;
  if (contentType.includes('application/x-www-form-urlencoded')) {
    fields = Object.fromEntries(new URLSearchParams(await request.text()));
  } else if (contentType.includes('multipart/form-data')) {
    fields = Object.fromEntries((await request.formData()).entries());
  } else {
    return new Response('Unsupported Content-Type', { status: 415 });
  }

  // Honeypot first — cheap, fails fast for bots without spending a
  // Turnstile siteverify call. Bots fill every field including this hidden
  // one; return 200 (no signal to the bot) but do nothing else.
  if (fields['bot-field']) {
    return new Response(null, { status: 200 });
  }

  // Baseline-confirmed invariant: no valid proof-of-human token -> rejected.
  const token = fields['cf-turnstile-response'];
  const verified = await verifyTurnstile(env, token, request.headers.get('cf-connecting-ip'));
  if (!verified) {
    return new Response('Turnstile verification failed', { status: 400 });
  }

  ctx.waitUntil(
    (async () => {
      try {
        await archiveSubmission(env, fields);
      } catch (err) {
        console.error('contact: archive failed', err.message);
      }

      try {
        await sendOperatorNotification(env, { fields });
      } catch (err) {
        console.error('contact: operator notification failed', err.message);
      }

      const email = fields.email;
      if (!email) {
        console.log('contact: no email address in submission, skipping confirmation');
        return;
      }
      try {
        const result = await sendContactConfirmation(env, { email, name: fields.name });
        console.log('contact: confirmation sent', result.id, 'to', email);
      } catch (err) {
        console.error('contact: confirmation send failed', err.message);
      }
    })()
  );

  return new Response(null, { status: 200 });
}
