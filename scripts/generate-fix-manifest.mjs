import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * For each page with HIGH severity issues, generate a manifest showing:
 * - What order sections should be in
 * - What background colors they need
 * - What buttons are missing
 */
function generateFixManifest() {
  const highSeverityPages = [
    'index',
    'adventures',
    'community',
    'destinations',
    'expeditions',
    'field-notes',
    'faq',
    'gear'
  ];

  const manifest = {};

  highSeverityPages.forEach(pageName => {
    const oldPath = path.join(projectRoot, 'html-reference', `${pageName}.html`);
    if (!fs.existsSync(oldPath)) return;

    const html = fs.readFileSync(oldPath, 'utf-8');
    const sections = [];

    // Extract sections with their structure
    const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>[\s\S]*?<\/section>/gi;
    let match;
    let index = 0;

    while ((match = sectionRegex.exec(html)) !== null) {
      const sectionHtml = match[0];
      const sectionClass = match[1];
      index++;

      // Extract headings
      const headings = [];
      const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
      let h2Match;
      while ((h2Match = h2Regex.exec(sectionHtml)) !== null) {
        headings.push(h2Match[1].trim());
      }

      // Extract button labels
      const buttons = [];
      const btnRegex = /<(?:a|button)[^>]*class="[^"]*(?:button|cta|text-button)[^"]*"[^>]*>[\s\S]*?<\/(?:a|button)>/gi;
      let btnMatch;
      while ((btnMatch = btnRegex.exec(sectionHtml)) !== null) {
        const btnText = btnMatch[0].replace(/<[^>]*>/g, '').trim();
        if (btnText.length > 0 && btnText.length < 100 && !buttons.includes(btnText)) {
          buttons.push(btnText);
        }
      }

      // Determine background color
      let bgColor = 'white';
      if (sectionClass.includes('inverse')) bgColor = 'dark';
      else if (sectionClass.includes('accent') && sectionClass.includes('section')) bgColor = 'orange';
      else if (sectionClass.includes('secondary')) bgColor = 'beige';

      sections.push({
        position: index,
        headings,
        buttons,
        backgroundColor: bgColor,
        classes: sectionClass,
      });
    }

    manifest[pageName] = sections;
  });

  return manifest;
}

const manifest = generateFixManifest();

// Output a markdown-style report
console.log('# CONTENT STRUCTURE FIX MANIFEST\n');
console.log('## Pages requiring structural fixes\n');

Object.entries(manifest).forEach(([pageName, sections]) => {
  console.log(`\n### ${pageName.toUpperCase()}\n`);
  console.log(`**Expected section order (position → heading → background → buttons):**\n`);

  sections.forEach(sec => {
    console.log(`${sec.position}. **${sec.headings.join(' / ')}**`);
    console.log(`   Background: \`${sec.backgroundColor}\``);
    if (sec.buttons.length > 0) {
      console.log(`   Buttons: ${sec.buttons.map(b => `\`${b}\``).join(', ')}`);
    }
    console.log();
  });
});

// Also save as JSON for processing
fs.writeFileSync(
  path.join(projectRoot, 'scripts', 'fix-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('\n✓ Manifest saved to scripts/fix-manifest.json');
