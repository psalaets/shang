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
      controller: function($scope) {

      },
      link: function(scope, element) {
        function highlightActiveRow(activeFlag) {
          if (activeFlag) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        }

        scope.watch('round.active', highlightActiveRow);
        highlightActiveRow(scope.round.active);
      }
    };
  }
})(angular);