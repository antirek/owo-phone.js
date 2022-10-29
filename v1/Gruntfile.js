module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  nodewebkit: {
    options: {
        platforms: ['win','linux64'],
        buildDir: './builds', // Where the build version of my node-webkit app is saved
    },
    src: ['./*','./includes/*', './lib/*']
    },
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('default', ['nodewebkit']);

};