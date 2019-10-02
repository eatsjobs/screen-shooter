import HttpService from './HttpService';
import {generateBlob} from './FileSaver';

const http = new HttpService({
  url: '/travel/service/reporting/report?toUrl=www.edreams.es',
});

/**
 * get report
 * @return {URL} - returns the url object of the generated file
 */
export default async function getReport() {
  // /travel/service/reporting/report?toUrl=www.edreams.es
  const response = await http.collect();
  // TODO: some other stuff
  return generateBlob({data: 'Any text'});
}
