import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '..', 'dist');
const indexFile = path.join(distDir, 'index.html');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.disable('x-powered-by');

app.get('/healthz', (_request, response) => {
  response.status(200).json({status: 'ok'});
});

app.use(
  express.static(distDir, {
    index: false,
    maxAge: '1y',
    immutable: true,
  }),
);

app.get('*', (_request, response) => {
  response.sendFile(indexFile);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`AKP frontend server listening on port ${port}`);
});
