;(function(angular) {
  var currentGame = {
    get: function() {
      return this.game;
    },
    set: function(game) {
      this.game = game;
    }
  };

  angular.module('app.service')
    .factory('CurrentGame', currentGame);
})(angular);
