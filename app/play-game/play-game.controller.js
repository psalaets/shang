;(function(angular) {
  angular.module('app.play-game')
    .controller('PlayGameController', PlayGameController);

  function PlayGameController(currentGame) {
    this.game = currentGame;
  }
})(angular);