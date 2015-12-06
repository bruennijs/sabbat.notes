import {AuthenticationError} from "../../application/MembershipService";
/**
 * Created by bruenni on 09.11.15.
 */

var passportHttp = require("passport-http");


import express = require("express");
import passport = require("passport");
import expressJwt = require("express-jwt");

import di = require("di-lite");
var jwtSecretString = require("../jwt_secret").secret;

import {UserRepository} from "./../../infrastructure/persistence/UserRepository";
import {RequestHandler, Request, Response, Express, Router} from "express";
import {User} from "../../domain/Model";
import {sign} from "jsonwebtoken";
import {MembershipService} from "../../application/MembershipService";

var routerInit = function(router: Router, di: DiLite.CreateContext) {

  //// mapped to /login
  router.post("/",
              passport.authenticate("basic", {session: false}),
              function(req: Request, res: Response, next) {

                console.log("User login [" + req.user.name + "," + req.user.id.toString() + "]");

                var jwtPayload = {
                  id: req.user.id.toString(),
                  name: req.user.name
                }

                var options = {
                    algorithm: "HS512",
                    expiresIn: 60 * 60 * 24,
                    issuer: "OlliB"
                };

                //// tbd set cookie OR better JSON web token
                var token = sign(jwtPayload, jwtSecretString, options);

                res.status(200).contentType("text/plain").send(token);
              });

  //// returns jwt payload
  router.post("/whoami",
      function(req: Request, res: Response, next) {
        res.status(200).json(req.user); //// returns jwt payload
      });
}

var passportInit = function (app: Express, di: DiLite.CreateContext) {

  //var jwtRequestHandler = expressJwt({secret: jwtSecretString}).unless({path: ["/login", "/user/create"]}); //// authenticate all routes woth JWT check but not login itself

  app.use(passport.initialize());
  //app.use(jwtRequestHandler);
  passport.use(new passportHttp.BasicStrategy(function (userName, password, done) {

    var service = di.get("membershipService") as MembershipService;

    service.login(userName, password).subscribe(function (user: User) {
          //// set user used in subsequent middleware functions
          if (user !== null) {
            done(null, user);
          }
          else {
            console.log("User not found[name=" + userName + "]");
            done(null, false); /// not found
          }
        },
        function (err: AuthenticationError) {
          console.log("Authentication failed [" + err.toString() + "]");
          done(null, false);
        });
  }));
};

/**
 * Creates express.Router instance
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var LoginRouter = function (di: DiLite.CreateContext, app: Express): Router {
  var router = Router();
  passportInit(app, di);
  routerInit(router, di);
  return router;
};
