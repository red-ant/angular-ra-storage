/* global require */
(function() {
  'use strict';

  module.exports = function(grunt) {
    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
      dist: 'dist',

      clean: {
        dist: ['angular-ra-storage.js', 'angular-ra-storage.min.js']
      },

      concat: {
        dist: {
          src:  ['src/angular-ra-storage.js'],
          dest: 'angular-ra-storage.js'
        }
      },

      uglify: {
        dist: {
          src:  ['src/angular-ra-storage.js'],
          dest: 'angular-ra-storage.min.js'
        }
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          'src/{,*/}*.js',
          'test/{,*/}*.js',
        ]
      },

      karma: {
        dev: {
          configFile: 'karma.conf.js',
          singleRun: false
        },

        dist: {
          configFile: 'karma.conf.js'
        }
      },

      bump: {
        options: {
          files:       ['package.json'],
          commitFiles: ['package.json'],
          pushTo:      'origin'
        }
      }
    });

    grunt.registerTask('test', 'karma:dev');
    grunt.registerTask('build', ['jshint:all', 'karma:dist', 'clean', 'concat:dist', 'uglify:dist']);
  };
})();
