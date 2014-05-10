var should = require('should');

var httptest = require('../../lib');

describe('httptest', function () {
    describe('method', function () {
        it('should return object', function () {
            var http = httptest('http://test.com/');
            http.should.be.type('object');
            //console.log(http);
        });
    });
});
