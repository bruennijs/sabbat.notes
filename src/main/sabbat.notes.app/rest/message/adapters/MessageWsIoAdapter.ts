/**
 * Created by bruenni on 06.12.15.
 */

import * as ws from "ws";
import * as rx from "rx.all";
import {Server} from "http";
import di = require("di-lite");

//import {MessageService} from "../../application/MessageService";
import {IDomainEventBus, IDomainEvent} from "../../../common/ddd/event";
import {Message} from "../../../domain/message/Message";
import {MessageDeliveryRequestedEvent, MessageDeliveredEvent} from "../../../domain/message/MessageEvents";
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

    var that = this;

    this.userId2SocketMap[userId] = [socket];

    this.eventBus.subscribe("message")
                 .where(function(domainEvent) { return domainEvent instanceof MessageDeliveryRequestedEvent; })
                 .subscribeOnNext(function(domainEvent: IDomainEvent) {

          // iterate all sockets of the user the message is sent to...
          var deliveryEvent = domainEvent as MessageDeliveryRequestedEvent;

          console.log(JSON.stringify(that.userId2SocketMap));

          var socketArray:any[] = that.userId2SocketMap[deliveryEvent.to.value];
          if (socketArray !== undefined) {
            console.log("2");
            //// ...send object to each connected websocket
            socketArray.forEach(function (socket, idx, array) {
              socket.send(JSON.stringify(domainEvent));
            });
          }
        });
  }

  /**
   * if websocket connection is closed remove from list
   * @param userId
   */
  onClose(userId: string): void {
    var socketArray = this.userId2SocketMap[userId];
    if (socketArray !== undefined)
    {
      //console.log("delete socketarray [%s]", userId);
      delete this.userId2SocketMap[userId];
    }
  }
}
