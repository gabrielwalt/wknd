import { renderButton } from '../components/button.mjs';

/**
 * Renders a featured article section with image, metadata, heading, description, and CTA button
 * @param {Object} data
 * @param {Object} data.image - Article image
 * @param {string} data.image.src - Image URL (required)
 * @param {string} data.image.alt - Image alt text (required)
 * @param {string} [data.image.href] - If provided, wraps image in a link
 * @param {string} [data.tag] - Category/tag label (shows in tag div or eyebrow)
 * @param {string} [data.eyebrow] - Small text above heading (alternative to tag)
 * @param {string} data.heading - Article title (required)
 * @param {string} data.body - Article description (required)
 * @param {string} [data.body2] - Optional second paragraph
 * @param {Object} [data.button] - CTA button {href, label, variant}
 * @param {Object} [data.cta] - Alias for button
 * @param {string} [data.sectionClass='section secondary-section'] - Section CSS class
 * @returns {string} HTML: <section class="section secondary-section">
 *
 * Used for highlighting featured content on pages
 */
export function featuredArticle(data) {
  const { image, tag, eyebrow, heading, body, body2, button, cta, sectionClass = 'section secondary-section' } = data;
  const btn = button || cta;

  const tagHtml = tag ? `<div class="tag">${tag}</div>` : eyebrow ? `<p class="hero-eyebrow">${eyebrow}</p>` : '';
  const body2Html = body2 ? `<p class="paragraph-lg utility-margin-bottom-lg">${body2}</p>` : '';
  const imageElement = image ? (image.href ?
    `<a href="${image.href}" class="featured-article-image">\n        <img src="${image.src}" alt="${image.alt}" loading="lazy" />\n      </a>` :
    `<div class="featured-article-image">\n        <img src="${image.src}" alt="${image.alt}" loading="lazy" />\n      </div>`) : '';

  return `<section class="${sectionClass}">
  <div class="container">
    <div class="featured-article">
      ${imageElement}
      <div>
        ${tagHtml}
        <h2 class="h2-heading">${heading}</h2>
        <p class="paragraph-lg utility-text-secondary utility-margin-bottom-lg">${body}</p>
        ${body2Html}
        ${btn ? `<div class="featured-article-footer">
          ${renderButton(btn)}
        </div>` : ''}
      </div>
    </div>
  </div>
</section>`;
}
