var express = require('express');

var app = express();

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req, res){
    res.send('get-main');
});

app.get('/test', function(req, res){
    res.send('get-test');
});

app.listen(3000);
console.log('Listening on port 3000');