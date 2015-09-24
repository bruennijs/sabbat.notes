/**
 * Created by bruenni on 24.09.15.
 */

function RepositoryBuilder() {

};

RepositoryBuilder.prototype.BuildMocked = function () {
  return {
    Insert: function(model, cb) {
      this.insertModel = model;
      cb(null);
    }
  }
};

module.exports = RepositoryBuilder;