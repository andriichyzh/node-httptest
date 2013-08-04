
module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({

        express: {
            options: {
                script: 'test/httptestServer.js'
            },

            test: {
                options: {
                    node_env: 'test'
                }
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    ui: 'bdd'
                },

                src: [
                    'test/*Spec.js'
                ]
            }
        }
    });

    grunt.registerTask('test', [ 'express:test', 'mochaTest']);
};
