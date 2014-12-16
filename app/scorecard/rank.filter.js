;(function(angular) {
  angular.module('app.scorecard').filter('rank', createFilter);

  function createFilter() {
    return function(rank) {
      if (!rank) return '';
      if (rank == 11) return '11th';
      if (rank == 12) return '12th';
      if (rank == 13) return '13th';

      var lastDigit = rank.toString().slice(-1);
      var suffix = {
        1: 'st',
        2: 'nd',
        3: 'rd'
      }[lastDigit] || 'th';

      return rank + suffix;
    };
  }
})(angular);