import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Extract content markers from HTML by finding all headings
 * Uses regex to extract h1-h4 text content
 */
function extractContentMarkers(html) {
  const markers = new Set();

  // Extract h2 headings (primary section markers)
  const h2Regex = /<h2[^>]*>([^<]*)<\/h2>/gi;
  let match;

  while ((match = h2Regex.exec(html)) !== null) {
    let text = match[1].trim();
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');

    if (text.length > 0 && text.length < 300) {
      markers.add(text);
    }
  }

  // Extract aria-labels (accessibility labels often mark sections)
  const ariaRegex = /aria-label="([^"]+)"/g;
  while ((match = ariaRegex.exec(html)) !== null) {
    markers.add(match[1]);
  }

  return Array.from(markers);
}

/**
 * Compare two HTML files and report differences
 * Returns: {oldMarkers, newMarkers, missing, extra, differences}
 */
function comparePages(oldHtml, newHtml, pageName) {
  const oldMarkers = extractContentMarkers(oldHtml);
  const newMarkers = extractContentMarkers(newHtml);

  const missing = oldMarkers.filter(t => !newMarkers.includes(t));
  const extra = newMarkers.filter(t => !oldMarkers.includes(t));

  // Check for duplicates in new HTML (corruption indicator)
  const newDuplicates = newMarkers.filter((t, i) => newMarkers.indexOf(t) !== i);
  const oldDuplicates = oldMarkers.filter((t, i) => oldMarkers.indexOf(t) !== i);
  const newDupCorruptions = newDuplicates.filter(t => !oldDuplicates.includes(t));

  return {
    pageName,
    missing: missing.length > 0 ? missing : null,
    extra: extra.length > 0 ? extra : null,
    newDuplicates: newDupCorruptions.length > 0 ? newDupCorruptions : null,
    oldMarkersCount: oldMarkers.length,
    newMarkersCount: newMarkers.length,
  };
}

/**
 * Main comparison routine
 */
function compareAllPages() {
  const pages = [
    'index', 'about', 'adventures', 'community', 'destinations',
    'expeditions', 'faq', 'field-notes', 'gear', 'sustainability'
  ];

  const blogPages = fs.readdirSync(path.join(projectRoot, 'html-reference', 'blog'))
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''))
    .map(f => `blog/${f}`);

  const allPages = [...pages, ...blogPages];

  console.log('\n📋 CONTENT CORRUPTION ANALYSIS\n');
  console.log('='.repeat(80));

  const issuesByPage = {};

  allPages.forEach(pageName => {
    const oldPath = path.join(projectRoot, 'html-reference', `${pageName}.html`);
    const newPath = path.join(projectRoot, `${pageName}.html`);

    if (!fs.existsSync(oldPath) || !fs.existsSync(newPath)) {
      console.log(`⚠️  ${pageName}: File missing (skipped)`);
      return;
    }

    const oldHtml = fs.readFileSync(oldPath, 'utf-8');
    const newHtml = fs.readFileSync(newPath, 'utf-8');

    const comparison = comparePages(oldHtml, newHtml, pageName);

    if (comparison.missing || comparison.extra || comparison.newDuplicates) {
      issuesByPage[pageName] = comparison;

      console.log(`\n❌ ${pageName}`);
      console.log(`   Old markers: ${comparison.oldMarkersCount} | New markers: ${comparison.newMarkersCount}`);

      if (comparison.missing && comparison.missing.length > 0) {
        console.log(`   🔴 MISSING CONTENT (${comparison.missing.length}):`);
        comparison.missing.forEach(m => console.log(`      • "${m}"`));
      }

      if (comparison.extra && comparison.extra.length > 0) {
        console.log(`   🟡 EXTRA/UNEXPECTED CONTENT (${comparison.extra.length}):`);
        comparison.extra.forEach(m => console.log(`      • "${m}"`));
      }

      if (comparison.newDuplicates && comparison.newDuplicates.length > 0) {
        console.log(`   🔴 DUPLICATED SECTIONS (corruption sign):`);
        comparison.newDuplicates.forEach(m => console.log(`      • "${m}"`));
      }
    } else {
      console.log(`✅ ${pageName}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  const issueCount = Object.keys(issuesByPage).length;
  console.log(`\n📊 Summary: ${issueCount} pages with content issues`);
  console.log(`\nPages to fix: ${issueCount > 0 ? Object.keys(issuesByPage).join(', ') : 'None'}\n`);

  return issuesByPage;
}

const issues = compareAllPages();

if (Object.keys(issues).length === 0) {
  console.log('✨ All pages match! No content corruptions detected.');
  process.exit(0);
} else {
  console.log('\n⚡ RUN FIX SCRIPT: npm run fix:corruptions');
  process.exit(1);
}
