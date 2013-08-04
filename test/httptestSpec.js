var httptest = require('..');

describe('HTTP Test', function(){

    it('should provide GET request', function(done){

        httptest('https://tutsplus.com')
            .get('/courses')
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
                done();
            });

    });

});