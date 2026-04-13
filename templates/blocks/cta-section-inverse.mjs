import { renderButton } from '../components/button.mjs';

export function ctaSectionInverse(data) {
  const { sectionClass = 'section inverse-section', eyebrow, heading, body, buttons = [] } = data;

  const btnArray = buttons;
  const buttonsHtml = btnArray.map(btn => renderButton(btn)).join('\n      ');

  return `<section class="${sectionClass}">
  <div class="container container--narrow">
    ${eyebrow ? `<p class="hero-eyebrow">${eyebrow}</p>` : ''}
    ${heading ? `<h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>` : ''}
    ${body ? `<p class="paragraph-lg utility-margin-bottom-lg">${body}</p>` : ''}
    ${btnArray.length > 0 ? `<div class="button-group">
      ${buttonsHtml}
    </div>` : ''}
  </div>
</section>`;
}
