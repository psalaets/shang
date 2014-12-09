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

    return Game;
  });
})(angular);