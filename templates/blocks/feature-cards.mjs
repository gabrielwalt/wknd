import { renderButton } from '../components/button.mjs';

export function featureCards(data) {
  const { sectionClass = 'section inverse-section', heading, items = [] } = data;

  const itemsHtml = items.map(item => `
    <div class="feature-card">
      <h3 class="h4-heading">${item.heading}</h3>
      <p class="paragraph-lg utility-text-secondary${item.link ? ' utility-margin-bottom-sm' : ''}">${item.body}</p>
      ${item.link ? renderButton(item.link) : ''}
    </div>`).join('');

  return `<section class="${sectionClass}">
  <div class="container">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}
