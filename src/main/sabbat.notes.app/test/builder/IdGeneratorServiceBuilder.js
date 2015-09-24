/**
 * Created by bruenni on 24.09.15.
 */

function IdGeneratorServiceBuilder() {
  this.newReturn = "1";
};

IdGeneratorServiceBuilder.prototype.BuildMocked = function () {

    var that = this;

    return new function() {
      this.new = function () {
        return that.newReturn;
      };
    };
};

IdGeneratorServiceBuilder.prototype.withNewReturn = function (id) {
  this.newReturn = id;
  return this;
};

module.exports = IdGeneratorServiceBuilder;