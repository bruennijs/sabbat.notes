/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../dist/sabbat.notes.app/application/MembershipService.d.ts" />
/// <reference path="./../typings/tsd.d.ts" />

import express = require("express");
import di = require("di-lite");

import msg = require("MembershipService");

var router = express.Router();

router.post("/create", function(req: express.Request, res: express.Response, next) {
  //GLOBAL.Context.
  var msgService = new msg.MembershipService();
});