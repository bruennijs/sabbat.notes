/**
 * Created by bruenni on 05.11.15.
 */

import rx = require("rx");
import {MessageRepository} from "../infrastructure/persistence/MessageRepository";

/// <reference path="./../typings/tsd.d.ts" />

var bodyParser = require("body-parser");
import express = require("express");


// import DI container
import DiContainer = require("./../ProductionRegistry");
import {UserRepository} from "../infrastructure/persistence/UserRepository";

import {UserRouter} from "./user/UserRouter";
import {MessageRouter} from "./message/MessageRouter";
import {LoginDigestRouter} from "./user/LoginRouter";

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
    },
    function(err) {
      console.log("Repository connection failed");
    },
    function() {
      // on coompleted
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

