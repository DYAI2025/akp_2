import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';

const port = String(4173 + Math.floor(Math.random() * 1000));
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn('npm', ['run', 'start'], {
  env: {...process.env, PORT: port},
  stdio: ['ignore', 'pipe', 'pipe'],
  detached: true,
});

let output = '';
server.stdout.on('data', (chunk) => {
  output += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  output += chunk.toString();
});

try {
  let response;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      response = await fetch(baseUrl);
      if (response.ok) break;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  assert(response?.ok, `Preview-Server antwortet nicht erfolgreich. Ausgabe: ${output}`);
  const html = await response.text();
  assert.match(html, /<div id="root"><\/div>/, 'Preview muss das SPA-Root ausliefern.');

  const assetMatches = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
  assert(assetMatches.length >= 2, 'Gebautes HTML muss JS/CSS-Assets referenzieren.');

  for (const assetPath of assetMatches) {
    const assetResponse = await fetch(`${baseUrl}${assetPath}`);
    assert.equal(assetResponse.status, 200, `Asset ${assetPath} muss auslieferbar sein.`);
  }

  console.log(`Preview-Smoke-Test erfolgreich auf ${baseUrl}.`);
} finally {
  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
}
