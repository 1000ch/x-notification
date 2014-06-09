module.exports = function (grunt) {
  grunt.initConfig({
    jsvalidate: {
      options: {
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      all: {
        files: {
          src: ['<%=jshint.all%>']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.registerTask('test', ['jsvalidate']);
};