import FileSaver from 'file-saver';
/**
 *
 * Generate the ObjectURL
 * @param {String} data
 * @param {string} [filename=`${new Date().toJSON()}.txt`]
 * @param {string} [type='text/plain']
 * @return {Blob}
 */
export function generateBlob({
  data,
  type = 'text/plain;charset=utf-8',
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
  return FileSaver.saveAs(url, `${name}.${new Date().toUTCString()}.${ext}`);
}
