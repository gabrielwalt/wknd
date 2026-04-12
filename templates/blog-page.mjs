import { head } from './partials/head.mjs';
import { navbar } from './partials/navbar.mjs';
import { footer } from './partials/footer.mjs';
import { hero } from './blocks/hero.mjs';
import { gallery } from './blocks/gallery.mjs';
import { fragmentInclude } from './blocks/fragment-include.mjs';
import { renderArticleBody } from './blog/article-body.mjs';
import { gearPullquote } from './blog/gear-pullquote.mjs';

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
