import Logger from '../Logger';
const logger = Logger.getLogger('HttpService');
/**
 *
 *
 * @export
 * @class HttpService
 */
export default class HttpService {
  /**
   * @param {Object} param0 - config
   * @param {String} param0.baseURL - baseURL
   * @memberof HttpService
   */
  constructor({baseURL = window.location.origin} = {}) {
    this.baseURL = baseURL;
  }

  /**
   *
   * @param {String} endPoint - endPoint
   * @return {Promise<Object, Object>}
   * @memberof HttpService
   */
  async get(endPoint) {
    const url = `${this.baseURL}${endPoint}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      logger.info({response});
      if (!response.ok) {
        const {status, statusText} = response;
        logger.warn('Cannot get', {url}, {status, statusText});
        return {
          url,
          status,
          statusText,
        };
      }
      return response.json();
    } catch (err) {
      logger.warn('Cannot get', {url, err});
      return null;
    }
  }
}
