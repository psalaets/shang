;(function(angular) {
  angular.module('app.list-games').filter('sentence', sentence);

  function sentence() {
    return function(array) {
      if (array.length == 0) return '';
      if (array.length == 1) return array[0];

      var copy = array.slice();
      var last = copy.pop();

      return copy.join(', ') + ' and ' + last;
    };
  }
})(angular);