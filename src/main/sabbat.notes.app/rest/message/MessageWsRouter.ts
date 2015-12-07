/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

//import {Server} from "http";
var WebSocketServer = require('ws').Server;
import di = require("di-lite");

var secret = require("../jwt_secret").secret;
import expressJwt = require("express-jwt");

import {MessageWsIoAdapter} from "./adapters/MessageWsIoAdapter";

// Initialize web socket (socket.io) handler

/**
 * Initializes
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var MessageWsInit = function (route: string, di:DiLite.CreateContext, httpServer) {

  console.log("Register websocket middleware");

/*  httpServer.on("connection", function(socket) {
    console.log("http: new connection");
  });*/

  httpServer.on("upgrade", function(req, socket, head) {
    console.log("upgrade[req.method=" + req.method + ",url=" + req.url + ",headers=" + JSON.stringify(req.headers) + "]");
  });

  var adapter = di.get("messageWsIoAdapter") as MessageWsIoAdapter;

  var wss = new WebSocketServer({ server: httpServer, path: route });

  wss.on("connection", function(socket: WebSocket) {
    console.log("ws connected");

    socket.on("open", function() {
      console.log("ws opened");
    });

    socket.on("message", function(message) {
      console.log("msg received[%s]", JSON.stringify(message));
    });
    //// push new socket to ddd input/outputhandler
    //adapter.onConnection(socket);
  });
};