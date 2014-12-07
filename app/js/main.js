;(function(angular) {
  var app = angular.module('app', [
    'app.controller',
    'app.model',
    'ngRoute'
  ]);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/title.html',
        controller: 'TitleCtrl',
        controllerAs: 'shang'
      })
      .when('/games/new', {
        templateUrl: 'templates/game/new.html',
        controller: 'NewGameCtrl',
        controllerAs: 'setup'
      });
  });

})(angular);