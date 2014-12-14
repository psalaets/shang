;(function(angular) {
  angular.module('app.new-game')
    .controller('NewGameController', NewGameController);

  function NewGameController(persistence, navigation, Game) {
    this.availablePlayers = [];
    this.selectedPlayers = [];
    this.playerName = '';
    this.minimumPlayersToStart = 3;

    this.selectPlayer = function(player) {
      this.selectedPlayers.push(player);
    };

    this.deselectPlayer = function(player) {
      var index = this.selectedPlayers.indexOf(player);
      if (index != -1) {
        this.selectedPlayers.splice(index, 1);
      }
    };

    this.isSelected = function(player) {
      return this.selectedPlayers.indexOf(player) != -1;
    };

    this.toggleSelection = function(player) {
      if (this.isSelected(player)) {
        this.deselectPlayer(player);
      } else {
        this.selectPlayer(player);
      }
    };

    this.selectEnteredPlayer = function() {
      if (this.playerName) {
        this.availablePlayers.push(this.playerName);
        this.selectPlayer(this.playerName);
        this.playerName = '';
      }
    };

    this.canBeginGame = function() {
      return this.selectedPlayers.length >= this.minimumPlayersToStart;
    };

    this.beginGame = function() {
      var game = new Game();
      this.selectedPlayers.forEach(game.addPlayer, game);

      game.start();
      return persistence.saveGame(game).then(function(game) {
        navigation.goToGame(game.id);
      });
    };
  }
})(angular);