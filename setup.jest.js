global.fetchMock = require('fetch-mock');
if (typeof window.URL.createObjectURL === 'undefined') {
  Object.defineProperty(window.URL, 'createObjectURL', {
    value: jest.fn((file) => file),
  });
}
