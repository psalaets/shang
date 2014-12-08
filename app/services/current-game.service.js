;(function(angular) {
  angular.module('app.services')
    .factory('currentGame', currentGame);

  function currentGame() {
    return {
      game: null,
      get: function() {
        return this.game;
      },
      set: function(game) {
        this.game = game;
      }
    };
  }
})(angular);
