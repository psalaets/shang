;(function(angular) {
  angular.module('app.services')
    .factory('navigation', navService);

  function navService($location) {
    return {
      goToGameSetup: function() {
        $location.path('/new');
      },
      goToGame: function() {
        $location.path('/play');
      }
    };
  }
})(angular);