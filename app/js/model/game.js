;(function(angular) {
  angular.module('app.model')
    .value('Game', Game);

  function Game() {
    this.players = [];
  }

  var p = Game.prototype;

  p.addPlayer = function(name) {
    this.players.push(name);
  };

  p.getPlayers = function() {
    return this.players.slice();
  };
})(angular);