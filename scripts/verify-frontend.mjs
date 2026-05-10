import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app = readFileSync('src/App.tsx', 'utf8');
const projectDetail = readFileSync('src/components/ProjectDetail.tsx', 'utf8');
const cursor = readFileSync('src/components/Cursor.tsx', 'utf8');
const css = readFileSync('src/index.css', 'utf8');
const index = readFileSync('index.html', 'utf8');

const requiredSectionIds = ['buero', 'leistungen', 'projekte', 'kompetenzen', 'geschichte', 'publikationen', 'netzwerk', 'kontakt'];

for (const id of requiredSectionIds) {
  assert.match(app, new RegExp(`id="${id}"`), `Section #${id} must exist for navigation and deep linking.`);
  assert.match(app, new RegExp(`id: '${id}'`), `Navigation item for #${id} must exist.`);
}

assert.match(app, /<main id="top">/, 'The page must expose a #top anchor for the logo link.');
assert.match(app, /aria-label="Hauptnavigation"/, 'Main navigation must be labelled for assistive technology.');
assert.match(app, /grid md:grid-cols-2/, 'Hero/project layout must keep a responsive two-column presentation on larger screens.');
assert.match(app, /grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4/, 'Services must collapse cleanly on mobile and expand on larger screens.');
assert.match(app, /focus:outline-none focus:ring-2 focus:ring-stone-900 focus:ring-offset-4/, 'Interactive controls must have visible keyboard focus states.');
assert.match(app, /mailto:kontakt@akp-architekten\.de/, 'Contact links must remain actionable mailto links.');

assert.match(projectDetail, /role="dialog"/, 'Project detail overlay must use dialog semantics.');
assert.match(projectDetail, /aria-modal="true"/, 'Project detail overlay must mark the rest of the page as modal content.');
assert.match(projectDetail, /event\.key === 'Escape'/, 'Project detail overlay must close via Escape for keyboard users.');
assert.match(projectDetail, /document\.body\.style\.overflow = 'hidden'/, 'Project detail overlay must prevent background scrolling while open.');

assert.match(cursor, /window\.matchMedia\('\(pointer: fine\)'\)/, 'Custom cursor must be limited to fine pointer devices.');
assert.match(cursor, /return null/, 'Custom cursor must not render on unsupported pointer devices.');

assert.match(css, /scroll-behavior: smooth/, 'Anchor navigation should scroll smoothly.');
assert.match(css, /@import "tailwindcss"/, 'Tailwind CSS must be loaded for production styling.');

assert.match(index, /<meta name="viewport" content="width=device-width, initial-scale=1\.0" \/>/, 'The frontend must include a responsive viewport meta tag.');
assert.match(index, /<meta name="description"/, 'The frontend must include SEO description metadata.');
