module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochacli: {
      options: {
        timeout: 5000
      },
      base: ['test/base.js']
    },
  });

  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('test', ['mochacli:base']);
  grunt.registerTask('test:base', ['mochacli:base']);

};
