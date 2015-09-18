/**
 * Created by bruenni on 18.09.15.
 */

(function() {

  var app = angular.module('sabbatApp.note', ['ngRoute']);

  app.config(['$routeProvider',
    function ($routeProvider) {
      $routeProvider.
        when('/notes', {
          templateUrl: 'html/note/note-list.html',
          controller: 'NoteController'
        }).
        when('/notes/create', {
          templateUrl: 'html/note/note-create.html',
          controller: 'NoteController'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);

})();