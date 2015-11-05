/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./node_modules/DefinitelyTyped/express/express.d.ts" />
import express = require('express');
var router = express.Router();

router.use(function (req: Request, res: Response, next: Function) {
  console.log("Api key middleware");
});