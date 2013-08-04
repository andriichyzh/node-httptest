HTTP Test [![Build Status](https://travis-ci.org/andreychizh/node-httptest.png?branch=master)](https://travis-ci.org/andreychizh/node-httptest)
=============
Simply library for testing HTTP services

Install:

    npm install httptest --save

Simply use:

    var httptest = require('httptest');

    httptest('https://tutsplus.com')
        .get('/courses')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });

