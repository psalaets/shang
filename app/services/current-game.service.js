;(function(angular) {
  var currentGame = {
    game: null,
    get: function() {
      return this.game;
    },
    set: function(game) {
      this.game = game;
    }
  };

  angular.module('app.services')
    .factory('currentGame', function() {
      return currentGame;
    });
})(angular);
