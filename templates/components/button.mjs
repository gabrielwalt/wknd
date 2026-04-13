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
