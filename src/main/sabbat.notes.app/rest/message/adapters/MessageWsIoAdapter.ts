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
  private subscription:rx.IDisposable;

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

    if (this.userId2SocketMap[userId] !== undefined) {
      this.userId2SocketMap[userId].push(socket);
    }
    else
    {
      this.userId2SocketMap[userId] = [socket];
    }

    this.SubscribeEventBusObserver();
  }

  /**
   * Subscribe to event bus listening for message delivery request events.
   * @constructor
   */
  private SubscribeEventBusObserver(): void {
    var that = this;
    if (this.subscription === undefined) {
      this.subscription = this.eventBus.subscribe("message")
           .where(function (domainEvent) { return domainEvent instanceof MessageDeliveryRequestedEvent; })
           .subscribe(function (domainEvent:IDomainEvent) {

              // iterate all sockets of the user the message is sent to...
              var deliveryEvent = domainEvent as MessageDeliveryRequestedEvent;

              var socketArray:any[] = that.userId2SocketMap[deliveryEvent.to.value];
              if (socketArray !== undefined) {
                if (socketArray.length > 0) {
                  //// ...send object to each connected websocket
                  socketArray.forEach(function (socket, idx, array) {
                    socket.send(JSON.stringify(domainEvent));
                });
              }
            }
          },
          function(err) { console.log("message observer error[%s]", err); },
          function() { console.log("message observer completed"); });
    }
  }

  /**
   * if websocket connection is closed remove from list
   * @param userId
   */
  onClose(userId: string): void {
    var socketArray = this.userId2SocketMap[userId];
    if (socketArray !== undefined)
    {
      delete this.userId2SocketMap[userId];
    }
  }
}
