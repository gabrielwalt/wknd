/**
 * Renders a styled button link
 * @param {Object} data
 * @param {string} data.href - Target URL (required)
 * @param {string} data.label - Button text (required)
 * @param {string} [data.variant='primary'] - Button style: 'primary' (default), 'accent', 'ghost'
 * @returns {string} HTML: <a class="button"><span class="button-label">...</span></a>
 *
 * CSS Classes:
 *   - button (primary, default)
 *   - accent-button (highlighted accent)
 *   - button--ghost (transparent)
 *
 * Note: Uses <span> not <div> inside <a> for valid HTML semantics
 */
export function renderButton({ href, label, variant = 'primary' }) {
  const cls = variant === 'accent'  ? 'accent-button'
            : variant === 'ghost'   ? 'button--ghost'
            : 'button';
  return `<a href="${href}" class="${cls}"><span class="button-label">${label}</span></a>`;
}

/**
 * Renders a button-group wrapper containing one or more buttons.
 * Returns empty string if buttons array is empty.
 * @param {Array} buttons - Array of button objects passed to renderButton()
 * @param {Object} [opts]
 * @param {boolean} [opts.centered=false] - Add button-group--centered modifier
 */
export function renderButtonGroup(buttons, { centered = false } = {}) {
  if (!buttons || !buttons.length) return '';
  const cls = centered ? ' button-group--centered' : '';
  return `<div class="button-group${cls}">
      ${buttons.map(btn => renderButton(btn)).join('\n      ')}
    </div>`;
}
