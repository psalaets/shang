;(function(angular) {
  angular.module('app.title')
    .controller('TitleController', TitleController);

  function TitleController(gameCount, navigation) {
    this.gameCount = gameCount;

    this.newGame = function() {
      navigation.goToGameSetup();
    };

    this.resume = function() {
      navigation.goToGamesList();
    };
  }
})(angular);
