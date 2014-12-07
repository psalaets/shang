;(function(angular) {
  angular.module('app.controller')
    .controller('TitleCtrl', TitleCtrl);

  function TitleCtrl($location) {
    this.newGame = function() {
      $location.path('/games/new')
    };
  }
})(angular);
