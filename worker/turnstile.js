// Cloudflare Turnstile verification — replaces Netlify's reCAPTCHA
// integration (100% Netlify platform magic with no Cloudflare equivalent).
// Baseline testing against the old site confirmed the invariant to
// preserve: no valid proof-of-human token -> the submission is rejected.
export async function verifyTurnstile(env, token, remoteip) {
  if (!token) return false;

  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (remoteip) body.set('remoteip', remoteip);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const result = await res.json();
  return result.success === true;
}
