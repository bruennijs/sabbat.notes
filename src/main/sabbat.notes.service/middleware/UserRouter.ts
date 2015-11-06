/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../dist/sabbat.notes.app/sabbat.notes.app-all.d.ts" />

import express = require("express");
import di = require("di-lite");

import msg = require("./../../sabbat.notes.app/application/MembershipService");

var router = express.Router();

router.post("/create", function(req: express.Request, res: express.Response, next) {
  //GLOBAL.Context.
  var msgService = new msg.MembershipService();
});