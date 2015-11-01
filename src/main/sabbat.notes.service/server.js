/**
 * Created by bruenni on 18.08.15.
 */

var express = require('express');
var app = express();

var di = require('./../sabbat.notes.app/ApplicationRegistry');

var ctx = new di.ApplicationRegistry().Context;

var myLogger = function (req, res, next) {
    console.log('LOGGED');
    next();
};

app.use(myLogger);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/users/create', function (req, res) {
    res.send('Create user');
});

app.get('/appconfig', function(req, res) {
   res.send(ctx.get("appConfig"));
});

console.log("listening...");

app.listen(3000);

