;(function(angular) {
  angular.module('app.scorecard').directive('scorecard', scorecardDirective);

  function scorecardDirective() {
    return {
      restrict: 'E',
      templateUrl: 'scorecard/scorecard.html',
      scope: {
        game: '='
      },
      controller: function($scope, persistence, navigation) {
        $scope.$on('round-finished', function() {
          $scope.game.nextRound();
          persistence.saveGame($scope.game);
        });

        $scope.gameOver = function() {
          navigation.goToTitle();
        };
      }
    };
  }
})(angular);