;(function(angular) {
  angular.module('app.scorecard').directive('playerRow', playerRow);

  function playerRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/player-row.html',
      scope: {
        players: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function(navigation) {
        this.goHome = function() {
          navigation.goToTitle();
        };
      }
    };
  }
})(angular);