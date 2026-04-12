export function cardGrid(data) {
  const { sectionClass = 'section secondary-section', heading, items = [] } = data;

  const itemsHtml = items.map(item => `
    <div class="card card-body">
      ${item.eyebrow ? `<p class="hero-eyebrow">${item.eyebrow}</p>` : ''}
      <h3 class="h3-heading">${item.heading}</h3>
      <p class="paragraph-lg">${item.body}</p>
      ${item.link ? `<a href="${item.link.href}" class="${item.link.variant || 'button--ghost'}"><div class="button-label">${item.link.label}</div></a>` : ''}
    </div>`).join('');

  return `<section class="${sectionClass}">
  <div class="container container--narrow">
    ${heading ? `<div class="section-heading">
      <h2 class="h2-heading">${heading}</h2>
    </div>` : ''}
    <div class="grid-layout grid-layout--2col grid-gap-lg">
      ${itemsHtml}
    </div>
  </div>
</section>`;
}
