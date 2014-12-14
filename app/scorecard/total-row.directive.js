;(function(angular) {
  angular.module('app.scorecard').directive('totalRow', totalRow);

  function totalRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/total-row.html',
      scope: {
        game: '='
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function() {
        this.totalScoreFor = function(player) {
          return this.game.totalScore(player);
        }.bind(this);
      }
    };
  }
})(angular);