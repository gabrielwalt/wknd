import { renderButton } from '../components/button.mjs';

export function ctaSection(data) {
  const { sectionClass = 'section accent-section', centered = true, heading, body, button, buttons } = data;

  const containerClass = centered ? 'container utility-text-align-center' : 'container container--narrow';
  const btnArray = buttons || (button ? [button] : []);
  const buttonsHtml = btnArray.map(btn => renderButton(btn)).join('\n      ');

  return `<section class="${sectionClass}">
  <div class="${containerClass}">
    ${heading ? `<h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>` : ''}
    ${body ? `<p class="paragraph-lg utility-margin-bottom-xl">${body}</p>` : ''}
    ${btnArray.length > 0 ? `<div class="button-group${centered ? ' button-group--centered' : ''}">
      ${buttonsHtml}
    </div>` : ''}
  </div>
</section>`;
}
