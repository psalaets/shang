;(function(angular) {
  angular.module('app.new-game')
    .controller('NewGameCtrl', NewGameCtrl);

  function NewGameCtrl(NavigationService, CurrentGame, Game) {
    this.players = [];
    this.playerName = '';

    this.addFromPlayerName = function() {
      if (this.playerName) {
        this.add(this.playerName);
        this.playerName = '';
      }
    };

    this.add = function(name) {
      this.players.push(name);
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
      NavigationService.goToGame();
    };
  }
})(angular);