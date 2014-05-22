
var httptest = require('./../lib/index');


var http = httptest('https://api.github.com/repos/andreychizh/');

console.log(http);


//http.setHeader('User-Agent', 'Firefox 29');
//
//http.get('/node-httptest')
//    .setParam({query: 'testing', sort: 'asc'})
//    .setHeader('Cache-Control', 'max-age=0')
//    .expectStatus(200)
//    .expectJSON()
//    .end(function(err, res) {
//        if (err) throw err;
//        console.log(res);
//    });

//http.get('/node-shortlink')
//    .setParam({query: 'testing', sort: 'asc'})
//    .setHeader('User-Agent', 'Firefox')
//    .expectStatus(200)
//    //.expectJSON()
//    .end(function(err, res) {
//        if (err) throw err;
//        console.log(res);
//    });



//var http = httptest('https://api.github.com/');

//http.setParam('token', 'avid');
//http.setParam('assetId', '999');
//http.setHeader('User-Agent', 'Firefox');

//httptest('https://api.github.com/repos/andreychizh/')
//    .get('/node-httptest')
////    .setParam('userId', '123')
////    .setParam('assetId', '456')
//    .end(function(err, res) {
//        console.log(res);
//    });

//http.get('/courses/abc')
//    .setParam('userId', '987')
//    .setParam('list', 'true')
//    .end(function(err, res) {
//        console.log(res);
//    });
//
//http.post('/courses/git')
//    .setParam('userId', '678')
//    .setParam('assetId', '777')
//    .end(function(err, res) {
//        console.log(res);
//    });

