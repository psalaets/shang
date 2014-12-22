;(function(angular) {
  angular.module('app.danger').controller('DangerController', DangerController);

  function DangerController(persistence) {
    this.deletingGames = false;
    this.clearGames = function() {
      // don't let deletes overlap
      if (this.deletingGames) return;

      var done = function done() {
        this.deletingGames = false;
      }.bind(this);

      this.deletingGames = true;
      return persistence.deleteAllGames().then(done, done);
    };

    this.deletingPlayers = false;
    this.clearPlayers = function() {
      if (this.deletingPlayers) return;

      var done = function done() {
        this.deletingPlayers = false;
      }.bind(this);

      this.deletingPlayers = true;
      return persistence.deletePlayers().then(done, done);
    };
  }
})(angular);