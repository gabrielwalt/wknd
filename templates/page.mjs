import { head } from './partials/head.mjs';
import { navbar } from './partials/navbar.mjs';
import { footer } from './partials/footer.mjs';
import { hero } from './blocks/hero.mjs';
import { featuredArticle } from './blocks/featured-article.mjs';
import { editorialIndex } from './blocks/editorial-index.mjs';
import { faqList } from './blocks/faq-list.mjs';
import { tabSection } from './blocks/tab-section.mjs';
import { articleCardGrid } from './blocks/article-card-grid.mjs';
import { featureCards } from './blocks/feature-cards.mjs';
import { ctaSection } from './blocks/cta-section.mjs';
import { ctaSectionInverse } from './blocks/cta-section-inverse.mjs';
import { proseNarrow } from './blocks/prose-narrow.mjs';
import { gallery } from './blocks/gallery.mjs';
import { ticker } from './blocks/ticker.mjs';
import { cardGrid } from './blocks/card-grid.mjs';
import { intro } from './blocks/intro.mjs';
import { fragmentInclude } from './blocks/fragment-include.mjs';
import { gearBreakdown } from './blocks/gear-breakdown.mjs';

/**
 * Renders a complete root-level page (HTML document)
 * @param {Object} pageData - Page configuration object
 * @param {Object} pageData.meta - Page metadata (required)
 * @param {string} pageData.meta.title - Page title (required, for <title> tag)
 * @param {string} pageData.meta.description - Meta description (required)
 * @param {number} pageData.meta.depth - URL depth (should be 0 for root pages)
 * @param {Object} [pageData.hero] - Optional hero section config (passed to hero())
 * @param {Array} [pageData.sections=[]] - Array of content sections
 * @param {string} pageData.sections[].type - Block type (maps to blockRenderers)
 * @param {Object} siteData - Site-wide configuration (from data/site.json)
 * @returns {string} HTML: complete <!doctype html> document with head, body, nav, footer
 *
 * Page composition:
 *   1. <head> with title, description, favicon, stylesheet
 *   2. Skip link (a11y)
 *   3. Navbar with megamenus, subscribe button
 *   4. <main> with hero (if provided) + rendered sections
 *   5. Footer with logo, links, copyright
 *   6. Deferred script: js/site.js
 *
 * Sections are rendered by type using blockRenderers dispatch table
 * All renderers receive depth param for depth-aware URL resolution
 */

const blockRenderers = {
  'hero': hero,
  'featured-article': featuredArticle,
  'editorial-index': editorialIndex,
  'faq-list': faqList,
  'tab-section': tabSection,
  'article-card-grid': articleCardGrid,
  'feature-cards': featureCards,
  'cta-section': ctaSection,
  'cta-section-inverse': ctaSectionInverse,
  'prose-narrow': proseNarrow,
  'gallery': gallery,
  'ticker': ticker,
  'card-grid': cardGrid,
  'intro': intro,
  'fragment-include': fragmentInclude,
  'gear-breakdown': gearBreakdown,
};

export function renderPage(pageData, siteData) {
  const { meta, hero: heroData, sections = [] } = pageData;
  const depth = meta.depth || 0;

  const sectionsHtml = sections.map(section => {
    const renderer = blockRenderers[section.type];
    if (!renderer) {
      console.warn(`Unknown section type: ${section.type}`);
      return '';
    }
    // Pass depth to section data so blocks can use it
    return renderer({ ...section, depth });
  }).join('\n\n');

  return `<!doctype html>
<html lang="en">
  ${head(meta)}
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    ${navbar(siteData, depth)}

    <main id="main-content">
      ${heroData ? hero({ ...heroData, depth }) : ''}
      ${sectionsHtml}
    </main>

    ${footer(siteData, depth)}

    <script src="${depth === 0 ? 'js/site.js' : '../js/site.js'}" defer></script>
  </body>
</html>`;
}
