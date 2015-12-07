/**
 * Created by bruenni on 06.12.15.
 */

import rx = require("rx");
import {Server} from "http";
import di = require("di-lite");

//import {MessageService} from "../../application/MessageService";
import {IDomainEventBus} from "../../../common/ddd/event";
import {Message} from "../../../domain/message/Message";
import {toDto} from "./../MessageDto";
import {Id} from "../../../common/ddd/model";

var socketIoStatic = require("socket.io");

/**
 * If web socket connections has been established this adpater handles websocket connections
 * for sending message event from domain event bus to existing clients by user id.
 * connections
 */
export class MessageWsIoAdapter {

  public dependencies: string;
  public eventBus: IDomainEventBus;

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
  onConnection(socket: WebSocket): void {

    //socket.emit("hello world");
  }
}
