import HttpService from './HttpService';
import {generateBlob} from './FileSaver';
import Logger from './Logger';
const logger = Logger.getLogger('getReport');

const httpBinService = new HttpService({baseURL: 'https://httpbin.org'});

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
  return document.cookie.split(';').reduce((acc, keyValue) => {
    const [key, value] = keyValue.split('=');
    acc[key.trim()] = value;
    return acc;
  }, {});
}

/**
 * getReport
 * @param {object} [extra={}] - extra object to be attached to the file
 * @return {Promise<Blob>}
 */
export default async function getReport(extra = {}) {
  try {
    const [
      localStorageDataSet,
      sessionStorageDataset,
      serverData = {},
    ] = await Promise.all([
      getAllFrom(localStorage),
      getAllFrom(sessionStorage),
      httpBinService.get('/ip'),
    ]);

    const clientData = {
      localStorage: localStorageDataSet,
      sessionStorage: sessionStorageDataset,
      cookies: getCookies(),
    };
    logger.info({clientData, serverData});
    return generateBlob({
      data: JSON.stringify(
          {
            serverData,
            clientData,
            extra,
          },
          null,
          2,
      ),
    });
  } catch (e) {
    logger.error(e);
  }
}
