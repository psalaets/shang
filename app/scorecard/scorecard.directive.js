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
        $scope.$on('round-finished', function() {
          this.game.nextRound();
          persistence.saveGame(this.game);
        }.bind(this));

        this.gameOver = function() {
          navigation.goToTitle();
        };
      }
    };
  }
})(angular);