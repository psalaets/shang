;(function(angular) {
  angular.module('app.scorecard').directive('wildRow', wildRow);

  function wildRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/wild-row.html',
      scope: {
        players: '=',
        showButtons: '&'
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function() {
        // controller must exist so scope properties can be accessed in template
      }
    };
  }
})(angular);