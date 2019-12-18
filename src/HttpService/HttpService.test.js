import HttpService from './index.js';

beforeEach(() => {

});

test('ErrorReporter service', async () => {
  fetchMock
      .get(`${window.location.origin}?toUrl=www.edreams.com`, {
        status: 200,
        ok: true,
        body: JSON.stringify({test: 1}),
      });

  const httpService = new HttpService();
  const response = await httpService.get('?toUrl=www.edreams.com');
  expect(response.ok).toEqual(true);
  expect(response).toBeDefined();
});


test('ErrorReporter service should fail', async () => {
  fetchMock
      .get(`${window.location.origin}?toUrl=www.edreams.com`, {
        status: 500,
        ok: false,
        body: null,
        throws: new Error('Cannot reach server'),
      });

  const httpService = new HttpService();
  expect(httpService.get('?toUrl=www.edreams.com')).rejects.toThrow(Error);
});

afterEach(() => {
  fetchMock.restore();
});
