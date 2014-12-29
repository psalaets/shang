;(function(angular) {
  angular.module('app.services').factory('gameLifeCycle', gameLifeCycle);

  function gameLifeCycle(persistence, navigation) {
    return {
      start: function(game) {
        game.start();

        return persistence.saveGame(game).then(function(game) {
          navigation.goToGame(game.id);
          return game;
        });
      },
      roundFinished: function(game) {
        game.nextRound();
        persistence.saveGame(game);
      },
      postGame: function(game) {
        persistence.deleteGame(game.id).then(function() {
          navigation.goToTitle();
        });
      }
    };
  }
})(angular);