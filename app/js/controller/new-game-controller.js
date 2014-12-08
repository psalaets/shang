;(function(angular) {
  angular.module('app.controller')
    .controller('NewGameCtrl', NewGameCtrl);

  function NewGameCtrl(CurrentGame, Game) {
    this.playerName = '';

    this.players = [];

    this.add = function() {
      if (this.playerName) {
        this.players.push(this.playerName);
        this.playerName = '';
      }
    };

    this.remove = function(player) {
      var index = this.players.indexOf(player);
      if (index != -1) {
        this.players.splice(index, 1);
      }
    };

    this.canBeginGame = function() {
      return this.players.length >= 3;
    };

    this.beginGame = function() {
      var game = new Game();
      this.players.forEach(game.addPlayer, game);

      CurrentGame.set(game);
    };
  }
})(angular);