/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="./../typings/tsd.d.ts" />

import rx = require('rx');
import _ = require('underscore');

import {IEventHandler, IDomainEvent} from "../common/ddd/event";
import {Id} from "../common/ddd/model";
import {Message} from "../domain/message/Message";
import {MessageCreatedEvent, MessageDeliveredEvent} from "../domain/message/MessageEvents";
import {User} from "../domain/Model";
import {IRepository} from "../common/ddd/persistence";
import {MessageEventBase} from "../domain/message/MessageEvents";
import {UserRepository} from "../infrastructure/persistence/UserRepository";

export class MessageService implements IEventHandler<IDomainEvent> {
  public messageRepository: IRepository<Message>;
  public messageFactory;
  public userRepository: UserRepository;
  public eventBus;
  public dependencies;

  constructor() {
    this.dependencies = "eventBus, messageFactory, userRepository, messageRepository";
  }

  /***
   * sends a message to a user in the domain by user name.
   * 1) gets from and to user from UserRepo
   * 2) sends message
   * @param from
   * @param toName name of the user to send message to.
   * @param content
   * @returns {Rx.ReplaySubject<T>}
   */
  public sendByName(from: Id, toName: string, content: string): rx.Observable<Message> {
    var that = this;

    var fromUserObs = this.GetUserById(from, "from");

    var toUserObs = this.userRepository.FindByName(toName).map(function (user: User[]) {
      return {to: user[0]};
    });

    // map id -> user instance
    var reduced = rx.Observable.when(fromUserObs.and(toUserObs).thenDo(function(ret1, ret2)
    {
      return _.extend(ret1, ret2);
    }));

    // reduce to one object containing 'to' and 'from' property mapped to its user instance
    return reduced
        .selectMany(function (usersMap: any) {
          return that.send(usersMap.from, usersMap.to, content);
        });
  }

  /***
   * sends a message to a user in the domain.
   * 1) gets from and to user from UserRepo
   * 2) sends message
   * @param from
   * @param to
   * @param content
   * @returns {Rx.ReplaySubject<T>}
   */
  public sendById(from: Id, to: Id, content: string): rx.Observable<Message> {
    var that = this;

    var fromUserObs = this.GetUserById(from, "from");

    var toUserObs = this.GetUserById(to, "to");

    // map id -> user instance
    var reduced = rx.Observable.when(fromUserObs.and(toUserObs).thenDo(function(ret1, ret2)
    {
      return _.extend(ret1, ret2);
    }));

    // reduce to one object containing 'to' and 'from' property mapped to its user instance
    return reduced.selectMany(function (usersMap: any) {
          return that.send(usersMap.from, usersMap.to, content);
        });
  }

  /**
   * Gets iser by id and throws exception if user could not be found.
   * @param to
   * @returns {Observable<{to: User}>}
   * @constructor
   */
  private GetUserById(to: Id, mapKey: string): rx.Observable<any> {
    return this.userRepository.GetById(to)
                              .do(function (user: User) {
                                if (user === null) {
                                  throw new Error("user with id=" + to.toString() + " could not be found");
                                }
                              })
                              .map(function (user: User) {
                                var mapObj = {};
                                mapObj[mapKey] = user;
                                return mapObj;
                              });
  };

  /**
   * Creates message and publishes event to bus.
   * @param from
   * @param to
   * @param content
   * @returns {Observable<Message>}
   */
  public send(from: User, to: User, content: string): rx.Observable<Message> {
    var that = this;

    var id = this.messageRepository.nextId();

    var createdMsg = new Message(id);

    var createdEvents = createdMsg.create(from, to, content);

    return this.messageRepository
          .Insert(createdMsg)
          .select(function (next) {
            // fire events
            createdEvents.forEach(function (event, idx, arr) {
              that.eventBus.publish(event);
            });

            return createdMsg;
        });
  }

  /**
   * Handles:
   * 1) MessageDeliveredEvent
   * @param event
   * @constructor
   */
  Handle(event: IDomainEvent): void {
    if(event instanceof MessageEventBase) {
      var msgGet = this.messageRepository.GetById(event.id);

      msgGet.subscribe(function (msg) {
        //// transition to delivered state and store to repo
        msg.Handle(event);

        this.messageRepository.Update(msg).subscribe(function (updatedMsg) {
          // log that msg was updated
          console.log("message updated[" + msg.id.toString() + ",state=" + updatedMsg.currentState + "]");
        });
      });
    }
  };
}
