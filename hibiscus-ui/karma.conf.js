'use strict';

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/main/webfrontend/components/angular/angular.js',
      'src/main/webfrontend/components/angular-mocks/angular-mocks.js',
      'src/main/webfrontend/scripts/**/*.js',
      'src/test/javascript/unit/mock/**/*.js',
      'src/test/javascript/unit/spec/**/**/**/*.js'
    ],
    logLevel: config.LOG_INFO
  });
};
