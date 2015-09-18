/**
 * Created by bruenni on 17.09.15.
 */

(function() {
  var app = angular.module('sabbatApp', ['ngRoute', 'sabbatApp.note', 'angular-uuid']);

  app.config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'html/note/note-list.html',
            controller: 'noteController'
          }).
          when('/notes', {
            templateUrl: 'html/note/note-list.html',
            controller: 'noteController'
          }).
          when('/notes/create', {
            templateUrl: 'html/note/note-create.html',
            controller: 'noteController'
          }).
          otherwise({
            redirectTo: '/notes'
          });
      }]);
})();
