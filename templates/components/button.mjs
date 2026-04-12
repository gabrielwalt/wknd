// FIX: <span> not <div> inside <a>
export function renderButton({ href, label, variant = 'primary' }) {
  const cls = variant === 'accent'  ? 'accent-button'
            : variant === 'ghost'   ? 'button--ghost'
            : 'button';
  return `<a href="${href}" class="${cls}"><span class="button-label">${label}</span></a>`;
}
