
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
    this.option = {
        common: getOptions(baseUri),
        current: null
    };

    this.expect = {
        common: null,
        current: null
    };
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

    if (this.option.current.params) {
        this.option.current.params = _.extend(this.option.current.params, data);
    } else {
        this.option.current.params = _.extend(this.option.common.params, data);
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
        this.option.current.body = body;
    } else if (typeof body === 'object') {
        this.option.current.form = body;
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

    if (this.option.current.headers) {
        this.option.current.headers = _.extend(this.option.current.headers, data);
    } else {
        this.option.common.headers = _.extend(this.option.common.headers, data);
    }
    return this;
};

/**
 * HTTP methods block
 */

HttpTest.prototype.get = function(uri) {
    this.option.current = getOptions(uri, 'GET');
    this._expect = {};
    return this;
};

HttpTest.prototype.post = function(uri) {
    this.option.current = getOptions(uri, 'POST');
    this._expect = {};
    return this;
};

HttpTest.prototype.put = function(uri) {
    this.option.current = getOptions(uri, 'PUT');
    this._expect = {};
    return this;
};

HttpTest.prototype.patch = function(uri) {
    this.option.current = getOptions(uri, 'PATCH');
    this._expect = {};
    return this;
};

HttpTest.prototype.head = function(uri) {
    this.option.current = getOptions(uri, 'HEAD');
    this._expect = {};
    return this;
};

HttpTest.prototype.del = function(uri) {
    this.option.current = getOptions(uri, 'DELETE');
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
        url: this.commonOption.uri.replace(/\/$/, '') + '/' + this.currentOption.uri.replace(/^\//, ''),
        method: this.currentOption.method,
        headers: _.defaults(this.currentOption.headers, this.commonOption.headers)
    };

    if (this.currentOption.method === 'GET') {
        options.qs = _.defaults(this.currentOption.params, this.commonOption.params);
    }

    if (this.currentOption.form) {
        options.form = this.currentOption.form;
    } else if (this.currentOption.body) {
        options.body = this.currentOption.body;
    }

    this.currentOption = null;
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
 * Aliases
 */
HttpTest.prototype.delete = HttpTest.prototype.del;
HttpTest.prototype.setParams = HttpTest.prototype.setParam;
HttpTest.prototype.setHeaders = HttpTest.prototype.setHeader;

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
