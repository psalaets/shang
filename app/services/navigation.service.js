;(function(angular) {
  angular.module('app.services')
    .factory('NavigationService', navService);

  function navService($location) {
    return {
      goToGameSetup: function() {
        $location.path('/games/new');
      },
      goToGame: function() {
        $location.path('/games/current')
      }
    };
  }
})(angular);