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

### Chaining

Every method will return a `httptest` object, so methods can be chained.

### httptest(uri)

Create request or group of request object and specify the base `uri`.

```js
httptest('http://localhost:3000/')
```

### .post(uri)

Set `POST` method of request.

```js
httptest('http://localhost:3000/')
    .post('/api/1.0/cars')
```

### .get(uri)

Set `GET` method of request.

```js
httptest('http://localhost:3000/')
    .get('/api/1.0/cars')
```

### .head(uri)

Set `HEAD` method of request.

```js
httptest('http://localhost:3000/')
    .head('/api/1.0/cars/123')
```

### .put(uri)

Set `PUT` method of request.

```js
httptest('http://localhost:3000/')
    .put('/api/1.0/cars/123')
```

### .patch(uri)

Set `PATCH` method of request.

```js
httptest('http://localhost:3000/')
    .patch('/api/1.0/cars/123')
```

### .del(uri)

Set `DELETE` method of request.

```js
httptest('http://localhost:3000/')
    .del('/api/1.0/cars/123')
```

### .setParam(param[, value])

Set `GET` params of request. 

```js
// As object
httptest('http://localhost:3000/');
    .get('/api/1.0/cars')
    .setParam({sort: 'asc'})

// As key-value
httptest('http://localhost:3000/')
    .get('/api/1.0/cars')
    .setParam('sort', 'asc')
    
// Result
http://localhost:3000/api/1.0/cars?sort=asc
```

### .setBody(body)

Set `POST`, `PUT`, `PATCH` request body

```js
// As object
httptest('http://localhost:3000/')
    .post('/api/1.0/cars')
    .setBody({vendor: 'BMW', model: 'M5'})
```

### .setHeader(header[, value])

Set headers of request.

```js
// As object
httptest('http://localhost:3000/')
    .setHeader({'User-Agent': 'Firefox'})

// As key-value
httptest('http://localhost:3000/')
    .setHeader('User-Agent', 'Firefox')
```

### .expectStatus(status)

Check status code of response.

```js
httptest('http://localhost:3000/')
    .get('/api/1.0/cars')
    .expectStatus(200)
```

### .expectJSON()

Check type of response and if it correct - parse JSON to JavaScript object. This will in `res` parameter in `.end(fn)`.

```js
httptest('http://localhost:3000/')
    .get('/api/1.0/cars')
    .expectJSON()
```

### .end(fn)

Perform request with given options. Invoke function(err, res) {}.

```js
httptest('http://localhost:3000/')
    .get('/api/1.0/cars')
    .end(function(err, res) {
        if (err) throw err;
        console.log(res);
    );
```

## Workflow

Possible to create a common options for a group of requests

```js
var httptest = require('httptest');

// Common options
var http = httptest('http://localhost:3000/')
    .setHeader('User-Agent', 'Firefox')
    .setParam('token', 'secret_key')
    .setParam('userId', '100')
    .expectStatus(200)
    .expectJSON();
    
// Test 1
http.get('/api/cars')
    .setParam('limit', 10)
    .end(function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    
// Test 2
http.get('/api/cars/123')
    .setParam('userId', '100')  // Override base options
    .setParam('fields', 'vendor')
    .end(function(err, res) {
        if (err) throw err;
        console.log(res);
    });
    
// Test 3
http.get('/api/cars/456')
    .setParam('fields', 'model')
    .end(function(err, res) {
        if (err) throw err;
        console.log(res);
    });
```

## Package manager page

[![NPM](https://nodei.co/npm/httptest.png?downloads=true)](https://nodei.co/npm/httptest/)

Direct link [npm]

[npm]: https://npmjs.org/package/httptest
