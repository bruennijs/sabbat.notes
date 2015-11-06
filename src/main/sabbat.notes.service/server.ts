/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./typings/tsd.d.ts" />

import express = require("express");

var userRouter = require("./middleware/UserRouter");
var app = express();

app.use("/user", userRouter);

app.get("/test", function(req: express.Request, res: express.Response, next) {
  res.status(200).json({id: "1234", value: "test"});
});

app.listen(3000);


