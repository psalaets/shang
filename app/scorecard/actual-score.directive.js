;(function(angular) {
  angular.module('app.scorecard').directive('actualScore', actualScore);

  function actualScore() {
    return {
      restrict: 'E',
      templateUrl: 'scorecard/actual-score.html',
      scope: {
        round: '=',
        roundScore: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function() {
        this.actualScore = function() {
          var actual = this.roundScore.actualScore;
          if (actual || actual === 0) {
            return actual;
          } else {
            return 'Enter Score';
          }
        };

        this.popoverConfig = {
          trigger: 'click',
          title: 'Enter score for ' + this.roundScore.player
        };
      }
    };
  }
})(angular);