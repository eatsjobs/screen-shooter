const Loggers = Object.create(null);
const {getOwnPropertyNames, defineProperty} = Object;
class Logger {
  constructor(name, enabled = true) {
    this.loggerPrefix = name;
    this.enabled = enabled;
    getOwnPropertyNames(console)
        .map((methodName) => {
          // generate and decorates functions. forwarding arguments to
          // 'console' object
          defineProperty(this, methodName, {
            value: function(...args) {
              if (!this.enabled) return;
              args.unshift(`(module: ${this.loggerPrefix})`);
              console[methodName](...args);
            },
            enumerable: true,
            configurable: false,
            writable: false,
          });
        });
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
     * @param {String} name - the name of the logger
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
    Object.values(Loggers).map((Logger) => Logger.disable());
  },
  enableAll() {
    Object.values(Loggers).map((logger) => logger.enable());
  },
};

