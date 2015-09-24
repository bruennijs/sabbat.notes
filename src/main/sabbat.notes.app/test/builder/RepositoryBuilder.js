/**
 * Created by bruenni on 24.09.15.
 */

function RepositoryBuilder() {

};

RepositoryBuilder.prototype.BuildMocked = function () {
  return {
    Insert: function(model) {
      this.insertModel = model;
    }
  }
};

module.exports = RepositoryBuilder;