export const createElement = document.createElement.bind(document);
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const ROOT_SELECTOR = '#error-reporting';
/**
 * delay util
 * @param {number} [ms=0]
 * @return {Promise}
 */
export function delay(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

/**
 * trigger click cross browser
 * @param {HTMLElement} node - the element where to click
 */
export function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
        20, false, false, false, false, 0, null);
    node.dispatchEvent(evt);
  }
}
