;(function(angular) {
  angular.module('app.scorecard').directive('scorecard', scorecardDirective);

  function scorecardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'scorecard/scorecard.html',
      scope: {
        game: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function($scope, persistence, navigation) {
        var vm = this;

        $scope.$on('round-finished', function() {
          vm.game.nextRound();
          persistence.saveGame(vm.game);
        });

        vm.gameOver = function() {
          navigation.goToTitle();
        };
      }
    };
  }
})(angular);