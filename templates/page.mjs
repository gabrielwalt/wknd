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
import { proseNarrow } from './blocks/prose-narrow.mjs';
import { gallery } from './blocks/gallery.mjs';
import { ticker } from './blocks/ticker.mjs';
import { cardGrid } from './blocks/card-grid.mjs';
import { intro } from './blocks/intro.mjs';
import { fragmentInclude } from './blocks/fragment-include.mjs';

const blockRenderers = {
  'hero': hero,
  'featured-article': featuredArticle,
  'editorial-index': editorialIndex,
  'faq-list': faqList,
  'tab-section': tabSection,
  'article-card-grid': articleCardGrid,
  'feature-cards': featureCards,
  'cta-section': ctaSection,
  'prose-narrow': proseNarrow,
  'gallery': gallery,
  'ticker': ticker,
  'card-grid': cardGrid,
  'intro': intro,
  'fragment-include': fragmentInclude,
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
