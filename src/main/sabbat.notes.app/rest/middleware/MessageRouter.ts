/**
 * Created by bruenni on 05.11.15.
 */

/// <reference path="./../../typings/tsd.d.ts" />

import rx = require("rx");
import express = require("express");
import di = require("di-lite");

import {MessageService} from "../../application/MessageService";
import {RequestHandler, Request, Response} from "express";
import {Router} from "express";
import {User} from "../../domain/Model";
import {IDomainEventBus} from "../../common/ddd/event";
import {Message} from "../../domain/message/Message";
import {toDto} from "../dto/MessageDto";
import {Id} from "../../common/ddd/model";

var routerInit = function(router: Router, di: DiLite.CreateContext) {

  //router.eventBus = di.get("eventBus") as IDomainEventBus;

  /**
   * CREATE USER
   */
  router.post("/send",
              function(req: Request, res: Response, next) {
                console.log("Send message [user.id=" + req.user.id + "]");
                var messageService = di.get("messageService") as MessageService;

                //// send message
                messageService.sendByName(Id.parse(req.user.id), req.body.to, req.body.content)
                    .select(function(msg: Message) { return toDto(req.baseUrl, msg); })
                    .subscribe(function(dto: any)
                        {
                          res.status(201).json(dto);
                        },
                        function (err) {
                          res.status(500).send("Entity could not be created [" + err + "]");
                        });
              });
}

/**
 * Creates express.Router instance
 * @param di di container
 * @returns {Router}
 * @constructor
 */
export var MessageRouter = function (di: DiLite.CreateContext): Router {
  var router = Router();
  routerInit(router, di);
  return router;
};