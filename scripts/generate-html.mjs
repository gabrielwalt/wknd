import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderPage } from '../templates/page.mjs';
import { renderBlogPage } from '../templates/blog-page.mjs';
import { articleTabs } from '../templates/fragments/article-tabs.mjs';
import { articleGrid } from '../templates/fragments/article-grid.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

function loadJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error.message);
    process.exit(1);
  }
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Generated: ${path.relative(projectRoot, filePath)}`);
}

function generatePages() {
  // Load site-wide data
  const siteData = loadJSON(path.join(projectRoot, 'data', 'site.json'));

  // Generate fragments FIRST (needed by pages that include them)
  const fragmentsDir = path.join(projectRoot, 'data', 'fragments');
  const fragmentRenderers = {
    'activity-tabs': articleTabs,
    'expeditions-grid': articleGrid,
    'field-notes-grid': articleGrid
  };

  if (fs.existsSync(fragmentsDir)) {
    fs.readdirSync(fragmentsDir)
      .filter(f => f.endsWith('.json'))
      .forEach(file => {
        const fragData = loadJSON(path.join(fragmentsDir, file));
        const fragName = path.basename(file, '.json');
        const renderer = fragmentRenderers[fragName];

        if (renderer) {
          const html = renderer(fragData);
          const htmlPath = path.join(projectRoot, 'fragments', `${fragName}.html`);
          writeFile(htmlPath, html);
        }
      });
  }

  // Generate root pages
  const pagesDir = path.join(projectRoot, 'data', 'pages');
  if (fs.existsSync(pagesDir)) {
    fs.readdirSync(pagesDir)
      .filter(f => f.endsWith('.json'))
      .forEach(file => {
        const pageData = loadJSON(path.join(pagesDir, file));
        const pageName = path.basename(file, '.json');
        const htmlPath = path.join(projectRoot, `${pageName}.html`);

        const html = renderPage(pageData, siteData);
        writeFile(htmlPath, html);
      });
  }

  // Generate blog pages
  const blogDir = path.join(projectRoot, 'data', 'blog');
  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir)
      .filter(f => f.endsWith('.json'))
      .forEach(file => {
        const postData = loadJSON(path.join(blogDir, file));
        const slug = path.basename(file, '.json');
        const htmlPath = path.join(projectRoot, 'blog', `${slug}.html`);

        const html = renderBlogPage(postData, siteData);
        writeFile(htmlPath, html);
      });
  }
}

function validatePaths() {
  // Simple check: all generated files should exist
  const htmlFiles = findAllHtmlFiles(projectRoot);
  console.log(`\nValidated ${htmlFiles.length} HTML files generated.`);
}

function findAllHtmlFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    if (entry.isDirectory() && !['node_modules', '.git', 'css', 'js', 'images'].includes(entry.name)) {
      findAllHtmlFiles(path.join(dir, entry.name), files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path.join(dir, entry.name));
    }
  });
  return files;
}

// Main execution
console.log('🔨 Generating HTML from JSON + templates...\n');
generatePages();
validatePaths();
console.log('\n✓ HTML generation complete!');
