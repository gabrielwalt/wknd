import { renderButton } from '../components/button.mjs';

export function ctaSection(data) {
  const { sectionClass = 'section accent-section', centered = true, heading, body, button } = data;

  const containerClass = centered ? 'container utility-text-align-center' : 'container container--narrow';

  return `<section class="${sectionClass}">
  <div class="${containerClass}">
    ${heading ? `<h2 class="h2-heading utility-margin-bottom-lg">${heading}</h2>` : ''}
    ${body ? `<p class="paragraph-lg utility-margin-bottom-xl">${body}</p>` : ''}
    ${button ? `<div class="button-group${centered ? ' button-group--centered' : ''}">
      ${renderButton(button)}
    </div>` : ''}
  </div>
</section>`;
}
