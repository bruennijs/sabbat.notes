/**
 * Created by bruenni on 17.09.15.
 */

var notes = [
  {title: "angular", content: "angular has to be explored. what when the text is bigger than the line of the list item?"},
  {title: "checkout html", content: "html is trickky. I need much more time"}
];

var app = angular.module("SabbatApp", []);
app.controller("NotesController", function($scope) {
  $scope.notes = notes;
});
