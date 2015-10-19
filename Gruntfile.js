module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    sourceMap: false,
                    cleancss: false
                },
                files: {
                    './css/styles.css': ['./less/main.less']
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            less: {
                files: ['**/*.less'],
                tasks: ['less']
            },
            js: {
                files: ['./js/*.js']
            },
            html: {
                files: ['**/*.html']
            }
        },
        connect: {
            server: {
                options: {
                    port: 9002,
                    base: './',
                    hostname: 'localhost'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);
    grunt.registerTask('serve', ['less', 'connect', 'watch']);


};
