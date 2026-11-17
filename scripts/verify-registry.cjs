const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const slugs = fs.readdirSync(path.join(root, 'components'));
let images = 0;
for (const slug of slugs) {
  const item = JSON.parse(fs.readFileSync(path.join(root, 'registry', slug + '.json'), 'utf8'));
  assert.equal(item.name, slug);
  const files = new Map(item.files.map(file => [file.path.replace(`components/${slug}/`, ''), file]));
  assert.equal(files.size, item.files.length, 'Duplicate file paths');
  for (const file of item.files) {
    assert.ok(file.target.startsWith(`@components/${slug}/`) && !file.target.includes('..'));
    assert.equal(typeof file.content, 'string');
  }
  const directory = path.join(root, 'components', slug);
  for (const name of fs.readdirSync(directory).filter(name => /\.(tsx?|css)$/.test(name))) {
    let original = fs.readFileSync(path.join(directory, name), 'utf8').replace(/\r\n/g, '\n');
    original = original.replace(/(\.\/assets\/[^'"]+\.webp)(?=['"])/g, '$1.asset');
    assert.equal(files.get(name)?.content.replace(/\r\n/g, '\n'), original, `${slug}/${name} is stale`);
  }
  const assets = path.join(directory, 'assets');
  if (fs.existsSync(assets)) for (const name of fs.readdirSync(assets)) {
    const file = files.get(`assets/${name}.asset.ts`);
    assert.ok(file, `Missing image module ${name}`);
    const match = file.content.match(/const image = (\{.*\});/);
    assert.ok(match);
    const asset = JSON.parse(match[1]);
    assert.ok(asset.width > 0 && asset.height > 0);
    assert.ok(Buffer.from(asset.src.split(',')[1], 'base64').equals(fs.readFileSync(path.join(assets, name))), `Image changed: ${name}`);
    images++;
  }
  for (const name of ['index.tsx', 'Preview.tsx', 'PreviewToast.tsx', 'styles.css', 'INSTALL.md', 'LICENSE', 'ASSET_CREDITS.md']) assert.ok(files.has(name), `Missing ${slug}/${name}`);
}
console.log(`Verified ${slugs.length} complete registry payloads and ${images} byte-identical embedded images.`);
