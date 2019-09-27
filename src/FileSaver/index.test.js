import FileSaver from '.';

beforeEach(() => {

});

test('file saver', async () => {
  const objectURL = FileSaver.save('simple text');
  expect(objectURL).toBeDefined();
});
