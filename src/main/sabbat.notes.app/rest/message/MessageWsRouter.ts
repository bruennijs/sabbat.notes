/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import {Server} from "http";
var socketIoStatic = require("socket.io");
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
export var MessageWsInit = function (route: string, di:DiLite.CreateContext, httpServer: Server) {

  var socketIoServer = socketIoStatic(httpServer,
      {
        path: route,
        transports: "websocket"
      });

  var adapter = di.get("messageWsIoAdapter") as MessageWsIoAdapter;

  socketIoServer.use(function(socket: SocketIO.Socket, err: (err: any) => void) {
    //// push new socket to ddd input/outputhandler
    adapter.onConnection(socket);
  })
};

module.exports = MessageWsInit;