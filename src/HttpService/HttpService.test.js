import Logger from '../Logger';
import HttpService from './index.js';

Logger.disableAll();
let url = '';
beforeAll(() => {
  url = `${window.location.origin}/service/reporting/session`;
});

beforeEach(() => {});
afterEach(() => fetchMock.restore());

test('ErrorReporter service', async () => {
  fetchMock
      .get(url, {
        status: 200,
        ok: true,
        body: JSON.stringify({test: 1}),
      });

  const httpService = new HttpService();
  const response = await httpService.get('/service/reporting/session');
  expect(response.ok).toEqual(true);
  expect(response).toBeDefined();
});


test('ErrorReporter service should return null', async () => {
  fetchMock
      .get(url, {
        status: 500,
        ok: false,
        body: null,
        throws: new Error('Cannot reach server'),
      });

  const httpService = new HttpService();
  return expect(httpService.get('/service/reporting/session'))
      .resolves
      .toEqual(null);
});
