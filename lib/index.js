'use strict';

var request = require('request'),
    assert = require('assert'),
    http = require('http'),
    ld = require('lodash');

var helper = require('./helper.js');

/**
 * Base HttpTest
 * @param {string} [baseUri]
 * @constructor
 */
var HttpTest = function(baseUri) {
    this.option = {
        common: helper.getCommonOptions(baseUri),
        current: null
    };
    this.expect = {
        common: {},
        current: null
    };
};

/**
 * Set HTTP GET param
 * @param {string|object} param
 * @param {string} [value]
 * @returns {HttpTest}
 */
HttpTest.prototype.setParams = function(param, value) {

    var data = {};

    if (typeof param === 'string' && typeof value === 'string') {
        data[param] = value;
    } else if (typeof param === 'object') {
        data = param;
    } else {
        return this;
    }

    if (this.option.current) {
        this.option.current.params = ld.extend(this.option.current.params, data);
    } else {
        this.option.common.params = ld.extend(this.option.common.params, data);
    }

    return this;
};

/**
 * Set HTTP headers
 * @param header
 * @param value
 * @returns {HttpTest}
 */
HttpTest.prototype.setHeaders = function(header, value) {
    var data = {};

    if (typeof header === 'string' && typeof value === 'string') {
        data[header] = value;
    } else if (typeof header === 'object') {
        data = header;
    } else {
        return this;
    }

    this.option.common.headers = ld.extend(this.option.common.headers, data);

    return this;
};

/**
 * Set body for POST, PUT, PATCH
 * @param body
 * @returns {HttpTest}
 */
HttpTest.prototype.setBody = function(body) {

    if (typeof body === 'string') {
        this.option.common.body = body;
    } else if (typeof body === 'object') {
        this.option.common.form = body;
    }

    return this;
};

/**
 * GET
 * @param {string} [uri]
 * @returns {HttpTest}
 */
HttpTest.prototype.get = function(uri) {
    this.option.current = helper.getCurrentOptions(uri, 'GET');
    this.expect.current = {};
    return this;
};

/**
 * POST
 * @param uri
 * @returns {HttpTest}
 */
HttpTest.prototype.post = function(uri) {
    this.option.current = helper.getCurrentOptions(uri, 'POST');
    this.expect.current = {};
    return this;
};

/**
 * PUT
 * @param uri
 * @returns {HttpTest}
 */
HttpTest.prototype.put = function(uri) {
    this.option.current = helper.getCurrentOptions(uri, 'PUT');
    this.expect.current = {};
    return this;
};

/**
 *
 * @param uri
 * @returns {HttpTest}
 */
HttpTest.prototype.patch = function(uri) {
    this.option.current = helper.getCurrentOptions(uri, 'PATCH');
    this.expect.current = {};
    return this;
};

/**
 *
 * @param uri
 * @returns {HttpTest}
 */
HttpTest.prototype.head = function(uri) {
    this.option.current = helper.getCurrentOptions(uri, 'HEAD');
    this.expect.current = {};
    return this;
};

/**
 *
 * @param uri
 * @returns {HttpTest}
 */
HttpTest.prototype.delete = function(uri) {
    this.option.current = helper.getCurrentOptions(uri, 'DELETE');
    this.expect.current = {};
    return this;
};

/**
 * Expected HTTP status
 * @param status
 */
HttpTest.prototype.expectStatus = function(status) {
    if (this.expect.current) {
        this.expect.current.status = status;
    } else {
        this.expect.common.status = status;
    }

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
    if (this.expect.current) {
        this.expect.current.type = 'json';
    } else {
        this.expect.common.type = 'json';
    }

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

/**
 * Aliases
 */
HttpTest.prototype.setHeader = HttpTest.prototype.setHeaders;
HttpTest.prototype.setParam = HttpTest.prototype.setParams;
HttpTest.prototype.setQuery = HttpTest.prototype.setParams;
HttpTest.prototype.del = HttpTest.prototype.delete;

// Deprecated
HttpTest.prototype.headers = HttpTest.prototype.setHeader;
HttpTest.prototype.expect = HttpTest.prototype.expectStatus;
HttpTest.prototype.set = HttpTest.prototype.setParam;


module.exports = function(baseUri) {
    return new HttpTest(baseUri);
};
