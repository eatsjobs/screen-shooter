/**
 * Create a style tag from a simple css string
 * @param {String} css - the css string
 * @return {HTMLStyleElement}
 */
export function styleSheet(css) {
  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));    
  }
  return style;
}
