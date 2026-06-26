import express from 'express';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, 'dist');

if (!existsSync(dist)) {
  console.error('ERROR: dist/ folder not found. Run "npm run build" first.');
  process.exit(1);
}

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(dist));

app.get('*', (_req, res) => {
  res.sendFile(join(dist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
