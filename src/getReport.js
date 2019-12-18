import HttpService from './HttpService';
import {generateBlob} from './FileSaver';
import Logger from './Logger';
const logger = Logger.getLogger('getReport');

const errorReporterService = new HttpService({
  baseURL: '/travel/service/reporting/report',
});

/**
 * Get all key values from storage
 * @param {WindowLocalStorage|WindowSessionStorage} storage - storage
 * @return {Object<string, string>}
 */
async function getAllFrom(storage) {
  return {...storage};
}

/**
 * Get all cookies as object
 * @return {Object<string, string>}
 */
function getCookies() {
  if (document.cookie.length === 0) {
    return {};
  }
  return document.cookie.split(';').reduce((acc, keyvalue) => {
    const [key, value] = keyvalue.split('=');
    acc[key.trim()] = value;
    return acc;
  }, {});
}

/**
 * Get report
 * @param {String} query - query example: ?toUrl=www.edreams.es
 * @return {URL} - returns the url object of the generated file
 */
export default async function getReport(query) {
  const [
    localStorageDataSet,
    sessionStorageDataset,
    serverData,
  ] = await Promise.all([
    getAllFrom(localStorage),
    getAllFrom(sessionStorage),
    errorReporterService.get(query),
  ]);

  const clientData = {
    localStorage: localStorageDataSet,
    sessionStorage: sessionStorageDataset,
    cookies: getCookies(),
  };
  logger.info({serverData, clientData});
  return generateBlob({
    data: JSON.stringify({
      serverData,
      clientData,
    }, null, 2),
  });
}
