/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../node_modules/DefinitelyTyped/node/node.d.ts" />
/// <reference path="./../node_modules/DefinitelyTyped/express/express.d.ts" />
/// <reference path="./../node_modules/DefinitelyTyped/di-lite/di-lite.d.ts" />
/// <reference path="./../../sabbat.notes.app/application/MembershipService.ts" />

import express = require("express");
import di = require("di");

import msg = require("./../../sabbat.notes.app/application/MembershipService");

var router = express.Router();

router.post("/create", function(req: express.Request, res: express.Response, next: express.Function) {
  //GLOBAL.Context.
});