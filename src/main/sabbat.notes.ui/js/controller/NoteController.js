/**
 * Created by bruenni on 17.09.15.
 */

(function() {
  var app = angular.module("sabbatApp");

  app.controller("noteController", ['$scope', 'noteService', function ($scope, noteService) {
    $scope.notes = noteService.getNotes();
    $scope.query = 'search';
    $scope.create = function () {
      noteService.create();
    };
  }]);
})();