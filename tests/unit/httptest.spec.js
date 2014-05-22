var should = require('should');

var httptest = require('../../lib');

describe('httptest', function() {

    var testUri = 'http://test.com/';

    describe('method', function() {

        it('should return object (without set URI)', function() {
            var http = httptest();
            http.should.be.type('object');
        });

        it('should return object (set URI as empty string)', function() {
            var http = httptest('');
            http.should.be.type('object');
        });

        it('should return object (set correct URI)', function() {
            var http = httptest(testUri);
            http.should.be.type('object');
        });

        it('should set URI in common options', function() {
            var http = httptest(testUri);
            http.option.common.uri.should.equal(testUri);
        });

    });

    describe('#setParams()', function() {

        it('should set common params (key-value)', function() {
            var http = httptest(testUri)
                .setParams('test', '123');

            http.option.common.params.should.property('test', '123');
        });

        it('should set common params (key-value 3 times)', function() {
            var http = httptest(testUri)
                .setParams('test', '123')
                .setParams('user', 'John')
                .setParams('sort', 'asc');

            http.option.common.params.should.property('test', '123');
            http.option.common.params.should.property('user', 'John');
            http.option.common.params.should.property('sort', 'asc');
        });

        it('should set common params (object with 1 para)', function() {
            var http = httptest(testUri)
                .setParams({ test: '123' });

            http.option.common.params.should.property('test', '123');
        });

        it('should set common params (object with many params)', function() {
            var http = httptest(testUri)
                .setParams({
                    test: '123',
                    user: 'John',
                    sort: 'asc'
                });

            http.option.common.params.should.property('test', '123');
            http.option.common.params.should.property('user', 'John');
            http.option.common.params.should.property('sort', 'asc');
        });

        it('should set current params (key-value)', function() {
            var http = httptest(testUri)
                .get()
                .setParams('test', '123');

            http.option.current.params.should.property('test', '123');
        });

        it('should set current params (key-value 3 times)', function() {
            var http = httptest(testUri)
                .get()
                .setParams('test', '123')
                .setParams('user', 'John')
                .setParams('sort', 'asc');

            http.option.current.params.should.property('test', '123');
            http.option.current.params.should.property('user', 'John');
            http.option.current.params.should.property('sort', 'asc');
        });

        it('should set current params (object with 1 param)', function() {
            var http = httptest(testUri)
                .get()
                .setParams({ test: '123' });

            http.option.current.params.should.property('test', '123');
        });

        it('should set current params (object with many params)', function() {
            var http = httptest(testUri)
                .get()
                .setParams({
                    test: '123',
                    user: 'John',
                    sort: 'asc'
                });

            http.option.current.params.should.property('test', '123');
            http.option.current.params.should.property('user', 'John');
            http.option.current.params.should.property('sort', 'asc');
        });

    });

    describe('#setHeaders()', function() {

        it('should set common headers (key-value)', function() {
            var http = httptest(testUri)
                .setHeaders('Content-Type', 'text/html');

            http.option.common.headers.should.property('Content-Type', 'text/html');
        });

        it('should set common headers (object with 1 param)', function() {
            var http = httptest(testUri)
                .setHeaders({'Content-Type': 'text/html'});

            http.option.common.headers.should.property('Content-Type', 'text/html');
        });

        it('should set common headers (object with many params)', function() {
            var http = httptest(testUri)
                .setHeaders({
                    'Content-Type': 'text/html',
                    'Cache-Control': 'max-age=0',
                    'Transfer-Encoding': 'chunked'
                });

            http.option.common.headers.should.property('Content-Type', 'text/html');
            http.option.common.headers.should.property('Cache-Control', 'max-age=0');
            http.option.common.headers.should.property('Transfer-Encoding', 'chunked');
        });

    });

    describe('#setBody()', function() {

        it('should set common body (string)', function() {
            var http = httptest(testUri)
                .setBody('test body data');

            http.option.common.body.should.equal('test body data');
        });

        it('should set common body (object with 1 param)', function() {
            var http = httptest(testUri)
                .setBody({'user': 'admin'});

            http.option.common.form.should.property('user', 'admin');
        });

        it('should set common body (object with many params)', function() {
            var http = httptest(testUri)
                .setBody({
                    'user': 'admin',
                    'pass': '123abc',
                    'lang': 'UA'
                });

            http.option.common.form.should.property('user', 'admin');
            http.option.common.form.should.property('pass', '123abc');
            http.option.common.form.should.property('lang', 'UA');
        });

    });

    describe('#expectStatus()', function() {

        it('should set common expect status code value', function() {
            var http = httptest(testUri)
                .expectStatus(200);

            http.expect.common.status.should.equal(200);
        });

        it('should set current expect status code value', function() {
            var http = httptest(testUri)
                .get()
                .expectStatus(200);

            http.expect.current.status.should.equal(200);
        });

    });

    describe('#expectJSON()', function() {

        it('should set common expect type JSON value', function() {
            var http = httptest(testUri)
                .expectJSON();

            http.expect.common.type.should.equal('json');
        });

        it('should set current expect type JSON value', function() {
            var http = httptest(testUri)
                .get()
                .expectJSON();

            http.expect.current.type.should.equal('json');
        });

    });

    describe('#get()', function() {

        it('should set current GET method', function() {
            var http = httptest(testUri)
                .get('/test');

            http.option.current.method.should.equal('GET');
        });

        it('should set current URI part', function() {
            var http = httptest(testUri)
                .get('/test');

            http.option.current.uri.should.equal('/test');
        });

    });

    describe('#post()', function() {

        it('should set current POST method', function() {
            var http = httptest(testUri)
                .post('/test');

            http.option.current.method.should.equal('POST');
        });

        it('should set current URI part', function() {
            var http = httptest(testUri)
                .post('/test');

            http.option.current.uri.should.equal('/test');
        });

    });

    describe('#put()', function() {

        it('should set current PUT method', function() {
            var http = httptest(testUri)
                .put('/test');

            http.option.current.method.should.equal('PUT');
        });

        it('should set current URI part', function() {
            var http = httptest(testUri)
                .put('/test');

            http.option.current.uri.should.equal('/test');
        });

    });

    describe('#patch()', function() {

        it('should set current PATCH method', function() {
            var http = httptest(testUri)
                .patch('/test');

            http.option.current.method.should.equal('PATCH');
        });

        it('should set current URI part', function() {
            var http = httptest(testUri)
                .patch('/test');

            http.option.current.uri.should.equal('/test');
        });

    });


    describe('#head()', function() {

        it('should set current HEAD method', function() {
            var http = httptest(testUri)
                .head('/test');

            http.option.current.method.should.equal('HEAD');
        });

        it('should set current URI part', function() {
            var http = httptest(testUri)
                .head('/test');

            http.option.current.uri.should.equal('/test');
        });

    });

    describe('#delete()', function() {

        it('should set current DELETE method', function() {
            var http = httptest(testUri)
                .delete('/test');

            http.option.current.method.should.equal('DELETE');
        });

        it('should set current URI part', function() {
            var http = httptest(testUri)
                .delete('/test');

            http.option.current.uri.should.equal('/test');
        });

    });

});
