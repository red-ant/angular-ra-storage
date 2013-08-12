'use strict';

module.exports = function(grunt) {
  // Load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'src/{,*/}*.js',
        'test/{,*/}*.js',
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: false
      }
    }
  });
};
