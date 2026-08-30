#!/usr/bin/env bash
# Push dfpp.io's runtime secrets from Doppler to its Cloudflare Worker.
#
# RUN IN A NORMAL TERMINAL, OUTSIDE CLAUDE CODE — the pipe carries secret VALUES (never
# printed). Doppler has no native Workers sync (Pages only); this scripted bulk push is the
# documented pattern: https://docs.doppler.com/docs/cloudflare-workers
#
# Re-run after rotating any secret. Rotation order: source dashboard (Resend/Turnstile) ->
# Doppler -> this script -> redeploy. See migrations/dfpp-agency/slot-02-dfpp-io/RUNBOOK.md
# in dfpp-infra-migration.
set -euo pipefail
cd "$(dirname "$0")/.."

WORKER_NAME="dfpp-io"       # must match wrangler.jsonc "name"
DOPPLER_PROJECT="dfpp-io"
DOPPLER_CONFIG="prd"

# Allowlist ONLY the vars the Worker reads at RUNTIME (keep in step with worker/emails.js
# and worker/turnstile.js). RESEND_API_KEY/RESEND_FROM_EMAIL are reused from the
# dfppagency-web Doppler project by value, not by reference -- Doppler has no cross-project
# secret references, so they're copied into this project's own config.
KEEP='["TURNSTILE_SECRET_KEY","RESEND_API_KEY","RESEND_FROM_EMAIL","NOTIFICATION_EMAIL"]'

doppler secrets --json -p "$DOPPLER_PROJECT" -c "$DOPPLER_CONFIG" \
  | jq -c 'with_entries(.value = .value.computed)' \
  | jq -c --argjson keep "$KEEP" 'with_entries(select(.key as $k | $keep | index($k)) | select(.value != null))' \
  | npx wrangler secret bulk --name "$WORKER_NAME"

echo
echo "Secrets now on the Worker (names only):"
npx wrangler secret list --name "$WORKER_NAME" | jq -r '.[].name' 2>/dev/null || npx wrangler secret list --name "$WORKER_NAME"
echo "Done. Redeploy if the change must reach in-flight isolates immediately."
