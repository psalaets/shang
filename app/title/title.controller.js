;(function(angular) {
  angular.module('app.title')
    .controller('TitleController', TitleController);

  function TitleController(NavigationService) {
    this.newGame = function() {
      NavigationService.goToGameSetup();
    };
  }
})(angular);
