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
   * @param {String} query - queryparams string ?a=1&b=2
   * @return {Promise.<Object>}
   * @memberof HttpService
   */
  get(query) {
    return fetch(`${this.baseURL}${query}`, {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
        .then((response) => {
          logger.info({response});
          if (!response.ok) {
            const {status, statusText} = response;
            logger.warn('Cannot get', {query}, {status, statusText});
            return {
              status,
              statusText,
            };
          }
          return response.json();
        })
        .catch((err) => {
          console.err(err);
          logger.warn('Cannot get', {query}, {err});
          return {};
        });
  }
}
