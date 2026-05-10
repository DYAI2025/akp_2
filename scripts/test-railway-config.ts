import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const packageJson = JSON.parse(readFileSync('package.json', 'utf8')) as {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
};
const railwayJson = JSON.parse(readFileSync('railway.json', 'utf8')) as {
  build?: {builder?: string; buildCommand?: string};
  deploy?: {startCommand?: string; healthcheckPath?: string; restartPolicyType?: string};
};
const html = readFileSync('index.html', 'utf8');

assert.equal(packageJson.scripts?.build, 'vite build', 'Railway muss einen reproduzierbaren Vite-Build ausführen.');
assert.match(packageJson.scripts?.start ?? '', /vite preview --host 0\.0\.0\.0 --port \$\{PORT:-4173\}/, 'Start-Script muss an Railway PORT und 0.0.0.0 binden.');
assert.equal(railwayJson.build?.builder, 'NIXPACKS', 'Railway soll den Nixpacks-Builder verwenden.');
assert.equal(railwayJson.build?.buildCommand, 'npm ci && npm run build', 'Railway-Build muss npm ci und Build kombinieren.');
assert.equal(railwayJson.deploy?.startCommand, 'npm run start', 'Railway-Start muss das npm start Script verwenden.');
assert.equal(railwayJson.deploy?.healthcheckPath, '/', 'Railway Healthcheck muss die SPA-Root prüfen.');
assert.equal(railwayJson.deploy?.restartPolicyType, 'ON_FAILURE', 'Railway soll bei Fehlern neu starten.');
assert.match(html, /<html lang="de">/, 'Frontend muss deutsche Sprache für korrekte Darstellung/SEO setzen.');
assert.match(html, /AKP Architekten Kauschke \+ Partner/, 'HTML-Titel muss deployfertig sein.');

console.log('Railway-Konfiguration erfolgreich validiert.');
