/**
 *
 *
 * @export
 * @class HttpService
 */
export class HttpService {
  /**
   *Creates an instance of HttpService.
   * @param {*} [{url = window.location.origin}={}] - test
   * @memberof HttpService
   */
  constructor({url = window.location.origin} = {}) {
    this.baseURL = url;
  }
  /**
   *
   *
   * @return {Promise}
   * @memberof HttpService
   */
  collect() {
    return fetch(this.baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}
