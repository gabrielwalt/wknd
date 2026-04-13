import { head } from './partials/head.mjs';
import { navbar } from './partials/navbar.mjs';
import { footer } from './partials/footer.mjs';
import { hero } from './blocks/hero.mjs';
import { gallery } from './blocks/gallery.mjs';
import { fragmentInclude } from './blocks/fragment-include.mjs';
import { renderArticleBody } from './blog/article-body.mjs';
import { gearPullquote } from './blog/gear-pullquote.mjs';

/**
 * Renders a complete blog article page (HTML document)
 * @param {Object} postData - Blog post configuration object
 * @param {Object} postData.meta - Post metadata (required)
 * @param {string} postData.meta.title - Post title (required, for <title> tag)
 * @param {string} postData.meta.description - Meta description (required)
 * @param {number} postData.meta.depth - URL depth (should be 1 for blog pages)
 * @param {Object} postData.hero - Blog hero config (variant='blog' with breadcrumbs, tag, byline)
 * @param {Array} [postData.articleBody=[]] - Typed block array (p, h2, h3, figure, blockquote, pull-quote, ul, html)
 * @param {Object} [postData.gearPullquote] - Optional gear list + pull quote sidebar
 * @param {Object} [postData.gallery] - Optional gallery section at bottom
 * @param {Object} [postData.moreStories] - Optional "More Stories" fragment include
 * @param {Object} siteData - Site-wide configuration (from data/site.json)
 * @returns {string} HTML: complete <!doctype html> document with article layout
 *
 * Page composition:
 *   1. <head> with title, description, favicon, stylesheet
 *   2. Skip link (a11y)
 *   3. Navbar with megamenus, subscribe button
 *   4. <main> with:
 *      - Blog hero (variant='blog' with breadcrumbs, tag, byline)
 *      - Article body section with typed blocks
 *      - Optional gear + pull quote sidebar
 *      - Optional image gallery
 *      - Optional "More Stories" fragment include
 *   5. Footer with logo, links, copyright
 *   6. Script: ../js/site.js (depth=1 requires ../)
 *
 * All URLs resolve relative to /blog/ using depth=1
 */
export function renderBlogPage(postData, siteData) {
  const { meta, hero: heroData, articleBody = [], gearPullquote: gearPullquoteData, gallery: galleryData, moreStories } = postData;
  const depth = meta.depth || 1;

  const articleBodyHtml = renderArticleBody(articleBody);
  const gearPullquoteHtml = gearPullquoteData ? gearPullquote({ ...gearPullquoteData, depth }) : '';
  const galleryHtml = galleryData ? gallery({ ...galleryData, depth }) : '';
  const moreStoriesHtml = moreStories ? fragmentInclude({ ...moreStories, depth }) : '';

  return `<!doctype html>
<html lang="en">
  ${head(meta)}
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    ${navbar(siteData, depth)}

    <main id="main-content">
      ${heroData ? hero({ ...heroData, depth }) : ''}

      <!-- Article Body -->
      <section class="section blog-article-section utility-padding-top-0">
        <div class="container blog-article-container">
          <div class="blog-content blog-content-body">
            ${articleBodyHtml}
          </div>
        </div>
      </section>

      ${gearPullquoteHtml}
      ${galleryHtml}
      ${moreStoriesHtml}
    </main>

    ${footer(siteData, depth)}

    <script src="../js/site.js" defer></script>
  </body>
</html>`;
}
