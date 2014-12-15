;(function(angular) {
  angular.module('app.scorecard').directive('roundRow', roundRowDirective);

  function roundRowDirective() {
    return {
      // This has to be an attribute and the template's root node can't be tr
      // because of browser behavior described in
      // https://github.com/angular/angular.js/issues/1459
      restrict: 'A',
      templateUrl: 'scorecard/round-row.html',
      scope: {
        round: '=',
        lastRound: '@'
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function($scope) {
        this.nextRoundButtonLabel = this.lastRound == 'true' ? 'Game Over' : 'Next Round';

        this.readyForNextRound = function() {
          return this.round.active && this.round.allScoresReported();
        }.bind(this);

        this.nextRound = function() {
          $scope.$emit('round-finished');
        };
      }
    };
  }
})(angular);