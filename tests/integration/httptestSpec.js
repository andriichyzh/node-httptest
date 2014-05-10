var httptest = require('../../lib/index');

describe('HTTP Test', function(){

    var baseUri = 'http://localhost:3000';

    it('should provide GET request (/)', function(done){

        httptest(baseUri)
            .get('/')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });

    });

    it('should provide GET request (/test)', function(done){

        httptest(baseUri)
            .get('/test')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });

    });

});