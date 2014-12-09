;(function(angular) {
  angular.module('app.models')
    .value('Game', Game);

  function Game() {
    this.players = [];
    this.startTime = null;
  }

  var p = Game.prototype;

  p.addPlayer = function(name) {
    this.players.push(name);
  };

  p.getPlayers = function() {
    return this.players.slice();
  };

  p.start = function() {
    this.startTime = new Date();
  };
})(angular);