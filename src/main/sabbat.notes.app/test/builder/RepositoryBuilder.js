/**
 * Created by bruenni on 24.09.15.
 */

var jsm = require('jsmockito');
var JsHamcrest = require('jshamcrest').JsHamcrest;
var dddModel = require('./../../common/ddd/model');

function RepositoryStub() {
  this.nextId = 0;
  this.nextId = function() {
    this.nextId++;
    return new dddModel.Id(this.nextId.toString());
  }
}

RepositoryStub.prototype.Insert = function(model, cb) {
  this.insertModel = model;
  cb(null, model);
}

RepositoryStub.prototype.nextId = function() {
  return this.nextId++;
}

RepositoryStub.prototype.GetById = function(id) {
  return null;
}

var RepositoryBuilder = (function() {

  function RepositoryBuilder() {
  };

  RepositoryBuilder.prototype.BuildMocked = function () {
    var mock = jsm.JsMockito.mock(RepositoryStub);

    //jsm.JsMockito.when(mock).Insert(JsHamcrest.Matchers.anything(), JsHamcrest.Matchers.anything()).then(function(model, cb) {
    //  //fire callback with model to be inserted
    //  cb(null, model);
    //});

    return mock;
  };

  RepositoryBuilder.prototype.BuildStubbed = function () {
    return new RepositoryStub();
  };

  return RepositoryBuilder;
})();

module.exports = RepositoryBuilder;