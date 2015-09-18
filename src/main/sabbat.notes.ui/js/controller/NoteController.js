/**
 * Created by bruenni on 17.09.15.
 */

(function() {
  var app = angular.module("sabbatApp.note");

  app.controller("noteController", ['$scope', 'noteService', function ($scope, noteService) {
    $scope.notes = noteService.getNotes();
    $scope.query = 'search';
    $scope.notecontent = 'Please select one item in list';
    $scope.isSelected = false;
    $scope.selectedNote = null;
    $scope.create = function () {
      noteService.create();
    };

    $scope.showContent = function(id) {
      /*console.log("showContent(" + id + ")");*/
      $scope.selectednote = noteService.getById(id);
      $scope.isSelected = true;
    };

    $scope.delete = function(id) {
      noteService.delete(id);
    };
  }]);
})();