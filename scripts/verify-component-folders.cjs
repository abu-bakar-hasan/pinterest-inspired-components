const fs = require('node:fs');
const path = require('node:path');
const postcss = require('postcss');
const root = path.resolve(__dirname, '../components');
const folders = fs.readdirSync(root).filter(name => fs.statSync(path.join(root, name)).isDirectory());
let imports = 0;
for (const folder of folders) {
  const dir = path.join(root, folder);
  for (const required of ['index.tsx', 'Preview.tsx', 'styles.css', 'PreviewToast.tsx', 'content.ts', 'README.md']) {
    if (!fs.existsSync(path.join(dir, required))) throw new Error(`${folder}: missing ${required}`);
  }
  const styles = postcss.parse(fs.readFileSync(path.join(dir, 'styles.css'), 'utf8'));
  const selectors = styles.toString();
  for (const file of fs.readdirSync(dir).filter(file => file.endsWith('.tsx'))) {
    const source = fs.readFileSync(path.join(dir, file), 'utf8');
    for (const match of source.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)) {
      const specifier = match[1];
      if (specifier.startsWith('@/')) throw new Error(`${folder}/${file}: portfolio alias ${specifier}`);
      if (!specifier.startsWith('.')) continue;
      imports++;
      const target = path.resolve(dir, specifier);
      if (!target.startsWith(dir + path.sep)) throw new Error(`${folder}/${file}: escaped folder ${specifier}`);
      if (!['', '.tsx', '.ts', '/index.tsx'].some(suffix => fs.existsSync(target + suffix))) throw new Error(`${folder}/${file}: missing ${specifier}`);
    }
    for (const match of source.matchAll(/\bsc-[a-z][a-z0-9-]+/g)) {
      if (!['sc-flight-demo', 'sc-landscape-demo'].includes(match[0]) && !selectors.includes('.' + match[0])) throw new Error(`${folder}/${file}: missing style ${match[0]}`);
    }
  }
}
console.log(`Verified ${folders.length} component folders, ${imports} local imports, and CSS class coverage.`);
