;(function(angular) {
  var models = angular.module('app.models');

  models.factory('Round', function(RoundScore) {
    function Round(name, players) {
      this.name = name;
      this.active = false;

      this.scores = players.map(function(player) {
        return new RoundScore(player);
      });
    }

    return Round;
  });

})(angular);