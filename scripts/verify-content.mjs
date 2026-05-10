import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app = readFileSync('src/App.tsx', 'utf8');
const constants = readFileSync('src/constants.ts', 'utf8');
const index = readFileSync('index.html', 'utf8');
const server = readFileSync('server/index.mjs', 'utf8');

const expectedSections = ['buero', 'leistungen', 'projekte', 'kompetenzen', 'geschichte', 'publikationen', 'netzwerk', 'kontakt'];

for (const id of expectedSections) {
  assert.equal(app.includes(`id: '${id}'`), true, `Navigation entry for ${id} is missing.`);
  assert.equal(app.includes(`id="${id}"`), true, `Section ${id} is missing.`);
}

assert.equal(app.includes('href={`#${item.id}`}'), true, 'Navigation links must use configured section IDs.');
assert.equal(index.includes('<html lang="de">'), true, 'HTML language must be German.');
assert.equal(index.includes('AKP Architekten Kauschke + Partner'), true, 'HTML title/metadata must contain the AKP brand.');
assert.equal(constants.includes('TODO'), false, 'Public project content must not contain TODO placeholders.');
assert.equal(app.includes('big2284.jpg'), false, 'Frontend must not reference the missing big2284.jpg asset.');
assert.match(app, /mailto:kontakt@akp-architekten\.de/, 'Contact call-to-action must provide a working mail link.');
assert.match(server, /process\.env\.PORT/, 'Railway server must bind to process.env.PORT.');
assert.match(server, /0\.0\.0\.0/, 'Railway server must listen on 0.0.0.0.');
