// FIX: use native <button> instead of <div role="button" tabindex="0">
export function faqList(data) {
  const { sectionClass = 'section', containerClass = '', heading, headingLink, items } = data;

  const itemsHtml = (items || []).map(item => `
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false">
        <span>${item.question}</span>
        <span class="faq-icon"></span>
      </button>
      <div class="faq-answer">${item.answer}</div>
    </div>`).join('');

  const containerClassStr = containerClass ? ` ${containerClass}` : '';
  const headingLinkHtml = headingLink ? `
      <a href="${headingLink.href}" class="text-button"><div>${headingLink.label}</div></a>` : '';

  return `<section class="${sectionClass}">
  <div class="container${containerClassStr}">
    ${heading ? `<div class="section-heading utility-margin-bottom-xl">
      <h2 class="h2-heading">${heading}</h2>${headingLinkHtml}
    </div>` : ''}
    <div class="faq-list">${itemsHtml}
    </div>
  </div>
</section>`;
}
