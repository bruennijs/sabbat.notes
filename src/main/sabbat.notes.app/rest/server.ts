/// <reference path="./../typings/tsd.d.ts" />

/// ********** HTTP server **************
var app = require("express")();
var httpServer = require("http").createServer(app);

var bodyParser = require("body-parser");
var morgan = require("morgan");
import rx = require("rx");

// import DI container
import DiContainer = require("./../ProductionRegistry");

// ============= express router ================
import {UserRouter} from "./user/UserRouter";
import {LoginRouter} from "./user/LoginRouter";
import {MessageRouter} from "./message/MessageRouter";
import {MessageWsInit} from "./message/MessageWsRouter";

// ============= REPOS ================
import {UserRepository} from "../infrastructure/persistence/UserRepository";
import {MessageRepository} from "../infrastructure/persistence/MessageRepository";


// *********** EXPRESS *************
app.use(bodyParser.json()); // for parsing application/json
app.use(morgan("combined"));  // log express traffic only

// ************* LOGI & Authentication ***************
app.use("/login", LoginRouter(DiContainer.Registry.Context, app)); // login router

// ************* USER Router ***************
app.use("/users", UserRouter(DiContainer.Registry.Context)); // user Router

// ************* Message Router ***************
app.use("/messages", MessageRouter(DiContainer.Registry.Context)); // user Router

// ************* Message web socket router ***************
MessageWsInit("/messages/notification", DiContainer.Registry.Context, httpServer);

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
      // on completed
      var port = 8081;
      console.log("listening on port " + port);

      httpServer.listen(port);

      process.on('SIGTERM', function () {
        console.log('Handling SIGTERM');
        httpServer.close(function () {
          process.exit(0);
        });
      });
});

