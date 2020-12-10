const Loggers = Object.create(null);
const {getOwnPropertyNames, defineProperty} = Object;
// @ts-check
class Logger {
  /**
   * Creates an instance of Logger.
   * @param {string} name
   * @param {boolean} [enabled=true]
   * @param {number} [limit=10]
   * @memberof Logger
   */
  constructor(name, enabled = true, limit = 10) {
    this.loggerPrefix = name;
    this.enabled = enabled;
    this.history = [];
    this.limit = limit;
    getOwnPropertyNames(console)
        .filter((methodName) => [
          'warn',
          'log',
          'error',
          'info'].indexOf(methodName) >-1)
        .map((methodName) => {
          // generate and decorates functions. forwarding arguments to
          // 'console' object
          defineProperty(this, methodName, {
            value: function(...args) {
              const date = new Date().toGMTString();
              args.unshift(`${date}:(module: ${this.loggerPrefix})`);
              this._store(JSON.stringify(args));
              if (!this.enabled) return;
              console[methodName](...args);
              return args;
            },
            enumerable: true,
            configurable: false,
            // writable: false,
          });
        });
  }

  _store(line) {
    if (this.history.length === this.limit) {
      this.history.shift();
    }
    this.history.push(line);
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }
}


export default {
  /**
   * factory
   * @export
   * @param {String} name - the name of the logger to create or get
   * @return {Logger}
   */
  getLogger(name) {
    if (Loggers[name]) {
      return Loggers[name];
    }
    const logger = new Logger(name);
    Loggers[name] = logger;
    return Loggers[name];
  },
  disableAll() {
    Object.values(Loggers).map((logger) => logger.disable());
  },
  enableAll() {
    Object.values(Loggers).map((logger) => logger.enable());
  },
};

