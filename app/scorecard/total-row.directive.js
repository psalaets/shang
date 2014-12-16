;(function(angular) {
  angular.module('app.scorecard').directive('totalRow', totalRow);

  function totalRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/total-row.html',
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