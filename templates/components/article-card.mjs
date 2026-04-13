/**
 * Renders an article card with image, metadata, heading, description, and optional byline
 * @param {Object} card
 * @param {string} card.href - Link to article (used when not muted)
 * @param {Object} card.image
 * @param {string} card.image.src - Image URL (required)
 * @param {string} card.image.alt - Image alt text (required)
 * @param {string} [card.tagText] - Category/tag label
 * @param {string} [card.tagMeta] - Location or secondary metadata
 * @param {string} card.heading - Article title (required)
 * @param {string} card.body - Short description (required)
 * @param {Object} [card.byline] - Author byline
 * @param {string} card.byline.name - Author name
 * @param {string} card.byline.meta - Date or subtitle
 * @param {string} card.byline.avatarSrc - Avatar image URL
 * @param {string} card.byline.avatarAlt - Avatar alt text
 * @param {boolean} [card.isMuted=false] - If true, renders as div (not link)
 * @param {boolean} [card.ariaDisabled] - If true, adds aria-disabled="true"
 * @param {string} [card.tagClass='tag'] - CSS class for tag element
 * @param {string} [card.headingClass='h5-heading'] - CSS class for heading
 * @param {string} [card.textButton] - Text for optional text button
 * @returns {string} HTML: <a class="article-card"> or <div class="article-card">
 */
export function renderArticleCard(card) {
  const { href, image, tagText, tagMeta, heading, body, byline, isMuted, ariaDisabled } = card;
  const isLink = !isMuted;
  const tagClass = card.tagClass || 'tag';

  const tagHtml = tagText ? `
      <div class="article-card-meta">
        <div class="${tagClass}">${tagText}</div>${tagMeta ? `
        <span class="article-card-location">${tagMeta}</span>` : ''}
      </div>` : '';

  const bylineHtml = byline ? `
      <div class="article-byline utility-margin-top-md">
        <div class="avatar"><img src="${byline.avatarSrc}" alt="${byline.avatarAlt}" loading="lazy" /></div>
        <div>
          <p class="paragraph-sm article-byline-name">${byline.name}</p>
          <p class="article-byline-meta">${byline.meta}</p>
        </div>
      </div>` : '';

  const innerHtml = `
    <div class="article-card-image">
      <img src="${image.src}" alt="${image.alt}" loading="lazy" />
    </div>
    <div class="article-card-body">${tagHtml}
      <h3 class="${card.headingClass || 'h5-heading'} utility-margin-bottom-sm">${heading}</h3>
      <p class="paragraph-sm utility-text-secondary">${body}</p>${bylineHtml}${card.textButton ? `
      <span class="text-button">${card.textButton}</span>` : ''}
    </div>`;

  if (isLink) {
    return `<a href="${href}" class="article-card">${innerHtml}
</a>`;
  } else {
    return `<div class="article-card${ariaDisabled ? ' is-muted' : ''}" ${ariaDisabled ? 'aria-disabled="true"' : ''}>${innerHtml}
</div>`;
  }
}
