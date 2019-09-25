
class FileSaver {
    /**
     * saveToFile
     * @param {String} data - the data as text
     * @param {String} filename - the filename with extension file.txt
     * @param {String} type - the type 'text/plain' for example
     * @returns {URL} the object url pointing to the file. you should revoke it once done
     */
    save(data, filename = `${new Date().toJSON()}.txt`, type = 'text/plain') {        
        const file = new Blob([ data ], {type});
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(file, filename);
        } else {
            const url = URL.createObjectURL(file);
            return url;
        }
    }
}

export default new FileSaver;