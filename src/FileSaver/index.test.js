import _FileSaver from './index.js';
let FileSaver = null;
beforeEach(() => {
  FileSaver = new _FileSaver();
});

test('file saver', async () => {
  const objectURL = FileSaver.save('simple text');
  expect(objectURL).toBeDefined();
});
