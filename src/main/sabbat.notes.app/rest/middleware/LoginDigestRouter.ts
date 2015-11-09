/**
 * Created by bruenni on 09.11.15.
 */

var passportHttp = require("passport-http");

import passport = require("passport");
import express = require("express");

import di = require("di-lite");

import {UserRepository} from "./../../infrastructure/persistence/UserRepository";
import {RequestHandler, Request, Response} from "express";
import {Router} from "express";
import {User} from "../../domain/Model";
import {Express} from "express";

var routerInit = function(router: Router, di: DiLite.CreateContext) {

  //// mapped to /login
  router.post("/",
              passport.authenticate("basic", {session: false}),
              function(req: Request, res: Response, next) {
                console.log("User[" + req.user + "]");

                //// tbd set cookie OR better JSON web token


                res.send(200, req.user.id.toString() + "\r\n");

              });
}

var passportInit = function(app: Express, di: DiLite.CreateContext) {
  app.use(passport.initialize());
  passport.use(new passportHttp.BasicStrategy(function(userName, password, done) {

    var userRepo = di.get("userRepository") as UserRepository;

    userRepo.FindByName(userName).subscribe(function(users) {
      //// set user used in subsequent middleware functions
      if (users && users.length > 0) {
        console.log("User found[id=" + users[0].id.toString() + "]");
        done(null, users[0]);
      }
      else {
        console.log("User not found[id=" + userName + "]");
        done(null, false); /// not found
      }
    },
    function(err) {
      done(null, err);
    });
  }));
}

/**
 * Creates express.Router instance
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var LoginDigestRouter = function (di: DiLite.CreateContext, app: Express): Router {
  var router = Router();
  passportInit(app, di);
  routerInit(router, di);
  return router;
};
