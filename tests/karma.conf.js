// karma.conf.js
module.exports = function(config){
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'assets/validaciones.js', watched: true },
      { pattern: 'assets/logic.js', watched: true },
      { pattern: 'spec/**/*.spec.js', watched: true }
    ],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};
