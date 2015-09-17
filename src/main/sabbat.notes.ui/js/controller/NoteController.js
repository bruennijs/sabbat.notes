/**
 * Created by bruenni on 17.09.15.
 */

var app = angular.module("sabbatApp");

app.controller("NoteController", ["noteService", function($scope, noteService) {
  $scope.notes = noteService.getNotes();
  $scope.create = function() {
    noteService.create();
  };
}]);