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

    return Game;
  });
})(angular);