/* global require */
(function() {
  'use strict';

  module.exports = function(grunt) {
    // Load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
      dist: 'dist',

      clean: {
        dist: ['<%= dist %>']
      },

      concat: {
        dist: {
          src:  ['src/ra-storage.js'],
          dest: '<%= dist %>/ra-storage.js'
        }
      },

      uglify: {
        dist: {
          src:  ['src/ra-storage.js'],
          dest: '<%= dist %>/ra-storage.min.js'
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
      }
    });

    grunt.registerTask('test', 'karma:unit');
    grunt.registerTask('build', ['jshint:all', 'karma:dist', 'clean', 'concat:dist', 'uglify:dist']);
  };
})();
