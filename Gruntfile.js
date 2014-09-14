/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    qunit: {
      all: ['test/index.html'],
      options: {
        timeout: 3000,
        coverage: {
          src: ['src/tree.js']
        }
      }
    },
    jshint: {
      files: {
          src: ['src/*.js'],
          tests: ['test/suites/**/*.js']
      },
      options: {
        boss: true,
        browser: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        forin: true,
        immed: true,
        indent: 0,
        latedef: true,
        maxcomplexity: 10,
        newcap: true,
        noarg: true,
        quotmark: 'single',
//        reporter: 'checkstyle',
//        reporterOutput: 'report/jshint.xml',
        sub: true,
        trailing: true,
//        undef: true,
//        unused: true,
        globals: {
          QUnit: true,
          define: true
        }
      }
    },
    uglify: {}
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('test', ['qunit', 'jshint']);
  grunt.registerTask('default', ['test']);
};
