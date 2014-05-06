HTTP Test [![Build Status](https://travis-ci.org/andreychizh/node-httptest.png?branch=master)](https://travis-ci.org/andreychizh/node-httptest)
=============
Simply library for testing HTTP services

## Install:

    npm install httptest --save

## Example:

    var httptest = require('httptest');

    httptest('https://api.github.com/repos/andreychizh/')
        .get('/node-httptest')
        .setHeader('User-Agent', 'Firefox');
        .expectStatus(200)
        .expectJSON()
        .end(function(err, res) {
            if (err) throw err;
            console.log(res);
        });

## API:

### Create new test or tests group

    httptest(uri)

### HTTP methods

Support all HTTP methods: GET, POST, PUT, PATCH, HEAD, DELETE

### Set GET params

    // As object
    setParam({sort: 'asc'})

    // As key-value
    setParam('sort', 'asc')


### Set POST, PUT, PATCH body

    // As object
    setHeader({'User-Agent': 'Firefox'})

    // As key-value
    setHeader('User-Agent', 'Firefox')


## Package manager page

[![NPM](https://nodei.co/npm/httptest.png?downloads=true)](https://nodei.co/npm/httptest/)

Direct link [npm]

[npm]: https://npmjs.org/package/httptest
