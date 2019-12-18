export const createElement = document.createElement.bind(document);
export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const ROOT_SELECTOR = '#od-error-reporting';
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

