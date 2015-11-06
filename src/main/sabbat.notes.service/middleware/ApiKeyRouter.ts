/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../node_modules/DefinitelyTyped/express/express.d.ts" />

import express = require('express');
var router = express.Router();

router.use(function (req: express.Request, res: express.Response, next) {
  console.log("Api key middleware");
});