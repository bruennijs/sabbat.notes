/**
 * Created by bruenni on 17.09.15.
 */

(function() {
  var app = angular.module("sabbatApp");

  app.controller("noteController", ['$scope', 'noteService', function ($scope, noteService) {
    $scope.notes = noteService.getNotes();
    $scope.query = 'search';
    $scope.notecontent = 'select item in list';
    $scope.create = function () {
      noteService.create();
    };

    $scope.showContent = function(id) {
      console.log("showContent(" + id + ")");
      $scope.selectednote = noteService.getById(id);
    };
  }]);
})();