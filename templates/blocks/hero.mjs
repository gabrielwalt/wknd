import { ref } from '../utils.mjs';
import { renderButton } from '../components/button.mjs';

/**
 * Renders a hero section (dispatches to variant-specific renderers)
 * @param {Object} data
 * @param {string} data.variant - 'full', 'standard', or 'blog'
 * @param {Object} data.image - {src, alt} (required)
 * @param {string} [data.overlay='overlay'] - Overlay class ('overlay' or 'overlay-side')
 * @param {string} data.eyebrow - Small text above heading
 * @param {string} data.heading - Main heading (supports newlines) (required)
 * @param {string} data.lead - Subtitle/lead text
 * @param {Array} [data.buttons] - CTA buttons (for full/standard variants)
 * @param {Array} [data.breadcrumbs] - Breadcrumb navigation (for blog variant)
 * @param {string} [data.tag] - Category tags (for blog variant)
 * @param {Object} [data.byline] - Author byline (for blog variant)
 * @param {number} data.depth - URL depth for relative paths
 * @returns {string} HTML: <section class="hero-section">
 *
 * Variants:
 *   - 'full': Full-height hero with image, overlay, content, buttons
 *   - 'standard': Standard hero layout
 *   - 'blog': Blog article hero with breadcrumbs, tag, and byline
 */
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
  const buttonsHtml = buttons.length > 0 ? `<div class="button-group">
        ${buttons.map(btn => renderButton(btn)).join('\n            ')}
      </div>` : '';

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
      ${buttonsHtml}
    </div>
  </div>
</section>`;
}

function renderStandardHero(data) {
  const overlayClass = data.overlay || 'overlay';
  const buttons = data.buttons || data.cta || [];
  const buttonsHtml = buttons.length > 0 ? `<div class="button-group">
        ${buttons.map(btn => renderButton(btn)).join('\n            ')}
      </div>` : '';

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
      ${buttonsHtml}
    </div>
  </div>
</section>`;
}

function renderBlogHero(data) {
  const bylineHtml = data.byline ? `
      <div class="article-byline">
        <div class="avatar"><img src="${data.byline.avatarSrc || data.byline.avatar}" alt="${data.byline.avatarAlt || data.byline.author || ''}" /></div>
        <div>
          <p class="article-byline-name">${data.byline.authors || data.byline.name}</p>
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
      <span class="tag blog-hero-tag">${data.tag}</span>
      <h1 class="h1-heading utility-margin-bottom-lg">${data.heading}</h1>
      ${bylineHtml}
    </div>
  </div>
</section>`;
}
