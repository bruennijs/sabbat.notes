/**
 * Created by bruenni on 24.09.15.
 */

function RepositoryBuilder() {
  this.nextId = 0;
};

RepositoryBuilder.prototype.BuildMocked = function () {
  return {
    Insert: function(model, cb) {
      this.insertModel = model;
      cb(null);
    },

    nextId: function() {
      return this.nextId++;
    }
  }
};

module.exports = RepositoryBuilder;