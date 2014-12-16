;(function(angular) {
  angular.module('app.scorecard').directive('playerRow', playerRow);

  function playerRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/player-row.html',
      scope: {
        players: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function() {
        // controller must exist so scope properties can be accessed in template
      }
    };
  }
})(angular);