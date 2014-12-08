;(function(angular) {
  angular.module('app.new-game')
    .controller('NewGameController', NewGameController);

  function NewGameController(navigation, currentGame, Game) {
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

    this.minimumPlayersToStart = 3;
    this.canBeginGame = function() {
      return this.players.length >= this.minimumPlayersToStart;
    };

    this.beginGame = function() {
      var game = new Game();
      this.players.forEach(game.addPlayer, game);

      currentGame.set(game);
      navigation.goToGame();
    };
  }
})(angular);