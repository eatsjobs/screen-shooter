import Logger from './index';

test('Logger tests', function() {
  const testLogger = Logger.getLogger('TEST');
  expect(testLogger.log).toBeDefined();
  expect(testLogger.info).toBeDefined();
  expect(testLogger.warn).toBeDefined();
  expect(testLogger.error).toBeDefined();
});

test('Logger should keep history', function() {
  const testLogger = Logger.getLogger('TEST');
  testLogger.log('Some Logs');
  expect(testLogger.history).toHaveLength(1);
});

test('Logger should keep history only with limited messages', function() {
  const testLogger = Logger.getLogger('2TEST');
  for (let i = 0; i < 15; i++) {
    testLogger.warn(`${i}_asd`);
  }
  expect(testLogger.history).toHaveLength(testLogger.limit);
});
