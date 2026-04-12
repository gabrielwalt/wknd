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
