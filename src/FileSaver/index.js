import {createElement} from '../utils.js';

/**
 *
 * Generate the ObjectURL
 * @param {String} data
 * @param {string} [filename=`${new Date().toJSON()}.txt`]
 * @param {string} [type='text/plain']
 * @return {DOMStringMap}
 * @memberof FileSaver
 */
export function generateBlob({
  data,
  filename = `${new Date().toJSON()}.txt`,
  type = 'text/plain',
} = {}) {
  const file = new Blob([data], {type});

  const url = URL.createObjectURL(file);
  return url;
}

/**
 * save the file
 * @param {Object} [{ url, name='report', ext='txt' }={}]
 */
export function download({url, name='report', ext='txt'} = {}) {
  const a = createElement('a');
  a.href = url;
  a.download = `name.${new Date().toUTCString()}.${ext}`;
  a.click();
  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 0);
}
