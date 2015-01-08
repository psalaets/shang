;(function(angular) {
  angular.module('app.services').factory('iosDetection', iosDetection);

  // from http://stackoverflow.com/a/9039885
  function iosDetection($window) {
    var navigator = $window.navigator;

    return function() {
      var iDeviceRegex = /(iPad|iPhone|iPod)/g;
      return iDeviceRegex.test(navigator.userAgent);
    };
  }
})(angular);