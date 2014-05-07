/**
 * Created by tamary on 02/05/14.
 */
var express = require('express');

var pg = require('pg');
var DATABASE_URL = "postgres://mfayyxxtnqmcfv:O0MGIG-aFROUMgEPwjOQUddvl-@ec2-54-243-42-236.compute-1.amazonaws.com:5432/da9dmthqsqhpc7"


var app = express();
app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/add/:res', function(req, res){
    console.log('userAgent: ' + req.headers['user-agent']);
    console.log(req.param('res'));
    var now = new Date();
    var date = now.format("dd/M/yy h:mm tt");
    var agent = req.headers['user-agent'];

    pg.connect(process.env.DATABASE_URL, function(err, client) {
        var query = client.query('INSERT INTO pg_equipment(agent, time, date) VALUES($1,$2,$3)', [agent, req.param('res'), date]);
        client.end();
        query.on('end', function() {
            res.send('record added');
        });
    });
});

app.get('/res', function(req, res){
        pg.connect(process.env.DATABASE_URL, function(err, client) {
        var query = client.query('SELECT * FROM pg_equipment');
        query.on('row', function(result) {
            console.log(result);
        });
        query.on('end', function(result) {
            res.send(result.rowCount + ' rows were received');
        });
    });
});


//app.get('/install', function(req, res){
//    pg.connect(process.env.DATABASE_URL, function(err, client) {
//
//        var query = client.query('CREATE TABLE sets ( \
//                agent varchar(400) PRIMARY KEY,\
//                number int \
//            );'
//        );
//        query.on('end', function() {
//            console.log("sddd");
//            client.end()
//            res.send('table created');
//        });
//    });
//
//});

app.get('/update/:agent', function(req, res){
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        pg.connect(process.env.DATABASE_URL, function(err, client) {
            var query = client.query('SELECT * FROM sets WHERE agent = "%s"' ,req.param('agent'));
            query.on('end', function(result) {
                if (!result) {
                    return res.send('No data found');
                }
                else {
                    res.send(result +"\n" + result.rowCount + ' rows were received');
                }
            });
        });
    });
});

app.get('/res/:agent', function(req, res){
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        pg.connect(process.env.DATABASE_URL, function(err, client) {
            var query = client.query('SELECT * FROM pg_equipment WHERE agent = "%s"' ,req.param('agent'));
            query.on('end', function(result) {
                if (!result) {
                    return res.send('No data found');
                    var query = client.query('INSERT INTO sets(agent,1) VALUES($1)', [agent]);
                }
                else {
                    res.send(result +"\n" + result.rowCount + ' rows were received');
                }
            });
        });
    });
});

app.get('/sets/:agent', function(req, res){
    pg.connect(process.env.DATABASE_URL, function(err, client) {
        pg.connect(process.env.DATABASE_URL, function(err, client) {
            var query = client.query('SELECT count(*) FROM pg_equipment WHERE agent = "%s"' ,req.param('agent'));
            query.on('end', function(result) {
                if (!result) {
                    return res.send('No data found');
                }
                else {
                    res.send(result +"\n" + result.rowCount + ' rows were received');
                }
            });
        });

    });
});


var port = Number(process.env.PORT || 5000);
var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});