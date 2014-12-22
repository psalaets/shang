;(function(angular) {
  angular.module('app.danger').controller('DangerController', DangerController);

  var timeoutPromises = [];

  function DangerController($scope, $timeout, persistence) {
    this.games = {
      message: '',
      pending: false
    };

    this.clearGames = makeDeleter(this.games, function() {
      return persistence.deleteAllGames();
    });

    this.players = {
      message: '',
      pending: false
    };

    this.clearPlayers = makeDeleter(this.players, function() {
      return persistence.deletePlayers();
    });

    // make sure pending timeouts are cancelled when scope goes away
    $scope.$on('$destroy', function() {
      timeoutPromises.forEach($timeout.cancel, $timeout);
    });

    function makeDeleter(data, deleteFn) {
      return function() {
        // don't let deletes overlap
        if (data.pending) return;

        data.pending = true;
        data.message = 'Deleting...';

        deleteFn().then(done, done);

        function done() {
          data.message = 'Done';
          data.pending = false;

          timeoutPromises.push($timeout(function() {
            data.message = '';
          }, 500));
        }
      };
    }
  }
})(angular);