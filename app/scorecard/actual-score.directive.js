;(function(angular) {
  angular.module('app.scorecard').directive('actualScore', actualScore);

  function actualScore() {
    return {
      restrict: 'E',
      templateUrl: 'scorecard/actual-score.html',
      scope: {
        round: '=',
        roundScore: '=',
        index: '@'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function($scope) {
        var index = parseInt(this.index, 10);

        this.actualScore = function() {
          var actual = this.roundScore.actualScore;
          if (actual || actual === 0) {
            return actual;
          } else {
            return 'Enter Score';
          }
        };

        /** Begin stuff for actual-score-popover.html **/

        this.popoverPosition = function() {
          var middle = (this.round.scores.length - 1) / 2;
          if (index < middle) {
            return 'right';
          } else {
            return 'left';
          }
        };

        // propagate shanghai flag to round if player achieved it
        $scope.$watch('vm.roundScore.gotShanghai', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            this.round.shanghai = newValue;
          }
        }.bind(this));

        /** End stuff for actual-score-popover.html **/
      }
    };
  }
})(angular);