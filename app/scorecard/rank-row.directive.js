;(function(angular) {
  angular.module('app.scorecard').directive('rankRow', rankRow);

  function rankRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/rank-row.html',
      scope: {
        players: '='
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function() {
        this.isFirst = function(player) {
          return player.rank === 1;
        }
      }
    };
  }
})(angular);