// No bundler on this site by design (see CLAUDE.md) — this just assembles
// the deployable file set into dist/ so wrangler's assets directory never
// accidentally includes repo internals (.git, .claude, docs/, CLAUDE.md,
// netlify.toml, worker/ source, node_modules).
import { cpSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST);

cpSync(path.join(ROOT, 'index.html'), path.join(DIST, 'index.html'));
cpSync(path.join(ROOT, 'src'), path.join(DIST, 'src'), { recursive: true });
cpSync(path.join(ROOT, 'public'), path.join(DIST, 'public'), { recursive: true });
cpSync(path.join(ROOT, '_headers'), path.join(DIST, '_headers'));

console.log('build: dist/ ready (index.html, src/, public/, _headers)');
