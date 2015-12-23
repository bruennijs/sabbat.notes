/**
 * Created by bruenni on 24.09.15.
 */

var jsm = require('jsmockito');
var JsHamcrest = require('jshamcrest').JsHamcrest;
var dddModel = require('./../../common/ddd/model');

var user = require('./../../domain/user/User');
var url = require('url');

var rx = require('rx');

//********** Repository ************

(function(module) {

  // **************************************+
  /**
   *
   * @constructor
   */
  function RepositoryStub() {
    this.nextId = 0;
    this.nextId = function() {
      this.nextId++;
      return new dddModel.Id(this.nextId.toString());
    }
  }

  RepositoryStub.prototype.Insert = function(model) {
    this.insertModel = model;
    return rx.Observable.return(model);
  }

  RepositoryStub.prototype.nextId = function() {
    return this.nextId++;
  }

  RepositoryStub.prototype.GetById = function(id) {
    return null;
  }

  // **************************************+

  function Builder() {
  };

  Builder.prototype.BuildMock = function () {
    var mock = jsm.JsMockito.mock(RepositoryStub);

    jsm.JsMockito.when(mock).Insert(JsHamcrest.Matchers.anything()).then(function(model) {
      //console.log(model);
      //fire callback with model to be inserted
      return rx.Observable.return(model)
    });

    return mock;
  };

  Builder.prototype.BuildStubbed = function () {
    return new RepositoryStub();
  };

  module.RepositoryBuilder = Builder;
})(module.exports);


// ******** User *******************

(function(module) {

  function Builder() {
  };

  Builder.prototype.Build = function () {
    return new user.User(this.id, this.name, url.parse("test@sabbat.de"));
  };

  Builder.prototype.withId = function (id) {
    this.id = id;
    return this;
  }

  Builder.prototype.withName = function (value) {
    this.name = value;
    return this;
  }

  module.UserBuilder = Builder;
})(module.exports);

