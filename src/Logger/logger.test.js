import Logger from './index';

test('Logger tests', function() {
  const testLogger = Logger.getLogger('TEST');
  expect(testLogger.log).toBeDefined();
  expect(testLogger.info).toBeDefined();
  expect(testLogger.warn).toBeDefined();
  expect(testLogger.error).toBeDefined();
});
