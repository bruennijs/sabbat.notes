/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import * as wsns from "ws";
import * as http from "http";
import di = require("di-lite");

var secret = require("../jwt_secret").secret;
import jwt = require("jsonwebtoken");

import {MessageWsIoAdapter} from "./adapters/MessageWsIoAdapter";

// Initialize web socket (socket.io) handler

var authenticateOnWsConnnection = function(socket, onAuthenticated: (jwtToken: any) => void) {
  var serverRequest: http.ServerRequest = socket.upgradeReq as http.ServerRequest;

  /// Authorization: Bearer <base64jwttoken>
  var authenticationHeaderValue: string = serverRequest.headers["authorization"].split(" ")[1];

  jwt.verify(authenticationHeaderValue, secret, function(err: Error, decoded: any) {
    if (err)
    {
      console.log("Client jwt authentication failed[%s]", err);
      socket.close(1001, err);
    }
    else
    {
      // contains user.id field
      console.log("websocket connection established [jwt=%s]", JSON.stringify(decoded));

      onAuthenticated(decoded);
    }
  });
}

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

/*  httpServer.on("upgrade", function(req, socket, head) {
    console.log("upgrade[req.method=" + req.method + ",url=" + req.url + ",headers=" + JSON.stringify(req.headers) + "]");
  });*/

  var adapter = di.get("messageWsIoAdapter") as MessageWsIoAdapter;

  var wss = new wsns.Server({ server: httpServer, path: route });

  wss.on("connection", function(socket) {
    //// handle json web token to get the current user id
    //socket.close(1000, "valid json web token needed for authentication!");
    authenticateOnWsConnnection(socket, function(jwtToken: any) {

      //// push new socket to ddd input/outputhandler
      adapter.onConnection(jwtToken.id, socket);

      socket.on("close", function(code: number, reason: string) {
        console.log("ws close[code=%s,jwt=%s]", code, JSON.stringify(jwtToken));
        adapter.onClose(jwtToken.id);
      });

      socket.on("message", function(message) {
        console.log("msg received[%s]", JSON.stringify(message));
        socket.send(message);
      });

      socket.on("ping", function(message) {
        console.log("ping received", JSON.stringify(message));
        //socket.pong()
      });

      socket.on("pong", function(message) {
        console.log("pong received[%s]", JSON.stringify(message));
      });
    });
  });
};