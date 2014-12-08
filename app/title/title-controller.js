;(function(angular) {
  angular.module('app.controller')
    .controller('TitleCtrl', TitleCtrl);

  function TitleCtrl(NavigationService) {
    this.newGame = function() {
      NavigationService.goToGameSetup();
    };
  }
})(angular);
