;(function(angular) {
  var app = angular.module('app', [
    'app.controller',
    'app.model',
    'app.service',
    'ngRoute'
  ]);

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'title/title.html',
        controller: 'TitleCtrl',
        controllerAs: 'shang'
      })
      .when('/games/new', {
        templateUrl: 'new-game/new-game.html',
        controller: 'NewGameCtrl',
        controllerAs: 'setup'
      });
  });

})(angular);