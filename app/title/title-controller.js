;(function(angular) {
  angular.module('app.title')
    .controller('TitleCtrl', TitleCtrl);

  function TitleCtrl(NavigationService) {
    this.newGame = function() {
      NavigationService.goToGameSetup();
    };
  }
})(angular);
