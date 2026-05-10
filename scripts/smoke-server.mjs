import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';

const port = 4179;
const child = spawn(process.execPath, ['server/index.mjs'], {
  detached: true,
  env: {...process.env, PORT: String(port)},
  stdio: ['ignore', 'pipe', 'pipe'],
});

let output = '';
child.stdout.on('data', (chunk) => {
  output += chunk.toString();
});
child.stderr.on('data', (chunk) => {
  output += chunk.toString();
});

async function waitForServer() {
  const deadline = Date.now() + 10000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/healthz`);
      if (response.ok) return;
    } catch {
      // Retry until the server is ready or the deadline is reached.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Server did not become ready. Output:\n${output}`);
}

function stopServer() {
  try {
    process.kill(-child.pid, 'SIGTERM');
  } catch {
    child.kill('SIGTERM');
  }
}

try {
  await waitForServer();

  const health = await fetch(`http://127.0.0.1:${port}/healthz`);
  assert.equal(health.status, 200, 'Health endpoint must return HTTP 200.');
  assert.deepEqual(await health.json(), {status: 'ok'}, 'Health endpoint must return the expected JSON payload.');

  const home = await fetch(`http://127.0.0.1:${port}/`);
  const html = await home.text();
  assert.equal(home.status, 200, 'Home route must return HTTP 200.');
  assert.match(html, /<div id="root"><\/div>/, 'Home route must serve the SPA HTML shell.');

  const deepLink = await fetch(`http://127.0.0.1:${port}/projekte/pestalozzistrasse`);
  assert.equal(deepLink.status, 200, 'Deep links must fall back to the SPA HTML shell.');
  assert.match(await deepLink.text(), /AKP Architekten Kauschke \+ Partner/, 'Deep link fallback must serve the AKP app.');
} finally {
  stopServer();
  await new Promise((resolve) => child.once('exit', resolve));
}
