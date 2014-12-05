var angular = require('angular');

var app = angular.module('app', ['ngRoute']);

app.controller('IndexCtrl', function($scope) {
  $scope.message = 'hello';
});
