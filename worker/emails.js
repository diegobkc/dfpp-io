// Resend sending for the contact form. Unlike the old Netlify site (which
// only pinged the operator via Netlify's own dashboard notification), this
// adds a submitter confirmation email — approved enhancement, see
// dfpp-infra-migration/migrations/dfpp-agency/slot-02-dfpp-io/PLAN.md.

export async function sendEmail(env, { to, subject, html, text }) {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY not set');

  const from = env.RESEND_FROM_EMAIL ? `Brian Jones <${env.RESEND_FROM_EMAIL}>` : 'Brian Jones <noreply@dfpp.io>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html, text }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(result));
  return result;
}

function wrapHtml(bodyHtml) {
  return `<div style="font-family:'DM Sans',Arial,sans-serif;max-width:600px;margin:0 auto;padding:40px 32px;">
  <p style="font-family:Georgia,serif;font-size:22px;margin:0 0 32px;">DFPP</p>
  ${bodyHtml}
  <p style="color:#6b7a99;font-size:13px;margin:32px 0 0;line-height:1.6;">Brian Jones<br>Founder, DFPP</p>
</div>`;
}

export async function sendContactConfirmation(env, { email, name }) {
  const first = (name || '').trim().split(/\s+/)[0];
  const greeting = first ? `Hi ${first} —` : 'Hi —';

  const html = wrapHtml(`<p style="font-size:16px;margin:0 0 16px;">${greeting} got your message.</p>
  <p style="color:#555;line-height:1.7;margin:0 0 16px;">We'll be in touch within one business day. In the meantime, feel free to explore what each division is building at <a href="https://dfpp.io">dfpp.io</a>.</p>`);

  const text = `${greeting} got your message.\n\nWe'll be in touch within one business day. In the meantime, feel free to explore what each division is building at https://dfpp.io.\n\nBrian Jones\nFounder, DFPP`;

  return sendEmail(env, { to: email, subject: "Got your message — here's what happens next", html, text });
}

export async function sendOperatorNotification(env, { fields }) {
  if (!env.NOTIFICATION_EMAIL) return null;
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6b7a99;">${k}</td><td>${String(v)}</td></tr>`)
    .join('');
  return sendEmail(env, {
    to: env.NOTIFICATION_EMAIL,
    subject: 'New contact submission — dfpp.io',
    html: `<table>${rows}</table>`,
    text: Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n'),
  });
}
