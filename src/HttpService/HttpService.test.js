import {HttpService} from '.';

let httpService = null;
beforeEach(() => {
  httpService = new HttpService();
});

test('simple test', async () => {
  const response = await httpService.collect();
  expect(response).toBeDefined();
});
