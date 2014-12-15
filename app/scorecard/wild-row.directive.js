;(function(angular) {
  angular.module('app.scorecard').directive('wildRow', wildRow);

  function wildRow() {
    return {
      restrict: 'A',
      templateUrl: 'scorecard/wild-row.html',
      scope: {
        game: '='
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: function() {
        this.count = function(player) {
          return this.game.countWilds(player);
        };

        this.add = function(player) {
          this.game.addWild(player);
        };

        this.remove = function(player) {
          this.game.removeWild(player);
        };
      }
    };
  }
})(angular);