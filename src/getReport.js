import HttpService from './HttpService';
import {generateBlob} from './FileSaver';
import Logger from './Logger';
const logger = Logger.getLogger('getReport');


const errorReporterService = new HttpService();


/**
 * Get all key values from storage
 * @param {Storage} storage - storage
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
 * getReport
 * @param {string} [endPoint=''] - endPoint string params
 * @param {object} [extra={}] - extra object to be attached to the file
 * @return {Promise<Blob>}
 */
export default async function getReport(endPoint = '', extra = {}) {
  try {
    const [
      localStorageDataSet,
      sessionStorageDataset,
      serverData = {},
    ] = await Promise.all([
      getAllFrom(localStorage),
      getAllFrom(sessionStorage),
      errorReporterService.get(endPoint),
    ]);

    const clientData = {
      localStorage: localStorageDataSet,
      sessionStorage: sessionStorageDataset,
      cookies: getCookies(),
      ...extra,
    };
    logger.info({clientData});
    return generateBlob({
      data: JSON.stringify({
        serverData,
        clientData,
      }, null, 2),
    });
  } catch (e) {
    logger.error(e);
  }
}
