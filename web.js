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

var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});