/**
 * Created by bruenni on 23.09.15.
 */

/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />
import rx = require('rx');

import puser = require('./../../infrastructure/persistence/UserRepository');
import pmsg = require('./../../infrastructure/persistence/MessageRepository');

import model = require('./../../common/ddd/model');
import event = require('./../../common/ddd/event');

import user = require('./../Model');
import msg = require('./Message');

import factory = require('./MessageFactory');

export class MessageService implements event.IEventHandler<event.IDomainEvent> {
  private _msgRepo;
  private _factory;
  private _userRepo;

  constructor(msgRepo: pmsg.MessageRepository, userRepo: puser.UserRepository, noteFactory: factory.MessageFactory) {
    this._msgRepo = msgRepo;
    this._userRepo = userRepo;
    this._factory = noteFactory;
  }

  public sendMessage(from: model.Id, to: model.Id, content: string): rx.IObservable<msg.Message> {
    var nextId = this._msgRepo.nextId();

    var fromUser = this._userRepo.GetById(from);
    var toUser = this._userRepo.GetById(from);

    var message = new msg.Message(nextId, from);

    //// contains business logic
    message.sendTo(toUser, content);

    var subject = new rx.ReplaySubject<msg.Message>();

    // insert to repo.
    this._msgRepo.Insert(message, function(err, createdMsg) {
      if (err === null)
      {
        subject.onNext(createdMsg);
        subject.onCompleted();
      }
      else
      {
        subject.onError(err);
      }
    });

    // fire MessageSentEvent

    return subject;
  }

  /**
   * Handles:
   * 1) MessageDeliveredEvent
   * @param event
   * @constructor
   */
  Handle(event:event.IDomainEvent): void {
    return;
  }
}
