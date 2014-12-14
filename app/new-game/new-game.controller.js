;(function(angular) {
  angular.module('app.new-game')
    .controller('NewGameController', NewGameController);

  function NewGameController(availablePlayers, persistence, navigation, Game) {
    this.availablePlayers = availablePlayers;
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
        this.makeAvailable(this.playerName);
        this.selectPlayer(this.playerName);
        this.playerName = '';
      }
    };

    this.makeAvailable = function(player) {
      if (this.availablePlayers.indexOf(player) == -1) {
        this.availablePlayers.unshift(player);
      }
    };

    this.canBeginGame = function() {
      return this.selectedPlayers.length >= this.minimumPlayersToStart;
    };

    this.beginGame = function() {
      var game = new Game();
      this.selectedPlayers.forEach(game.addPlayer, game);

      game.start();

      return saveAvailablePlayersList(this.availablePlayers)
        .then(saveGame)
        .then(goToGame);

      function saveAvailablePlayersList(availablePlayers) {
        return persistence.setPlayers(availablePlayers);
      };

      function saveGame() {
        return persistence.saveGame(game);
      }

      function goToGame() {
        navigation.goToGame(game.id);
      }
    };
  }
})(angular);