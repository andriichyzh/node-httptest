
'use strict';

var request = require('request'),
    assert = require('assert'),
    http = require('http'),
    url = require('url'),
    _ = require('lodash');

/**
 * Base HttpTest
 * @param baseUri
 * @constructor
 */
var HttpTest = function(baseUri) {
    this._common = getOptions(baseUri);
    this._current = null;
    this._expect = null;
};

/**
 * Set HTTP GET param
 * @param {string|object} param
 * @param {string} [value]
 * @returns {HttpTest}
 */
HttpTest.prototype.setParam = function(param, value) {

    var data = {};

    if (typeof param === 'string' && typeof value === 'string') {
        data[param] = value;
    } else if (typeof param === 'object') {
        data = param;
    } else {
        return this;
    }

    if (this._current && this._current.params) {
        this._current.params = _.extend(this._current.params, data);
    } else {
        this._common.params = _.extend(this._common.params, data);
    }

    return this;
};

/**
 * Set body for POST, PUT, PATCH
 * @param body
 * @returns {HttpTest}
 */
HttpTest.prototype.setBody = function(body) {

    if (typeof body === 'string') {
        this._current.body = body;
    } else if (typeof body === 'object') {
        this._current.form = body;
    }

    return this;
};

/**
 * Set HTTP headers
 * @param header
 * @param value
 * @returns {HttpTest}
 */
HttpTest.prototype.setHeader = function(header, value) {
    var data = {};

    if (typeof header === 'string' && typeof value === 'string') {
        data[header] = value;
    } else if (typeof header === 'object') {
        data = header;
    } else {
        return this;
    }

    if (this._current && this._current.headers) {
        this._current.headers = _.extend(this._current.headers, data);
    } else {
        this._common.headers = _.extend(this._common.headers, data);
    }
    return this;
};

HttpTest.prototype.get = function(uri) {
    this._current = getOptions(uri, 'GET');
    this._expect = {};
    return this;
};

HttpTest.prototype.post = function(uri) {
    this._current = getOptions(uri, 'POST');
    this._expect = {};
    return this;
};

HttpTest.prototype.put = function(uri) {
    this._current = getOptions(uri, 'PUT');
    this._expect = {};
    return this;
};

HttpTest.prototype.del = function(uri) {
    this._current = getOptions(uri, 'DELETE');
    this._expect = {};
    return this;
};

HttpTest.prototype.patch = function(uri) {
    this._current = getOptions(uri, 'PATCH');
    this._expect = {};
    return this;
};

HttpTest.prototype.head = function(uri) {
    this._current = getOptions(uri, 'HEAD');
    this._expect = {};
    return this;
};

/**
 * Expected HTTP status
 * @param status
 */
HttpTest.prototype.expectStatus = function(status) {
    this._expect.status = status;
    return this;
};

/**
 * Expected HTTP headers
 * @param header
 * @param value
 */
HttpTest.prototype.expectHeader = function(header, value) {
    this._expect.headers = '';
    return this;
};

/**
 * Expected JSON response
 */
HttpTest.prototype.expectJSON = function() {
    this._expect.type = 'json';
    return this;
};

/**
 * Provide HTTP request
 * @param callback
 */
HttpTest.prototype.end = function(callback) {

    var expect = this._expect,
        options = {
        url: this._common.uri.replace(/\/$/, '') + '/' + this._current.uri.replace(/^\//, ''),
        method: this._current.method,
        headers: _.defaults(this._current.headers, this._common.headers)
    };

    if (this._current.method === 'GET') {
        options.qs = _.defaults(this._current.params, this._common.params);
    }

    if (this._current.form) {
        options.form = this._current.form;
    } else if (this._current.body) {
        options.body = this._current.body;
    }

    this._current = null;
    this._expect = null;

    request(options, function(error, response, body) {

        if (expect.status) {
            var errMsg = 'Error response status code! Actual: ' + response.statusCode + ', expect: ' + expect.status;
            assert.equal(response.statusCode, expect.status, errMsg);
        }

        if (expect.type === 'json') {
            body = JSON.parse(body);
        }

        callback(error, body);
    });

    return this;
};

// Deprecated
HttpTest.prototype.headers = function(key, val) {
    return this;
};

HttpTest.prototype.expect = function(status) {
    this._expect.status = status;
    return this;
};

HttpTest.prototype.set = function(key, val) {
    return this;
};

/**
 *
 * @param uri
 * @param [method]
 * @returns {object}
 */
function getOptions(uri, method) {
    return {
        uri: uri || '',
        method: method || '',
        params: {},
        headers: {'User-Agent': 'HttpTest'},
        body: '',
        isDebug: false
    };
}

module.exports = function(baseUri) {
    return new HttpTest(baseUri);
};
