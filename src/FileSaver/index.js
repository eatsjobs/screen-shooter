
/**
 *
 *
 * @class FileSaver
 */
class FileSaver {
  /**
     *
     * Generate the ObjectURL
     * @param {String} data
     * @param {string} [filename=`${new Date().toJSON()}.txt`]
     * @param {string} [type='text/plain']
     * @return {ObjectURL}
     * @memberof FileSaver
     */
  save(data, filename = `${new Date().toJSON()}.txt`, type = 'text/plain') {
    const file = new Blob([data], {type});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(file, filename);
    } else {
      const url = URL.createObjectURL(file);
      return url;
    }
  }
}

export default new FileSaver;
