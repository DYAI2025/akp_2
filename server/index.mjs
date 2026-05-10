import 'dotenv/config';
import express from 'express';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(distDir, 'index.html');

const app = express();
const parsedPort = Number.parseInt(process.env.PORT ?? '3000', 10);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : 3000;

app.disable('x-powered-by');

app.get('/healthz', (_request, response) => {
  response.set('Cache-Control', 'no-store');
  response.status(200).json({status: 'ok'});
});

app.use(
  express.static(distDir, {
    index: false,
    setHeaders(response, filePath) {
      if (filePath === indexFile) {
        response.setHeader('Cache-Control', 'no-store');
        return;
      }

      response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    },
  }),
);

app.get('*', (_request, response, next) => {
  if (!existsSync(indexFile)) {
    response.status(503).send('Frontend build is missing. Run `npm run build` before starting the production server.');
    return;
  }

  response.set('Cache-Control', 'no-store');
  response.sendFile(indexFile, (error) => {
    if (error) next(error);
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`AKP frontend server listening on port ${port}`);
});
