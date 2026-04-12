import { renderButton } from '../components/button.mjs';

export function featuredArticle(data) {
  const { image, tag, eyebrow, heading, body, body2, button, sectionClass = 'section secondary-section' } = data;

  const tagHtml = tag ? `<div class="tag">${tag}</div>` : eyebrow ? `<p class="hero-eyebrow">${eyebrow}</p>` : '';
  const body2Html = body2 ? `<p class="paragraph-lg utility-margin-bottom-lg">${body2}</p>` : '';
  const imageElement = image.href ?
    `<a href="${image.href}" class="featured-article-image">\n        <img src="${image.src}" alt="${image.alt}" loading="lazy" />\n      </a>` :
    `<div class="featured-article-image">\n        <img src="${image.src}" alt="${image.alt}" loading="lazy" />\n      </div>`;

  return `<section class="${sectionClass}">
  <div class="container">
    <div class="featured-article">
      ${imageElement}
      <div>
        ${tagHtml}
        <h2 class="h2-heading">${heading}</h2>
        <p class="paragraph-lg utility-text-secondary utility-margin-bottom-lg">${body}</p>
        ${body2Html}
        <div class="featured-article-footer">
          ${renderButton(button)}
        </div>
      </div>
    </div>
  </div>
</section>`;
}
