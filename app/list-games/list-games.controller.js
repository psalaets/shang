;(function(angular) {
  angular.module('app.list-games').controller('ListGamesController', ListGamesController);

  function ListGamesController(games, navigation) {
    this.games = games;

    this.resumeGame = function(game) {
      navigation.goToGame(game.id);
    };

    this.newGame = function() {
      navigation.goToGameSetup();
    };
  }
})(angular);