/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import rx = require("rx");
import express = require("express");
import {Server} from "http";
import di = require("di-lite");

var secret = require("../jwt_secret").secret;
import expressJwt = require("express-jwt");

import {Router} from "express";
import {MessageService} from "../../application/MessageService";
import {RequestHandler, Request, Response} from "express";

import {User} from "../../domain/Model";
import {IDomainEventBus} from "../../common/ddd/event";
import {Message} from "../../domain/message/Message";
import {serialize} from "./MessageRestDtoParser";
import {Id} from "../../common/ddd/model";

var routerInit = function (router, di:DiLite.CreateContext) {

  //router.eventBus = di.get("eventBus") as IDomainEventBus;
  var jwtRequestHandler = expressJwt({secret: secret});

  /**
   * CREATE USER
   */
  router.post("/send",
              jwtRequestHandler,  ///// sets req.user with fields of jwtoken
              function(req: Request, res: Response, next) {
                var messageService = di.get("messageService") as MessageService;

                if (req.user.id && req.query.to && req.query.content) {

                  console.log("Send message [from=" + req.user.id + ",to" + req.query.to + "]");

                  //// send message
                  messageService.sendByName(Id.parse(req.user.id), req.query.to, req.query.content)
                      .select(function (msg:Message) {
                        return serialize(msg);
                      })
                      .subscribe(function (dto:any) {
                            res.status(201).json(dto);
                          },
                          function (err) {
                            res.status(500).send("Entity could not be created [" + err + "]");
                          });
                }
                else
                {
                  res.status(400).send("query must contain parameter 'to' and 'content'");
                }
              });
}

/**
 * Creates express.Router instance
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var MessageRouter = function (di:DiLite.CreateContext) {
  var router = Router();
  routerInit(router, di);
  return router;
};