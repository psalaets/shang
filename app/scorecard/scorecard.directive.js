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
      controller: function($scope, persistence, navigation, $interval) {
        this.minutesElapsed = 0;

        var tickPromise = $interval(function() {
          this.minutesElapsed += 1;
        }.bind(this), 60 * 1000);

        $scope.$on('$destroy', function() {
          $interval.cancel(tickPromise);
        });

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