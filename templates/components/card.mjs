import { renderButton } from './button.mjs';

/**
 * Renders a standard card with optional eyebrow, heading, body, and button
 * @param {Object} item
 * @param {string} [item.eyebrow] - Optional pill label above heading
 * @param {string} item.heading - Card title (required)
 * @param {string} item.body - Card description
 * @param {Object} [item.button] - Button data {href, label, variant}
 * @param {Object} [item.link] - Alias for button (same shape)
 * @returns {string} HTML: <div class="card card-body">
 *
 * Used by card-grid, editorial-index (cards section), and any other block
 * needing a standard bordered card. Buttons use renderButton() for consistent
 * variant mapping. Both `button` and `link` properties are supported.
 */
export function renderCard(item) {
  const eyebrowHtml = item.eyebrow ? `<p class="tag">${item.eyebrow}</p>` : '';
  const btn = item.button || item.link;
  const buttonHtml = btn ? renderButton(btn) : '';
  return `<div class="card card-body">
      ${eyebrowHtml}
      <h3 class="h3-heading">${item.heading}</h3>
      <p class="paragraph-lg">${item.body || ''}</p>
      ${buttonHtml}
    </div>`;
}
