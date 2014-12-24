;(function(angular) {
  angular.module('app.title')
    .controller('TitleController', TitleController);

  function TitleController(navigation) {
    this.newGame = function() {
      navigation.goToGameSetup();
    };

    this.resume = function() {
      navigation.goToGamesList();
    };
  }
})(angular);
