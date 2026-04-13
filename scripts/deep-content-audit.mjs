import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

/**
 * Deep structural analysis of HTML page content
 * Extracts: sections, headings, buttons, styling, element counts, order
 */
function analyzePageStructure(html, pageName) {
  const sections = [];

  // Find all <section> elements
  const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>[\s\S]*?<\/section>/gi;
  let match;
  let sectionIndex = 0;

  while ((match = sectionRegex.exec(html)) !== null) {
    const sectionHtml = match[0];
    const sectionClass = match[1];
    sectionIndex++;

    // Extract all h2 headings in this section
    const h2Regex = /<h2[^>]*>([^<]+)<\/h2>/gi;
    const headings = [];
    let h2Match;
    while ((h2Match = h2Regex.exec(sectionHtml)) !== null) {
      headings.push(h2Match[1].trim());
    }

    // Extract all buttons/CTAs in this section
    const buttonRegex = /<(?:a|button)[^>]*class="[^"]*(?:button|cta)[^"]*"[^>]*>[\s\S]*?<\/(?:a|button)>/gi;
    const buttons = [];
    let btnMatch;
    while ((btnMatch = buttonRegex.exec(sectionHtml)) !== null) {
      const btnText = btnMatch[0].replace(/<[^>]*>/g, '').trim();
      if (btnText.length > 0 && btnText.length < 100) {
        buttons.push(btnText);
      }
    }

    // Extract background styling
    const bgColor = sectionClass.includes('inverse') ? 'dark' :
                    sectionClass.includes('accent') ? 'orange' :
                    sectionClass.includes('secondary') ? 'beige' : 'white';

    // Count major elements
    const articleCount = (sectionHtml.match(/class="[^"]*article[^"]*"/gi) || []).length;
    const cardCount = (sectionHtml.match(/class="[^"]*card[^"]*"/gi) || []).length;
    const gridItemCount = (sectionHtml.match(/class="[^"]*editorial-index-item[^"]*"/gi) || []).length;
    const imageCount = (sectionHtml.match(/<img[^>]*>/gi) || []).length;

    sections.push({
      index: sectionIndex,
      classes: sectionClass,
      backgroundColor: bgColor,
      headings,
      buttons,
      articleCount,
      cardCount,
      gridItemCount,
      imageCount,
      contentLength: sectionHtml.length,
    });
  }

  return {
    pageName,
    totalSections: sections.length,
    sections,
  };
}

/**
 * Deep comparison of two page structures
 */
function deepCompare(oldAnalysis, newAnalysis) {
  const issues = [];

  // Check section count mismatch
  if (oldAnalysis.totalSections !== newAnalysis.totalSections) {
    issues.push({
      type: 'SECTION_COUNT_MISMATCH',
      severity: 'HIGH',
      message: `Section count mismatch: old=${oldAnalysis.totalSections}, new=${newAnalysis.totalSections}`,
    });
  }

  // Detailed section-by-section comparison
  const maxSections = Math.max(oldAnalysis.totalSections, newAnalysis.totalSections);

  for (let i = 0; i < maxSections; i++) {
    const oldSection = oldAnalysis.sections[i];
    const newSection = newAnalysis.sections[i];

    if (!oldSection && newSection) {
      issues.push({
        type: 'EXTRA_SECTION',
        severity: 'MEDIUM',
        position: i + 1,
        message: `Extra section at position ${i + 1}: ${newSection.headings.join(' / ')}`,
      });
      continue;
    }

    if (oldSection && !newSection) {
      issues.push({
        type: 'MISSING_SECTION',
        severity: 'HIGH',
        position: i + 1,
        headings: oldSection.headings,
        message: `Missing section at position ${i + 1}: ${oldSection.headings.join(' / ')}`,
      });
      continue;
    }

    // Compare headings
    if (JSON.stringify(oldSection.headings) !== JSON.stringify(newSection.headings)) {
      issues.push({
        type: 'HEADING_MISMATCH',
        severity: 'HIGH',
        position: i + 1,
        oldHeadings: oldSection.headings,
        newHeadings: newSection.headings,
        message: `Section ${i + 1} headings differ: old="${oldSection.headings.join('|')}" vs new="${newSection.headings.join('|')}"`,
      });
    }

    // Compare background color
    if (oldSection.backgroundColor !== newSection.backgroundColor) {
      issues.push({
        type: 'BACKGROUND_COLOR_MISMATCH',
        severity: 'MEDIUM',
        position: i + 1,
        oldColor: oldSection.backgroundColor,
        newColor: newSection.backgroundColor,
        message: `Section ${i + 1} (${oldSection.headings[0] || 'unnamed'}) background: old="${oldSection.backgroundColor}" vs new="${newSection.backgroundColor}"`,
      });
    }

    // Compare buttons
    if (JSON.stringify(oldSection.buttons) !== JSON.stringify(newSection.buttons)) {
      issues.push({
        type: 'BUTTONS_MISMATCH',
        severity: 'MEDIUM',
        position: i + 1,
        oldButtons: oldSection.buttons,
        newButtons: newSection.buttons,
        message: `Section ${i + 1} (${oldSection.headings[0] || 'unnamed'}) buttons: old=[${oldSection.buttons.join(', ')}] vs new=[${newSection.buttons.join(', ')}]`,
      });
    }

    // Compare element counts
    const oldCounts = `art=${oldSection.articleCount},card=${oldSection.cardCount},grid=${oldSection.gridItemCount},img=${oldSection.imageCount}`;
    const newCounts = `art=${newSection.articleCount},card=${newSection.cardCount},grid=${newSection.gridItemCount},img=${newSection.imageCount}`;

    if (oldCounts !== newCounts) {
      issues.push({
        type: 'ELEMENT_COUNT_MISMATCH',
        severity: 'MEDIUM',
        position: i + 1,
        oldCounts: oldSection,
        newCounts: newSection,
        message: `Section ${i + 1} (${oldSection.headings[0] || 'unnamed'}) element counts differ`,
      });
    }
  }

  return issues;
}

