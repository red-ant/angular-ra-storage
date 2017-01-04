module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-cookies/angular-cookies.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/angular-ra-storage.js',
      'test/angular-ra-storage.js'
    ],
    exclude: [],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    autoWatch: true,
    singleRun: true,
    captureTimeout: 60000
  });
};
