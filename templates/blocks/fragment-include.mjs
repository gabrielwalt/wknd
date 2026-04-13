import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderSectionHeading } from '../utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

/**
 * Renders a section with an embedded HTML fragment
 * @param {Object} data
 * @param {string} [data.sectionClass='section'] - Section CSS class
 * @param {string} [data.containerClass=''] - Additional container CSS class
 * @param {string} [data.heading] - Optional section heading
 * @param {Object} [data.headingLink] - Optional link next to heading (uses <span> for HTML validity)
 * @param {string} data.headingLink.href - Link URL
 * @param {string} data.headingLink.label - Link text
 * @param {string} data.fragmentSrc - Path to fragment HTML file (required, e.g., 'fragments/activity-tabs.html')
 * @returns {string} HTML: <section> with pre-rendered fragment embedded directly
 *
 * Fragment loading (Server-Side Generation):
 *   - Fragments are pre-rendered at build time from data/fragments/*.json
 *   - Fragment HTML is directly embedded in the page (no placeholder)
 *   - Improves performance and SEO (content in initial HTML)
 *   - Shared across multiple pages with single source of truth (data/fragments/*.json)
 *
 * Note: Requires data/fragments/*.json + corresponding fragment template in templates/fragments/
 */
export function fragmentInclude(data) {
  const { sectionClass = 'section', containerClass = '', heading, headingLink, subheading, fragmentSrc } = data;

  // Load pre-rendered fragment HTML
  let fragmentHtml = '';
  if (fragmentSrc) {
    const fragmentPath = path.join(projectRoot, fragmentSrc);
    try {
      fragmentHtml = fs.readFileSync(fragmentPath, 'utf-8');
    } catch (error) {
      console.warn(`Warning: Fragment not found at ${fragmentPath}. Placeholder will be used.`);
      fragmentHtml = `<!-- Fragment not found: ${fragmentSrc} -->`;
    }
  }

  const containerClassStr = containerClass ? ` ${containerClass}` : '';
  const subheadingHtml = subheading ? `<p class="paragraph-lg utility-text-secondary">${subheading}</p>` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${renderSectionHeading(heading, headingLink)}
    ${subheadingHtml}
    ${fragmentHtml}
  </div>
</section>`;
}
