/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import rx = require("rx");
import express = require("express");
import di = require("di-lite");
import expressjwt = require("express-jwt");

import {MessageService} from "../../application/MessageService";
import {RequestHandler, Request, Response} from "express";
import {Router} from "express";
import {User} from "../../domain/Model";

// ********** Serializer **************
var serializeToDto = function(user: User): any {
  return {
    id: user.id.toString(),
    name: user.name,
    email: user.email.host
  };
};

var routerInit = function(router: Router, di: DiLite.CreateContext) {

  /**
   * CREATE USER
   */
  router.post("/send",
              function(req: Request, res: Response, next) {
                console.log("Send message [user.id=" + req.user.id + "]");
                var messageService = di.get("messageService") as MessageService;
                res.status(201).json(req.user);
              });
}

/**
 * Creates express.Router instance
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var MessageRouter = function (di: DiLite.CreateContext): Router {
  var router = Router()
  routerInit(router, di);
  return router;
};