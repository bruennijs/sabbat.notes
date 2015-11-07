/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import rx = require("rx");
import url = require("url");
import express = require("express");
import di = require("di-lite");

import {MembershipService} from "../../application/MembershipService";
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
  router.post("/create", function(req: Request, res: Response, next) {
    var memberShipService = di.get("membershipService") as MembershipService;

    var name  = req.body.name;
    var email = req.body.email;
    if (name && email)
    {
      memberShipService
          .createUser(name, url.parse(email))
          .select(function(user: User) { return serializeToDto(user); })
          .subscribe(function(dto: any)
              {
                res.status(200).json(dto);
              },
              function (err) {
                res.send(500, "Could not create user [" + err + "]");
              });
    }
    else
    {
      res.send(400, "Set name and email in body json");
    }
  });
}

/**
 * Creates express.Router instance
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var UserRouter = function (di: DiLite.CreateContext): Router {
  var router = Router()
  routerInit(router, di);
  return router;
};