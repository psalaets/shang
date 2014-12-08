;(function(angular) {
  angular.module('app').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'title/title.html',
        controller: 'TitleController',
        controllerAs: 'shang'
      })
      .when('/new', {
        templateUrl: 'new-game/new-game.html',
        controller: 'NewGameController',
        controllerAs: 'setup'
      })
      .when('/play', {
        templateUrl: 'play-game/play-game.html',
        controller: 'PlayGameController',
        controllerAs: 'current'
      });
  });
})(angular);