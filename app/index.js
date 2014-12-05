var angular = require('angular');

var app = angular.module('app', ['ngRoute']);

app.config(function appConfig($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/title.html',
      controller: 'IndexCtrl',
      controllerAs: 'main'
    });
});

app.controller('IndexCtrl', function() {
  this.message = 'hello';
});
