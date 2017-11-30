module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-tslint');

    grunt.initConfig({

        tslint: {
            options: {
                configuration: 'tslint.json',
                force: false,
                fix: false
            },
            build: {
                src: ['src/**/*.ts']
            }
        },

        ts: {
            options: {
                sourceMap: false
            },
            build: {
                tsconfig: true
            }
        },

        sass: {
            options: {
                sourcemap: 'none'
            },
            build: {
                files: [{
                    expand: true,
                    cwd: './src/public/styles',
                    src: ['./*.scss'],
                    dest: './build/public/styles/',
                    ext: '.css'
                }]
            }
        },

        copy: {
            build: {
                files: [
                    { expand: true, cwd: './src', src: ['./views/**/*.hbs'], dest: './build/', filter: 'isFile' }
                ]
            }
        },
        
        nodemon: {
            dev: {
                script: './build/app.js'
            }
        },

        watch: {
            options: {
                atBegin: true,
                spawn: false
            },
            build: {
                files: ['src/**/*.*'],
                tasks: ['default']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            target: ['watch', 'nodemon']
        }

    });

    grunt.registerTask('default', ['tslint', 'ts', 'sass', 'copy']);

};
