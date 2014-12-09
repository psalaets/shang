;(function(angular) {
  angular.module('app.services').factory('persistence', function($localForage, Game) {

    function nextGameId() {
      return $localForage.getItem('nextGameId').then(function(id) {
        id = id || 0;
        return $localForage.setItem('nextGameId', id + 1);
      });
    }

    // convert game id to persistence key
    function key(gameId) {
      return 'game-' + gameId;
    }

    return {
      saveGame: function(game) {
        function save(game) {
          return $localForage.setItem(key(game.id), game).then(function() {
            return game;
          });
        }

        function assignId(id) {
          game.id = id;
          return game;
        }

        if (game.id) {
          return save(game);
        } else {
          return nextGameId().then(assignId).then(save);
        }
      },
      loadGame: function(id) {
        return $localForage.getItem(key(id)).then(function(gameData) {
          return Game.fromData(gameData);
        });
      },
      deleteGame: function(id) {
        return $localForage.removeItem(key(id));
      }
    };
  });
})(angular);