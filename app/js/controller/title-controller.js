;(function(angular) {
  var module = angular.module('app.controller');

  module.controller('TitleCtrl', TitleCtrl);

  function TitleCtrl($location) {
    this.newGame = function() {
      $location.path('/games/new')
    };
  }
})(angular);
