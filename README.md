HTTP Test
=============
Simply library for testing HTTP services

Install:

    npm install httptest --save

Simply use:

    var httptest = requre('httptest');

    httptest('https://tutsplus.com')
        .get('/courses')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
        });

