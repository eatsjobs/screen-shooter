import HttpService from './HttpService';
import FileSaver from './FileSaver';

/**
 * get report
 * @return {URL} - returns the url object of the generated file
 */
export default async function getReport() {
  const http = new HttpService({url: 'https://httpbin.org/status/200'});
  const fileSaver = new FileSaver();
  const response = await http.collect();
  // TODO: some other stuff
  return fileSaver.save('Any text', `Report.${new Date().toJSON()}.txt`);
}
