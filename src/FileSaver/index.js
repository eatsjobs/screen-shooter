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
  type = 'text/plain',
} = {}) {
  const file = new Blob([data], {type});
  return file;
}

/**
 * save the file
 * @param {object} [options={}] options
 * @param {string} options.url url
 * @param {string} [options.name="report"] name
 * @param {string} [options.ext="txt"] ext
 * @return {HTMLAnchorElement}
 */
export function download({url, name='report', ext='txt'} = {}) {
  const a = createElement('a');
  a.style = 'display:none; position: absolute; height:0px; width:0px;';
  if (typeof a.download === 'string') {
    a.href = url;
    a.download = `${name}.${new Date().toUTCString()}.${ext}`;
    document.body.appendChild(a);
    a.click();
  } else {
    window.open(url);
  }
  setTimeout(() => {
    document.body.removeChild(a);
    a.remove();
  }, 0);
  return a;
}
