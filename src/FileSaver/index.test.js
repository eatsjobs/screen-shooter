import {generateBlob, download} from './index.js';

beforeEach(() => {

});

afterEach(() => {
  
});

test('should generate Blob', () => {
  const blob = generateBlob({data: 'text'});
  expect(blob).toBeDefined();
  expect(blob instanceof Blob);
});


test('should download the file', () => {
  HTMLAnchorElement.prototype.click = jest.fn();
  const output = download({url: URL.createObjectURL('mock')});
  expect(output).toBeDefined();
  expect(output instanceof HTMLAnchorElement).toBe(true);
  expect(output.download).toContain('report');
  expect(output.download).toContain('txt');
  expect(HTMLAnchorElement.prototype.click).toHaveBeenCalledTimes(1);
  expect(output.style.display).toEqual('none');
});
