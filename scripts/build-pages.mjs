#!/usr/bin/env node
/**
 * Production build for GitHub Pages: copies static assets, bundles + minifies CSS,
 * minifies JS and HTML (including blog + fragments).
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import cssnano from 'cssnano';
import { minify as htmlMinify } from 'html-minifier-terser';
import { minify as terserMinify } from 'terser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const SKIP_DIR = new Set([
  'dist',
  'node_modules',
  '.git',
  'docs',
  '.claude',
]);

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function rmrf(p) {
  if (await exists(p)) await fs.rm(p, { recursive: true });
}

async function mkdirp(p) {
  await fs.mkdir(p, { recursive: true });
}

async function copyDir(src, dest) {
  await mkdirp(dest);
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    if (e.name === '.DS_Store') continue;
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

async function* walkHtml(dir) {
  const base = path.basename(dir);
  if (SKIP_DIR.has(base)) return;
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIR.has(e.name)) continue;
      yield* walkHtml(p);
    } else if (e.name.endsWith('.html')) {
      yield p;
    }
  }
}

const htmlOpts = {
  collapseWhitespace: true,
  conservativeCollapse: true,
  keepClosingSlash: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: false,
  minifyJS: false,
};

/** GitHub project Pages live under /repo-name/; root-absolute URLs must include that segment. */
function normalizeSiteBasePath(raw) {
  if (raw === undefined || raw === null) return '';
  const s = String(raw).trim();
  if (s === '' || s === '/') return '';
  const withSlash = s.startsWith('/') ? s : `/${s}`;
  return withSlash.replace(/\/+$/, '');
}

function applySiteBaseToHtml(html, basePath) {
  if (!basePath) return html;
  const prefix = `${basePath}/`;
  return html
    .replace(/href="\//g, `href="${prefix}`)
    .replace(/src="\//g, `src="${prefix}`);
}

function applySiteBaseToCss(css, basePath) {
  if (!basePath) return css;
  return css.replace(/url\(\s*\//g, `url(${basePath}/`);
}

async function main() {
  const siteBasePath = normalizeSiteBasePath(process.env.SITE_BASE_PATH);
  if (siteBasePath) {
    console.log('Applying SITE_BASE_PATH for GitHub project Pages:', siteBasePath);
  }

  await rmrf(DIST);
  await mkdirp(path.join(DIST, 'css'));
  await mkdirp(path.join(DIST, 'js'));

  await copyDir(path.join(ROOT, 'images'), path.join(DIST, 'images'));
  await copyDir(path.join(ROOT, 'fonts'), path.join(DIST, 'fonts'));
  await fs.copyFile(path.join(ROOT, 'favicon.svg'), path.join(DIST, 'favicon.svg'));

  const cssEntry = path.join(ROOT, 'css', 'styles.css');
  const cssIn = await fs.readFile(cssEntry, 'utf8');
  const cssResult = await postcss([postcssImport(), cssnano()])
    .process(cssIn, { from: cssEntry, to: path.join(DIST, 'css', 'styles.css') });
  const cssOut = applySiteBaseToCss(cssResult.css, siteBasePath);
  await fs.writeFile(path.join(DIST, 'css', 'styles.css'), cssOut);

  const jsIn = await fs.readFile(path.join(ROOT, 'js', 'site.js'), 'utf8');
  const jsOut = await terserMinify(jsIn, {
    compress: true,
    mangle: true,
    format: { comments: false },
  });
  if (jsOut.error) throw jsOut.error;
  await fs.writeFile(path.join(DIST, 'js', 'site.js'), jsOut.code);

  for await (const abs of walkHtml(ROOT)) {
    const rel = path.relative(ROOT, abs);
    const raw = await fs.readFile(abs, 'utf8');
    let min = await htmlMinify(raw, htmlOpts);
    min = applySiteBaseToHtml(min, siteBasePath);
    const out = path.join(DIST, rel);
    await mkdirp(path.dirname(out));
    await fs.writeFile(out, min);
  }

  console.log('Built minified site to', DIST);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
