/**
 * Created by tamary on 02/05/14.
 */
var express = require('express');
var app = express();
app.get('/hello.txt', function(req, res){
    res.send('Hello World');
});

app.get('/add/:res', function(req, res){
    console.log('userAgent: ' + req.headers['user-agent']);
    console.log(req.param('res'));
    req.param('name')
    res.send('added');


});


var server = app.listen(80, function() {
    console.log('Listening on port %d', server.address().port);
});