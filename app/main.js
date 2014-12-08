;(function(angular) {
  var app = angular.module('app', [
    'app.models',
    'app.services',
    'app.title',
    'app.new-game',
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