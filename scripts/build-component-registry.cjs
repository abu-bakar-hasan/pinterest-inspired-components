const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const sharp = require('sharp');

// The same generator runs in the source library and the portfolio checkout.
async function main() {
  const cwd = process.cwd();
  const library = await fs.access(path.join(cwd, 'components/membership-dashboard')).then(() => true, () => false);
  const source = path.join(cwd, library ? 'components' : 'app/(main)/components/_items');
  const output = path.join(cwd, library ? 'registry' : 'public/r');
  const pkg = JSON.parse(await fs.readFile(path.join(cwd, 'package.json'), 'utf8'));
  await fs.mkdir(output, { recursive: true });
  const items = [];
  for (const entry of (await fs.readdir(source, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const dir = path.join(source, slug);
    const metadataSource = await fs.readFile(path.join(dir, 'content.ts'), 'utf8');
    const context = { exports: {} };
    vm.runInNewContext(ts.transpileModule(metadataSource, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, context);
    const metadata = Object.values(context.exports)[0];
    const files = [];
    const dependencies = new Set();
    const assetNames = await fs.readdir(path.join(dir, 'assets')).catch(() => []);
    function add(name, content) {
      files.push({ path: `components/${slug}/${name}`, type: 'registry:file', target: `@components/${slug}/${name}`, content });
    }
    for (const name of (await fs.readdir(dir)).sort()) {
      if (!/\.(tsx?|css)$/.test(name)) continue;
      let content = await fs.readFile(path.join(dir, name), 'utf8');
      // Registry payloads are text. Preserve image bytes in typed local modules,
      // rather than writing binary images as UTF-8 or relying on a remote CDN.
      for (const asset of assetNames) content = content.replaceAll(`./assets/${asset}`, `./assets/${asset}.asset`);
      for (const match of content.matchAll(/(?:from\s*|import\s*)['"]([^.'"][^'"]*)['"]/g)) {
        const specifier = match[1];
        const dep = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0];
        if (['react', 'react-dom', 'next'].includes(dep)) continue;
        if (pkg.dependencies[dep]) dependencies.add(`${dep}@${pkg.dependencies[dep]}`);
      }
      add(name, content);
    }
    for (const asset of assetNames.sort()) {
      const bytes = await fs.readFile(path.join(dir, 'assets', asset));
      const { width, height, format } = await sharp(bytes).metadata();
      if (!width || !height || !format) throw new Error(`Cannot identify ${slug}/${asset}`);
      const mime = format === 'jpg' ? 'jpeg' : format;
      add(`assets/${asset}.asset.ts`, `// Original AI-generated image by Abu Bakar Hasan. See ASSET_CREDITS.md.\nconst image = ${JSON.stringify({ src: `data:image/${mime};base64,${bytes.toString('base64')}`, width, height })};\nexport default image;\n`);
    }
    const exportName = slug.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
    add('INSTALL.md', `# ${metadata.name}\n\nRequires Next.js App Router, React 19, TypeScript, and configured Tailwind CSS 4 with its base reset.\n\nImport the default export from this folder's index.tsx and render <${exportName} />. The entry point imports all styles and fonts and owns the feedback provider.\n\nThe assets/*.asset.ts modules contain the original image bytes, dimensions, and data URLs so installation is self-contained. Original WebP files remain in the GitHub source folder.\n\nData and interactions are local demonstrations.\n${metadata.designer ? `\nDesign inspiration: ${metadata.designer.name} (${metadata.designer.url}). Implementation: Abu Bakar Hasan.\n` : ''}`);
    if (library) {
      add('LICENSE', await fs.readFile(path.join(cwd, 'LICENSE'), 'utf8'));
      add('ASSET_CREDITS.md', await fs.readFile(path.join(cwd, 'ASSET_CREDITS.md'), 'utf8'));
    }
    const item = {
      $schema: 'https://ui.shadcn.com/schema/registry-item.json',
      name: slug, type: 'registry:block', title: metadata.name, description: metadata.description,
      author: 'Abu Bakar Hasan', dependencies: [...dependencies].sort(), files,
      docs: `Installed ${metadata.name}. Requires Next.js App Router and Tailwind CSS 4. Import the default export from your components/${slug} folder. See INSTALL.md in that folder.`,
      meta: { ...(metadata.designer ? { designer: metadata.designer } : {}), framework: 'Next.js App Router', react: '19', tailwind: '4' },
    };
    await fs.writeFile(path.join(output, `${slug}.json`), JSON.stringify(item, null, 2) + '\n');
    items.push({ ...item, files: files.map(({ content, ...file }) => file) });
  }
  await fs.writeFile(path.join(output, 'registry.json'), JSON.stringify({ $schema: 'https://ui.shadcn.com/schema/registry.json', name: 'pinterest-inspired-components', homepage: 'https://abubakarhasan.com/components', items }, null, 2) + '\n');
  console.log(`Built ${items.length} complete registry items in ${output}`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
