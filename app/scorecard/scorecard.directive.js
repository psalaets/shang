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
      controller: function($scope, gameLifeCycle, $interval) {
        this.minutesElapsed = 0;

        var tickPromise = $interval(function() {
          this.minutesElapsed += 1;
        }.bind(this), 60 * 1000);

        $scope.$on('$destroy', function() {
          $interval.cancel(tickPromise);
        });

        $scope.$on('round-finished', function() {
          gameLifeCycle.roundFinished(this.game);
        }.bind(this));

        this.doneWithGame = function() {
          gameLifeCycle.postGame(this.game);
        };
      }
    };
  }
})(angular);