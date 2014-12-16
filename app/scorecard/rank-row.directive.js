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
        // controller must exist so scope properties can be accessed in template
      }
    };
  }
})(angular);