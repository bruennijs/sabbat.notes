/**
 * Created by bruenni on 24.09.15.
 */

import {IdObject,Id} from "../../../common/ddd/model";
//import {MongoDbRepository} from "./../../../common/infrastructure/persistence/MongoDbRepository";
import {Observable} from "rx.all";
import {UserFactory} from "../../../domain/user/UserFactory";
import {UserRepository} from "../../../infrastructure/persistence/UserRepository";
import {Url, parse} from "url";
import {User} from "../../../domain/user/User";

var suite = require('mocha').suite;
var setup = require('mocha').setup;
var suiteSetup = require('mocha').suiteSetup;
var test = require('mocha').test;
var assert = require('assert');

var model = require('./../../../common/ddd/model');
var repository = require('./../../../infrastructure/persistence/NoteRepository');
var models = require('./../../../domain/Model');
var factory = require('./../../../domain/note/NoteFactory');
var testConfig = require('./../../test.config');

var _ = require('underscore');
var mongo = require('mongodb');

suite("UserRepositoryTest", function() {

  suiteSetup(function() {
    //_.extend(testConfig, {collectionName: 'notes'});
  });

  test("#when insert email expect email set as string", function(done) {
    var email = "a@gmx.de";

    var factory = new UserFactory();
    var sut = new UserRepository();
    sut.factory = factory;
    sut.configuration = testConfig;

    var id = sut.nextId();

    var user = new User(id, "peter", email);

    var init = sut.Init(false);

    init.subscribeOnCompleted(function () {
      // insert note
      var insert = sut.Insert(user);

      insert.subscribe(function(createdUser) {
            // find note by owner
            var getUser = sut.GetById(id);

            getUser.subscribe(function(userGet: User) {
              assert.equal(userGet.email, email);
            },
            function(err)
            {
              done(err);
            },
            function()
            {
              done();
            });
          },
          // onError
          function(err) {
            done(err);
          });
    });

    init.subscribeOnError(done);
  });
});