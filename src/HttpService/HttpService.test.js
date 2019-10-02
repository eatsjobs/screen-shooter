import HttpService from './index.js';

let httpService = null;
beforeEach(() => {
  httpService = new HttpService();
  fetch.mockResponseOnce(JSON.stringify({data: '12345'}));
});

test('simple test', async () => {
  const response = await httpService.collect();
  expect(response).toBeDefined();
});
