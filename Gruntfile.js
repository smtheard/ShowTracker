module.exports = function(grunt) {
  grunt.initConfig({
    "install-dependencies": {
      options: {
        isDevelopment: true
      }
    },
    exec: {
      coverage: 'node "node_modules/istanbul/lib/cli.js" cover "node_modules/nodeunit/bin/nodeunit" -- test',
      nodeunit: 'nodeunit'
    }
  });

  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-install-dependencies');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('coverage', 'exec:coverage');
  grunt.registerTask('nodeunitRun', 'exec:nodeunit');
  grunt.registerTask('default', ['install-dependencies', 'nodeunitRun', 'coverage']);
}