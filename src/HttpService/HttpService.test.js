import HttpService from './index.js';

let httpService = null;
beforeEach(() => {
  httpService = new HttpService();
});

test('simple test', async () => {
  const response = await httpService.collect();
  expect(response).toBeDefined();
});
