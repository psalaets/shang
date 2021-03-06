;(function(angular) {
  angular.module('app').config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'title/title.html',
        controller: 'TitleController',
        controllerAs: 'shang',
        resolve: {
          gameCount: function(persistence) {
            return persistence.countGames();
          }
        }
      })
      .when('/games/new', {
        templateUrl: 'new-game/new-game.html',
        controller: 'NewGameController',
        controllerAs: 'setup',
        resolve: {
          availablePlayers: function(persistence) {
            return persistence.getPlayers();
          }
        }
      })
      .when('/games/:id', {
        templateUrl: 'play-game/play-game.html',
        controller: 'PlayGameController',
        controllerAs: 'current',
        resolve: {
          currentGame: function($route, persistence) {
            var gameId = $route.current.params.id;
            return persistence.loadGame(gameId);
          }
        }
      })
      .when('/games', {
        templateUrl: 'list-games/list-games.html',
        controller: 'ListGamesController',
        controllerAs: 'list',
        resolve: {
          games: function(persistence) {
            return persistence.getGames().then(function(games) {
              // most recent first
              return games.sort(function(a, b) {
                return b.startTime - a.startTime;
              });
            });
          }
        }
      })
      .when('/danger', {
        templateUrl: 'danger/danger.html',
        controller: 'DangerController',
        controllerAs: 'danger'
      });
  });
})(angular);