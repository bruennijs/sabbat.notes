/**
 * Created by bruenni on 18.08.15.
 */

var express = require('express');
var app = express();

var di = require('./../sabbat.notes.app/ApplicationRegistry');

var url = require('url');

// DI container
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
    var memberShipService = ctx.get('membershipService');
    memberShipService
        .createUser('bruenni', url.parse('bruenni@volloeko.de'))
        .subscribe(function(user)
                    {
                      res.writeHead(200);
                      res.send(user);
                    },
                    function(err) {
                      res.status(500);
                      res.send("User could not be created [" + err + "]");
                    });
});

app.get('/appconfig', function(req, res) {
   res.send(ctx.get("appConfig"));
});

console.log("listening...");

var httpServer = app.listen(3000);

process.on('SIGTERM', function () {
  console.log('Handling SIGTERM');
  httpServer.close(function () {
    process.exit(0);
  });
});

