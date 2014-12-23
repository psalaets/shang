;(function(angular) {
  angular.module('app.services').factory('persistence', function($localForage, $q, Game) {

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

    function isGameKey(key) {
      return /game-/.test(key);
    }

    function ensurePlayerListExists() {
      return $localForage.getItem('players').then(function(players) {
        if (players) {
          return players;
        } else {
          return $localForage.setItem('players', []);
        }
      });
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
      },
      deleteAllGames: function() {
        var gameKeys = [];

        return $localForage.iterate(function(value, key) {
          if (isGameKey(key)) {
            gameKeys.push(key);
          }
        }).then(function() {
          return $q.all(gameKeys.map(function(key) {
            return $localForage.removeItem(key);
          }));
        }).then(function() {
          // reset game id sequence
          return $localForage.removeItem('nextGameId');
        });
      },
      getGames: function() {
        var games = [];

        return $localForage.iterate(function(value, key) {
          if (isGameKey(key)) {
            games.push(value);
          }
        }).then(function() {
          return games;
        });
      },
      getPlayers: function() {
        return ensurePlayerListExists().then(function(players) {
          return players.sort();
        });
      },
      setPlayers: function(players) {
        return $localForage.setItem('players', players);
      },
      deletePlayers: function() {
        return $localForage.removeItem('players');
      }
    };
  });
})(angular);