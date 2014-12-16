;(function(angular) {
  angular.module('app.services').factory('rules', rules);

  function rules() {
    return {
      // minimum players needed to start a game
      minimumPlayersToStart: 3,
      // number of decks needed
      decksNeeded: function(playerCount) {
        return Math.ceil(playerCount / 2);
      }
    };
  }
})(angular);