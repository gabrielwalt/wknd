/**
 * Formats multi-paragraph body text with proper spacing
 * Splits on double newlines (\n\n) and wraps each paragraph in <p> tags with margin utilities
 * @param {string} body - Raw text with paragraphs separated by \n\n
 * @param {string} [className='paragraph-lg utility-text-secondary'] - CSS classes for paragraphs
 * @param {string} [lastMargin=''] - Margin class for last paragraph (e.g., 'utility-margin-bottom-xl')
 * @returns {string} HTML: series of <p> tags with margin utilities
 */
export function formatBody(body, className = 'paragraph-lg utility-text-secondary', lastMargin = '') {
  if (!body) return '';

  // Split by double newlines to get individual paragraphs
  const paragraphs = body.split('\n\n').filter(p => p.trim());

  if (paragraphs.length === 0) return '';

  return paragraphs.map((para, i) => {
    const isLast = i === paragraphs.length - 1;
    const margin = isLast ? (lastMargin ? ' ' + lastMargin : '') : ' utility-margin-bottom-lg';
    return `<p class="${className}${margin}">${para.trim()}</p>`;
  }).join('');
}
