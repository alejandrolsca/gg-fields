var pkgjson = require('./package.json');
 
var config = {
  pkg: pkgjson,
  app: 'src',
  dist: 'dist',
  bower: 'bower_components'
}
 
module.exports = function (grunt) {
 
  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: {
          '<%= config.dist %>/js/lib.min.js': [
            '<%= bower.directory %>/angular/angular.js',
            '<%= config.app %>/gg-fields.js'
          ],
            '<%= config.app %>/gg-fields.min.js': [
            '<%= config.app %>/gg-fields.js'
          ]
        }
      }
    },
    copy: {
      dist: {
       files: [{
         expand: true,
         cwd: '<%= config.app %>',
         src: 'gg-fields.js',
         dest: '<%= config.dist %>/js'
       },{
         expand: true,
         cwd: '<%= config.app %>',
         src: 'gg-fields.min.js',
         dest: '<%= config.dist %>/js'
       },{
         expand: true,
         cwd: '<%= config.bower %>',
         src: 'angular/angular.min.js',
         dest: '<%= config.dist %>/js/'
       },{
         expand: true,
         cwd: '<%= config.bower %>',
         src: 'angular-bootstrap/ui-bootstrap.min.js',
         dest: '<%= config.dist %>/js/'
       },{
         expand: true,
         cwd: '<%= config.bower %>',
         src: 'angular-bootstrap/ui-bootstrap-tpls.min.js',
         dest: '<%= config.dist %>/js/'
       },{
         expand: true,
         cwd: '<%= config.bower %>',
         src: 'bootstrap/dist/css/bootstrap.min.css',
         dest: '<%= config.dist %>/css/'
       }]
      }
    },
  });
 
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
  grunt.registerTask('default', [
    'copy',
    'uglify'
  ]);
};