export function gallery(data) {
  const { sectionClass = 'section inverse-section', heading, headingLink, images = [], wideImage } = data;

  const imagesHtml = images.map(img => `
    <img src="${img.src}" alt="${img.alt}" class="gallery-img" loading="lazy" />`).join('');

  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><div>${headingLink.label}</div></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container">
    ${heading ? `<div class="section-heading utility-margin-bottom-xl">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    <div class="grid-layout desktop-3-column grid-gap-lg">
      ${imagesHtml}
    </div>
    ${wideImage ? `<div class="utility-margin-top-lg">
      <img src="${wideImage.src}" alt="${wideImage.alt}" class="gallery-img gallery-img--wide" loading="lazy" />
    </div>` : ''}
  </div>
</section>`;
}
