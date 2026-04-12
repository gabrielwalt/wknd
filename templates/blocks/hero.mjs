import { ref } from '../utils.mjs';
import { renderButton } from '../components/button.mjs';

export function hero(data) {
  if (data.variant === 'blog') {
    return renderBlogHero(data);
  } else if (data.variant === 'full') {
    return renderFullHero(data);
  } else {
    return renderStandardHero(data);
  }
}

function renderFullHero(data) {
  const overlayClass = data.overlay || 'overlay';
  const buttons = data.buttons || data.cta || [];
  const buttonsHtml = buttons.map(btn => renderButton(btn)).join('\n            ');

  return `<section class="hero-section hero-section--full">
  <div class="hero-bg">
    <img src="${data.image.src}" alt="${data.image.alt}" fetchpriority="high" />
    <div class="${overlayClass}"></div>
  </div>
  <div class="container hero-content">
    <div class="hero-content-inner">
      <p class="hero-eyebrow">${data.eyebrow}</p>
      <h1 class="h1-heading utility-margin-bottom-lg">${data.heading}</h1>
      <p class="paragraph-xl hero-lead">${data.lead || data.subheading}</p>
      <div class="button-group">
        ${buttonsHtml}
      </div>
    </div>
  </div>
</section>`;
}

function renderStandardHero(data) {
  const overlayClass = data.overlay || 'overlay';
  const buttons = data.buttons || data.cta || [];
  const buttonsHtml = buttons.map(btn => renderButton(btn)).join('\n            ');

  return `<section class="hero-section">
  <div class="hero-bg">
    <img src="${data.image.src}" alt="${data.image.alt}" ${data.fetchPriority ? 'fetchpriority="' + data.fetchPriority + '"' : ''} />
    <div class="${overlayClass}"></div>
  </div>
  <div class="container hero-content">
    <div class="hero-content-inner">
      <p class="hero-eyebrow">${data.eyebrow}</p>
      <h1 class="h1-heading utility-margin-bottom-lg">${data.heading}</h1>
      <p class="paragraph-xl hero-lead">${data.lead || data.subheading}</p>
      <div class="button-group">
        ${buttonsHtml}
      </div>
    </div>
  </div>
</section>`;
}

function renderBlogHero(data) {
  const breadcrumbsHtml = (data.breadcrumbs || []).map((crumb, i, arr) => {
    if (i === arr.length - 1) {
      return `<span>${crumb.label}</span>`;
    } else {
      return `<a href="${crumb.href}">${crumb.label}</a> <span aria-hidden="true">›</span>`;
    }
  }).join('\n        ');

  const bylineHtml = data.byline ? `
      <div class="article-byline">
        <div class="avatar"><img src="${data.byline.avatarSrc}" alt="${data.byline.avatarAlt}" /></div>
        <div>
          <p class="article-byline-name">${data.byline.authors}</p>
          <p class="article-byline-meta">${data.byline.meta}</p>
        </div>
      </div>` : '';

  return `<section class="hero-section">
  <div class="hero-bg">
    <img src="${data.image.src}" alt="${data.image.alt}" />
    <div class="overlay"></div>
  </div>
  <div class="hero-content">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="${data.breadcrumbs[0].href}">${data.breadcrumbs[0].label}</a> <span aria-hidden="true">›</span>
        <a href="${data.breadcrumbs[1].href}">${data.breadcrumbs[1].label}</a> <span aria-hidden="true">›</span>
        <span>${data.breadcrumbs[2].label}</span>
      </nav>
      <span class="tag blog-hero-tag">${data.tag}</span>
      <h1 class="h1-heading utility-margin-bottom-lg">${data.heading}</h1>${bylineHtml}
    </div>
  </div>
</section>`;
}
