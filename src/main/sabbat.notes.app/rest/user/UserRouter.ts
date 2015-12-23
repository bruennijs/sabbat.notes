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
import {serialize} from "./UserDto";
import {User} from "../../domain/user/User";

var routerInit = function(router: Router, di: DiLite.CreateContext) {

  /**
   * get users
   */
  router.get("/", function(req: Request, res: Response, next) {
    var memberShipService = di.get("membershipService") as MembershipService;

    //memberShipService
          //.find()
          //.select(function(user: User) { return serialize(req.baseUrl, user); })
          //.subscribe(function(dto: any)
          //    {
          //      res.status(200).json(dto);
          //    },
          //    function (err) {
          //      res.send(500, "Could not create user [" + err + "]");
          //    });
  });

  /**
   * CREATE USER
   */
  router.post("/create", function(req: Request, res: Response, next) {
    var memberShipService = di.get("membershipService") as MembershipService;

    var name  = req.query.name;
    var email = req.query.email;
    if (name && email)
    {
      memberShipService
          .createUser(name, url.parse(email))
          .select(function(user: User) { return serialize(user); })
          .subscribe(function(dto: any)
              {
                console.log(dto);
                res.status(200).json(dto);
              },
              function (err) {
                res.status(500).send("Could not create user [" + err + "]");
              });
    }
    else
    {
      res.status(400).contentType("text/plain").send("Set name and email in body json");
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