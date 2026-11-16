const fs = require('node:fs/promises');
const path = require('node:path');
const postcss = require('postcss');
const tailwind = require('@tailwindcss/postcss');
async function main() {
  const root = path.resolve(__dirname, '../components');
  let count = 0;
  for (const item of await fs.readdir(root, { withFileTypes: true })) {
    if (!item.isDirectory()) continue;
    const file = path.join(root, item.name, 'styles.css');
    const result = await postcss([tailwind()]).process(await fs.readFile(file, 'utf8'), { from: file });
    if (/@apply\b|@reference\b/.test(result.css)) throw new Error(item.name + ': unresolved Tailwind directives');
    count++;
  }
  console.log('Compiled styles for ' + count + ' components.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
