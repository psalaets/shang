;(function(angular) {
  angular.module('app').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'title/title.html',
        controller: 'TitleController',
        controllerAs: 'shang'
      })
      .when('/games/new', {
        templateUrl: 'new-game/new-game.html',
        controller: 'NewGameController',
        controllerAs: 'setup'
      });
  });
})(angular);