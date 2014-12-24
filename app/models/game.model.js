;(function(angular) {
  angular.module('app.models').factory('Game', function(Round, Player) {
    var roundNames = [
      '2 Groups',
      '1 Run 1 Group',
      '2 Runs',
      '3 Groups',
      '2 Groups 1 Run',
      '2 Runs 1 Group',
      '3 Runs'
    ];

    function Game() {
      this.players = [];
      this.startTime = null;

      this.rounds = [];
    }

    Game.fromData = function(data) {
      var game = new Game();

      game.players = data.players.map(function(playerData) {
        return Player.fromData(playerData);
      });

      game.rounds = data.rounds.map(function(roundData) {
        return Round.fromData(roundData);
      });

      game.id = data.id;
      game.startTime = new Date(data.startTime);

      return game;
    };

    var p = Game.prototype;

    p.addPlayer = function(name) {
      var player = new Player(name);
      this.players.push(player);
    };

    p.start = function() {
      var playerNames = this.players.map(function(player) {
        return player.name;
      });

      this.rounds = roundNames.map(function(name) {
        return new Round(name, playerNames);
      }, this);

      this.rounds[0].active = true;
      this.startTime = new Date();
    };

    p.getPlayer = function(name) {
      return this.players.filter(function(player) {
        return player.name === name;
      })[0] || null;
    };

    p.totalScore = function(name) {
      var roundScores = this.rounds.map(function(round) {
        return round.scoreFor(name);
      });

      var anyScoresReported = roundScores.some(function(roundScore) {
        return roundScore.scoreReported();
      });

      if (anyScoresReported) {
        return roundScores.reduce(function(total, roundScore) {
          return total + roundScore.actualScore || 0;
        }, 0);
      } else {
        return null;
      }
    };

    p.calculateTotalScores = function() {
      this.players.forEach(function(player) {
        player.totalScore = this.totalScore(player.name);
      }, this);
    };

    p.calculateRankings = function() {
      // sort by lowest to highest total score
      var copy = this.players.slice().sort(function(a, b) {
        return a.totalScore - b.totalScore;
      });

      copy.forEach(function(player, index, players) {
        var prevPlayer = players[index - 1];
        // if player's score is same as prev player's score
        if (prevPlayer && player.totalScore === prevPlayer.totalScore) {
          // they're tied and have same rank
          player.rank = prevPlayer.rank;
        } else {
          // player's rank is its one-based position in array
          player.rank = index + 1;
        }
      });
    };

    p.nextRound = function() {
      var index = indexOfCurrentRound(this.rounds);
      this.rounds[index].active = false;
      this.rounds[index].completed = true;

      this.calculateTotalScores();
      this.calculateRankings();

      if (!this.isDone()) {
        this.rounds[index + 1].active = true;
      }
    };

    function indexOfCurrentRound(rounds) {
      for (var i = 0; i < rounds.length; i++) {
        if (rounds[i].active) {
          return i;
        }
      }
      return null;
    }

    p.isDone = function() {
      return this.rounds.every(function(round) {
        return round.completed;
      });
    };

    Object.defineProperty(p, 'playerNames', {
      get: function() {
        return this.players.map(function(player) {
          return player.name;
        });
      }
    });

    return Game;
  });
})(angular);