;(function(angular) {
  angular.module('app.models').factory('Game', function(Round) {
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

      this.wildsByPlayer = {};
    }

    Game.fromData = function(data) {
      var game = new Game();

      game.rounds = data.rounds.map(function(roundData) {
        return Round.fromData(roundData);
      });

      game.id = data.id;
      game.players = data.players;
      game.startTime = new Date(data.startTime);
      game.wildsByPlayer = data.wildsByPlayer;

      return game;
    };

    var p = Game.prototype;

    p.addPlayer = function(name) {
      this.players.push(name);
    };

    p.getPlayers = function() {
      return this.players.slice();
    };

    p.start = function() {
      this.rounds = roundNames.map(function(name) {
        return new Round(name, this.players);
      }, this);

      this.rounds[0].active = true;
      this.startTime = new Date();
    };

    p.addWild = function(player) {
      this.wildsByPlayer[player] = this.wildsByPlayer[player] || 0;
      this.wildsByPlayer[player] += 1;
    };

    p.removeWild = function(player) {
      if (this.wildsByPlayer[player]) {
        this.wildsByPlayer[player] -= 1;
      }
    };

    p.countWilds = function(player) {
      return this.wildsByPlayer[player] || 0;
    };

    p.totalScore = function(player) {
      return this.rounds.reduce(function(total, round) {
        var roundScore = round.scoreFor(player);
        return total + roundScore.score || 0;
      }, 0);
    };

    p.nextRound = function() {
      var index = indexOfCurrentRouund(this.rounds);
      this.rounds[index].active = false;
      this.rounds[index].completed = true;

      if (!this.isDone()) {
        this.rounds[index + 1].active = true;
      }
    };

    function indexOfCurrentRouund(rounds) {
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

    return Game;
  });
})(angular);