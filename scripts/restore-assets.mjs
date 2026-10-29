import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
const source = new URL('../assets-source/', import.meta.url);
const target = new URL('../public/assets/', import.meta.url);
await mkdir(target, { recursive: true });
for (const name of await readdir(source)) {
  if (!name.endsWith('.b64')) continue;
  await writeFile(new URL(name.slice(0, -4), target), Buffer.from(await readFile(new URL(name, source), 'utf8'), 'base64'));
}
