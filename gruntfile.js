/**
 * Still To-Do:
 *  [ ] Copy assets
 */
module.exports = function(grunt) {
  // Configure Grunt
  grunt.initConfig({
    // Package Variable
    pkg: grunt.file.readJSON('package.json'),

    // Compile Angular
    'angular-builder': {
      options: {
        externalModules: ['ngSanitize'],
        mainModule: 'ux.angular',
        releaseBuild: {
          moduleFooter: '\n'
        }
      },
      dist: {
        src: 'src/scripts/**/*.es6',
        dest: 'dist/<%= pkg.name %>.es6'
      }
    },

    // Compile ES6 to ES5
    babel: {
      options: {
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.js': 'dist/<%= pkg.name %>.es6'
        }
      }
    },

    // Remove unused files
    clean: {
      dist: ['dist/*'],
      temp: ['dist/*.es6']
    },

    // Minimize the CSS
    cssmin: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.css': 'dist/<%= pkg.name %>.css'
        }
      }
    },

    // Transform templateUrl to template in Angular
    ngtemplates: {
      dist: {
        options: {
          append: true,
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          },
          module: 'ux.angular',
          quotes: 'single',
          url: function(url) {
            return url
              .replace(/^src\/scripts\//, '')
              .replace(/\.html$/, '');
          }
        },
        src: ['src/scripts/**/*.html'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    // Minimize the Javascript
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': 'dist/<%= pkg.name %>.js'
        }
      }
    },

    // Compile SCSS to CSS
    sass: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.css': 'src/styles/<%= pkg.name %>.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'expanded',
          unixNewlines: true
        }
      }
    },

    // Watch for changes to src directory
    watch: {
      src: {
        files: ['src/**/*'],
        tasks: ['default']
      }
    }
  });

  // Load the NPM tasks
  grunt.loadNpmTasks('grunt-angular-builder');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define tasks
  grunt.registerTask('default', ['clean:dist', 'angular-builder:dist', 'babel:dist', 'ngtemplates:dist', 'uglify:dist', 'sass:dist', 'cssmin:dist', 'clean:temp']);
};
