;(function(angular) {
  angular.module('app.scorecard').filter('duration', createDurationFilter);

  function createDurationFilter() {
    return function(rawMinutes) {
      rawMinutes = rawMinutes || 0;

      var hours = Math.floor(rawMinutes / 60);
      var minutes = rawMinutes % 60;

      var parts = [];

      if (hours) {
        parts.push(hours + ' hr');
      }

      if (minutes) {
        parts.push(minutes + ' min');
      }

      if (!parts.length) {
        parts.push('less than 1 minute');
      }

      return parts.join(' ');
    }
  }
})(angular);