module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-concurrent');
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
        
        nodemon: {
            dev: {
                script: './dist/app.js'
            }
        },

        watch: {
            options: {
                atBegin: true,
                spawn: false
            },
            build: {
                files: ['src/**/*.*'],
                tasks: ['build']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            target: ['watch', 'nodemon']
        }

    });

    grunt.registerTask('build', ['tslint', 'ts']);

};
