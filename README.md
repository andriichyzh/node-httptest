node-httptest
=============


    npm install httptest


    var httptest = requre('httptest');

    httptest('http://google.com')
        .get()
        .end(function(err, res) {
            if (err) throw err;
        });