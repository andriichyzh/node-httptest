var request = require('request'),
    assert = require('assert');

module.exports = function(baseUri) {
    'use strict';

    var params = {
        uri: baseUri || '',
        method: 'GET'
    };

    var expects = {};

    return {
        post: function(uri) {
            if (uri) {
                params.uri += uri;
            }
            params.method = 'POST';
            return this;
        },

        get: function(uri) {
            if (uri) {
                params.uri += uri;
            }
            params.method = 'GET';
            return this;
        },

        put: function(uri) {
            if (uri) {
                params.uri += uri;
            }
            params.method = 'PUT';
            return this;
        },

        del: function(uri) {
            if (uri) {
                params.uri += uri;
            }
            params.method = 'DELETE';
            return this;
        },

        body: function(body) {
            if (body) {
                params.body = (und.isObject(body)) ? JSON.stringify(body) : body;
            }
            return this;
        },

        headers: function(headers) {
            if (headers) {
                params.headers = und.extend(params.headers, headers);
            }
            return this;
        },

        expect: function(status) {
            if (status) {
                expects.status = status;
            }
            return this;
        },

        end: function(callback) {

            request(params, function(error, response, body) {
                if (error) {
                    callback(error, null);
                    return;
                }

                if (expects.status) {
                    assert.equal(response.statusCode, expects.status, 'Error response status code!');
                }

                if (1) {
                    var res = JSON.parse(body);
                } else {
                    var res = body;
                }

                callback(error, res);
            });

        }
    };
}
