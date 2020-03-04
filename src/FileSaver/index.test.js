import {generateBlob} from './index.js';

beforeEach(() => {
});

afterEach(() => {
});

test('should generate Blob', () => {
  const blob = generateBlob({data: 'text'});
  expect(blob).toBeDefined();
  expect(blob instanceof Blob);
});
