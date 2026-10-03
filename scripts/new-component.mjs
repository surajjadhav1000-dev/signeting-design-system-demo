#!/usr/bin/env node
// Usage: npm run new-component -- <Name>
// Copies templates/component into src/components/<Name>, filling in the name.
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const name = process.argv[2];

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error('Usage: npm run new-component -- <PascalCaseName>');
  process.exit(1);
}

const camel = name[0].toLowerCase() + name.slice(1);
const kebab = `sg-${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
const target = join(root, 'src/components', name);

if (existsSync(target)) {
  console.error(`src/components/${name} already exists.`);
  process.exit(1);
}

const fill = (text) =>
  text.replaceAll('__Name__', name).replaceAll('__camel__', camel).replaceAll('__kebab__', kebab);

const source = join(root, 'templates/component');
mkdirSync(target, { recursive: true });
for (const file of readdirSync(source)) {
  const out = join(target, fill(file).replace(/\.tpl$/, ''));
  writeFileSync(out, fill(readFileSync(join(source, file), 'utf8')));
  console.log(`created ${out.replace(root + '/', '')}`);
}
