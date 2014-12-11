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
        round: '='
      },
      controllerAs: 'vm',
      bindToController: true,
      controller: function($scope) {
        var vm = this;

        vm.readyForNextRound = function() {
          return vm.round.active && vm.round.allScoresReported();
        };

        vm.nextRound = function() {
          $scope.$emit('round-finished');
        };
      }
    };
  }
})(angular);