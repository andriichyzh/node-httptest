HTTP Test [![Build Status](https://travis-ci.org/andreychizh/node-httptest.svg?branch=master)](https://travis-ci.org/andreychizh/node-httptest)
=============
Simply library for powerful and easy testing REST API

## Install:
```bash
$ npm install httptest --save-dev
```

## Example:
```js
var httptest = require('httptest');

httptest('https://api.github.com/repos/andreychizh/')
    .get('/node-httptest')
    .setParams('version', 123)
    .setHeader('User-Agent', 'Firefox');
    .expectStatus(200)
    .expectJSON()
    .end(function(err, res) {
        if (err) throw err;
        console.log(res);
    });
```
## API:

### Create request or group of request object
```js
var http = httptest('localhost:3000');
```

### Set HTTP method

Support most HTTP methods:
```js
// POST
post('/api/1.0/cars')

// GET
get('/api/1.0/cars')

// HEAD
head('/api/1.0/cars/123')

// PUT
put('/api/1.0/cars/123')

// PATCH
patch('/api/1.0/cars/123')

// DELETE
del('/api/1.0/cars/123')
```

### Set GET params
```js
// As object
setParam({sort: 'asc'})

// As key-value
setParam('sort', 'asc')
```

### Set POST, PUT, PATCH body
```js
// As object
setBody({vendor: 'BMW', model: 'M5'})

// As string
setBody('')
```

### Set headers
```js
// As object
setHeader({'User-Agent': 'Firefox'})

// As key-value
setHeader('User-Agent', 'Firefox')
```

## Package manager page

[![NPM](https://nodei.co/npm/httptest.png?downloads=true)](https://nodei.co/npm/httptest/)

Direct link [npm]

[npm]: https://npmjs.org/package/httptest
