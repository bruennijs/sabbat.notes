/**
 * Created by bruenni on 05.11.15.
 */

import rx = require("rx");
import {MessageRepository} from "../infrastructure/persistence/MessageRepository";
import Observable = Rx.Observable;

/// <reference path="./../typings/tsd.d.ts" />

var bodyParser = require("body-parser");
import express = require("express");


// import DI container
import DiContainer = require("./../ProductionRegistry");
import {UserRepository} from "../infrastructure/persistence/UserRepository";

import {UserRouter} from "./middleware/UserRouter";
import {MessageRouter} from "./middleware/MessageRouter";
import {LoginDigestRouter} from "./middleware/LoginDigestRouter";

// *********** EXPRESS *************
var app = express();

app.use(bodyParser.json()); // for parsing application/json


// ************* LOGI & Authentication ***************
app.use("/login", LoginDigestRouter(DiContainer.Registry.Context, app)); // login router

// ************* USER Router ***************
app.use("/user", UserRouter(DiContainer.Registry.Context)); // user Router

// ************* Message Router ***************
app.use("/message", MessageRouter(DiContainer.Registry.Context)); // user Router

// *********************************

// *********** MONGO *************
var userRepo = DiContainer.Registry.Context.get("userRepository") as UserRepository;
var messageRepo = DiContainer.Registry.Context.get("messageRepository") as MessageRepository;

var dbsInitialized = rx.Observable.when(userRepo.Init(false).and(messageRepo.Init(false)).thenDo(function(r1, r2): any {
  return r1 && r2;
}));

dbsInitialized.subscribe(
    function(next) {
      console.log("Repositories connection successful");
    },
    function(err) {
      console.log("Repository connection failed");
    },
    function() {

      var port = 8081;
      console.log("listening on port " + port);

      var httpServer = app.listen(port);

      process.on('SIGTERM', function () {
        console.log('Handling SIGTERM');
        httpServer.close(function () {
          process.exit(0);
        });
      });
});

// *********************************

//app.post('/users/:from/sendMessage', function (req, res) {
//  var messageService = ctx.get('messageService');
//  messageService
//      .sendMessage(req.query.to, url.parse('bruenni@volloeko.de'))
//      .subscribe(function(message)
//          {
//            res.writeHead(200);
//            res.send(user);
//          },
//          function(err) {
//            res.status(500);
//            res.send("User could not be created [" + err + "]");
//          });
//})

