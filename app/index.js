var angular = require('angular');

var app = angular.module('app', []);

app.controller('IndexCtrl', function($scope) {
  $scope.message = 'hello';
});
