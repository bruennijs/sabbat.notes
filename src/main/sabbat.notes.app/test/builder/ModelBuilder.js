/**
 * Created by bruenni on 24.09.15.
 */

var jsm = require('jsmockito');
var JsHamcrest = require('jshamcrest').JsHamcrest;
var dddModel = require('./../../common/ddd/model');

var user = require('./../../domain/Model');
var url = require('url');

(function(module) {

  function UserBuilder() {
  };

  UserBuilder.prototype.Build = function (id) {
    return new user.User(id, "name", url.parse("test@sabbat.de"));
  };

  module.UserBuilder = UserBuilder;
})(module.exports);