/**
 * Main audit routine
 */
function auditAllPages() {
  const pages = [
    'index', 'about', 'adventures', 'community', 'destinations',
    'expeditions', 'faq', 'field-notes', 'gear', 'sustainability'
  ];

  const blogPages = fs.readdirSync(path.join(projectRoot, 'html-reference', 'blog'))
    .filter(f => f.endsWith('.html'))
    .map(f => f.replace('.html', ''))
    .map(f => `blog/${f}`);

  const allPages = [...pages, ...blogPages];

  console.log('\n🔬 DEEP CONTENT AUDIT - Full Structure Comparison\n');
  console.log('='.repeat(100));

  const allIssues = {};
  let totalHighSeverity = 0;
  let totalMediumSeverity = 0;

  allPages.forEach(pageName => {
    const oldPath = path.join(projectRoot, 'html-reference', `${pageName}.html`);
    const newPath = path.join(projectRoot, `${pageName}.html`);

    if (!fs.existsSync(oldPath) || !fs.existsSync(newPath)) {
      console.log(`⚠️  ${pageName}: File missing (skipped)`);
      return;
    }

    const oldHtml = fs.readFileSync(oldPath, 'utf-8');
    const newHtml = fs.readFileSync(newPath, 'utf-8');

    const oldAnalysis = analyzePageStructure(oldHtml, pageName);
    const newAnalysis = analyzePageStructure(newHtml, pageName);

    const issues = deepCompare(oldAnalysis, newAnalysis);

    if (issues.length === 0) {
      console.log(`✅ ${pageName}`);
    } else {
      console.log(`\n❌ ${pageName}`);
      console.log(`   ${issues.length} issue(s) found:`);

      issues.forEach(issue => {
        const icon = issue.severity === 'HIGH' ? '🔴' : '🟡';
        console.log(`   ${icon} [${issue.type}] ${issue.message}`);
      });

      allIssues[pageName] = issues;
      totalHighSeverity += issues.filter(i => i.severity === 'HIGH').length;
      totalMediumSeverity += issues.filter(i => i.severity === 'MEDIUM').length;
    }
  });

  console.log('\n' + '='.repeat(100));
  console.log(`\n📊 SUMMARY`);
  console.log(`   Pages with issues: ${Object.keys(allIssues).length}`);
  console.log(`   High severity: ${totalHighSeverity}`);
  console.log(`   Medium severity: ${totalMediumSeverity}`);

  if (Object.keys(allIssues).length > 0) {
    console.log(`\n📋 PAGES TO FIX:`);
    Object.keys(allIssues).forEach(page => {
      const pageIssues = allIssues[page];
      const high = pageIssues.filter(i => i.severity === 'HIGH').length;
      const med = pageIssues.filter(i => i.severity === 'MEDIUM').length;
      console.log(`   ${page}: ${high}H ${med}M`);
    });
  }

  console.log('\n');
  process.exit(Object.keys(allIssues).length > 0 ? 1 : 0);
}

auditAllPages();
