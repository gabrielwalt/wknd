import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * For a given page, find and extract the missing sections from old HTML
 * Useful for understanding what content needs to be added to JSON
 */
function extractMissingSectionDetails(pageName, missingMarkers) {
  const oldPath = path.join(projectRoot, 'html-reference', `${pageName}.html`);

  if (!fs.existsSync(oldPath)) return null;

  const html = fs.readFileSync(oldPath, 'utf-8');
  const details = [];

  missingMarkers.forEach(marker => {
    // Find the h2 heading in the HTML
    const headingRegex = new RegExp(`<h2[^>]*>${marker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h2>`, 'i');
    const headingMatch = headingRegex.exec(html);

    if (headingMatch) {
      const startIdx = headingMatch.index;
      // Extract next 500 characters of context after the heading
      const contextEnd = Math.min(startIdx + 800, html.length);
      const context = html.substring(startIdx, contextEnd);

      details.push({
        heading: marker,
        context: context.substring(0, 400).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(),
      });
    }
  });

  return details;
}

// Pages with issues
const pagesToFix = [
  'community',
  'destinations',
  'expeditions',
  'field-notes',
  'gear',
];

console.log('\n📝 MISSING SECTION DETAILS\n');
console.log('='.repeat(80));

pagesToFix.forEach(pageName => {
  console.log(`\n🔍 ${pageName.toUpperCase()}`);
  console.log('-'.repeat(80));

  const newPath = path.join(projectRoot, `${pageName}.html`);
  if (!fs.existsSync(newPath)) return;

  const newHtml = fs.readFileSync(newPath, 'utf-8');
  const oldPath = path.join(projectRoot, 'html-reference', `${pageName}.html`);
  const oldHtml = fs.readFileSync(oldPath, 'utf-8');

  // Extract h2 from old
  const oldH2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
  const oldMarkers = [];
  let match;
  while ((match = oldH2Regex.exec(oldHtml)) !== null) {
    oldMarkers.push(match[1].trim());
  }

  // Extract h2 from new
  const newH2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
  const newMarkers = [];
  while ((match = newH2Regex.exec(newHtml)) !== null) {
    newMarkers.push(match[1].trim());
  }

  const missing = oldMarkers.filter(t => !newMarkers.includes(t));

  if (missing.length === 0) {
    console.log('✅ No missing sections');
    return;
  }

  missing.forEach(marker => {
    console.log(`\n❌ "${marker}"`);

    // Find and extract context from old HTML
    const idx = oldHtml.indexOf(`<h2`);
    if (idx > 0) {
      const section = oldHtml.substring(idx, idx + 600);
      const snippet = section.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().substring(0, 250);
      console.log(`   Context: ${snippet}...`);
    }
  });
});

console.log('\n' + '='.repeat(80) + '\n');
