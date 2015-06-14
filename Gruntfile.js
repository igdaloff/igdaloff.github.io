module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      compass: {
        files: "scss/**/*.scss",
        tasks: "compass:dist",
        options: {
          interrupt: true
        }
      },
      concat_app: {
        files: "_js/**/*",
        tasks: "concat:app"
      },
      concat_vendor: {
        files: "_js/**/*",
        tasks: "concat:vendor"
      }
    },
    compass: {
      dist: {
        options: {
          sassDir: 'scss/',
          cssDir: 'css/',
          imagesDir: 'images/',
          outputStyle: 'compressed'
        }
      }
    },
    concat: {
      vendor: {
        src: [
          "_js/lib/modernizr/modernizr.js",
          "_js/lib/jquery/jquery.js"
          ],
        dest: "js/vendors.js"
      },
      app: {
        src: "_js/app.js",
        dest: "js/app.js"
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/app.min.js': ['_js/app.js'],
          'js/vendors.min.js': ['js/vendors.js']
        }
      }
    }
  });


  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("build", ["concat:vendor", "concat:app", "compass:dist", "uglify"]);
};