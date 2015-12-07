/**
 * Created by bruenni on 06.12.15.
 */

import * as ws from "ws";
import rx = require("rx");
import {Server} from "http";
import di = require("di-lite");

//import {MessageService} from "../../application/MessageService";
import {IDomainEventBus} from "../../../common/ddd/event";
import {Message} from "../../../domain/message/Message";
import {toDto} from "./../MessageDto";
import {Id} from "../../../common/ddd/model";


/**
 * If web socket connections has been established this adpater handles websocket connections
 * for sending message event from domain event bus to existing clients by user id.
 * connections
 */
export class MessageWsIoAdapter {

  public dependencies: string;
  public eventBus: IDomainEventBus;

  /**
   * Contains the userId to websocket map
   */
  private userId2SocketMap: any = {};

  /**
   * Constructor
   * @param di
   */
  constructor() {
    this.dependencies = "eventBus=eventBus";
  }

  /**
   * If ws connection has been established this adpater
   * @param socket
   */
  onConnection(userId: string, socket): void {
    this.userId2SocketMap[userId] = [socket];
  }

  /**
   * if websocket connection is closed remove from list
   * @param userId
   */
  onClose(userId: string): void {
    var socketArray = this.userId2SocketMap[userId];
    if (socketArray !== undefined)
    {
      console.log("delete socketarray [%s]", userId);
      delete this.userId2SocketMap[userId];
    }
  }
}
