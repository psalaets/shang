;(function(angular) {
  angular.module('app.services').factory('persistence', function($localForage, $q, Game, migrations) {

    function migrateData() {
      return migrations.migrate();
    }

    return {
      saveGame: function(game) {
        function save(game) {
          return migrateData().then(function() {
            return $localForage.setItem(key(game.id), game);
          }).then(function() {
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
        return migrateData().then(function() {
          return $localForage.getItem(key(id));
        }).then(function(gameData) {
          return Game.fromData(gameData);
        });
      },
      deleteGame: function(id) {
        return migrateData().then(function() {
          return $localForage.removeItem(key(id));
        });
      },
      deleteAllGames: function() {
        var self = this;
        var gameKeys = [];

        return this.getGames().then(function(games) {
          return $q.all(games.map(function(game) {
            return self.deleteGame(game.id);
          }));
        }).then(function() {
          // reset game id sequence
          return $localForage.removeItem('nextGameId');
        });
      },
      countGames: function() {
        return this.getGames().then(function(games) {
          return games.length;
        });
      },
      getGames: function() {
        var games = [];

        return migrateData().then(function() {
          return $localForage.iterate(function(value, key) {
            if (isGameKey(key)) {
              games.push(Game.fromData(value));
            }
          });
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
        return migrateData().then(function() {
          return $localForage.setItem('players', players);
        });
      },
      deletePlayers: function() {
        return migrateData().then(function() {
          return $localForage.removeItem('players');
        });
      }
    };

    function nextGameId() {
      return migrateData().then(function() {
        return $localForage.getItem('nextGameId');
      }).then(function(id) {
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
      return migrateData().then(function() {
        return $localForage.getItem('players');
      }).then(function(players) {
        if (players) {
          return players;
        } else {
          return $localForage.setItem('players', []);
        }
      });
    }
  });
})(angular);