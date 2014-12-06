var angular = require('angular');

var app = angular.module('app', ['ngRoute']);

app.config(function appConfig($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/title.html',
      controller: 'TitleCtrl',
      controllerAs: 'shang'
    })
    .when('/games/new', {
      templateUrl: 'templates/game/new.html',
      controller: 'NewGameCtrl',
      controllerAs: 'setup'
    });
});

app.controller('TitleCtrl', require('./lib/controllers/title-controller'));
app.controller('NewGameCtrl', require('./lib/controllers/new-game-controller'));
