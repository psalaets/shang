;(function(angular) {
  /**
  * Taken from http://stackoverflow.com/a/14859639
  */
  angular.module('app.scorecard').directive('instafocus', instafocus);

  function instafocus($timeout) {
    return {
      link: function (scope, element) {
        var timeoutPromise = $timeout(focusElement, 100); // seems hacky :(

        function focusElement() {
          element[0].focus();
        }

        // cancel possiblly pending timeout when scope goes away
        scope.$on('$destroy', function() {
          $timeout.cancel(timeoutPromise);
        });
      }
    };
  }
})(angular);