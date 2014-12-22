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
        this.popoverConfig = {
          trigger: 'click',
          title: 'Enter score for ' + this.roundScore.player,
          autoClose: true
        };
      }
    };
  }
})(angular);