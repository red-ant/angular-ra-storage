// Karma configuration
// Generated on %DATE%

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/ra-storage.js',
      'test/ra-storage.js'
    ],

    exclude: [],

    port: 9876,

    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ['progress'],

    browsers: ['Chrome'],

    autoWatch: true,
    singleRun: true,
    captureTimeout: 60000
  });
};
