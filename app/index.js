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

app.controller('TitleCtrl', function($location) {
  this.newGame = function() {
    $location.path('/games/new')
  };
});


app.controller('NewGameCtrl', function() {
  this.playerName = '';

  this.players = [];

  this.add = function() {
    this.players.push(this.playerName);
    this.playerName = '';
  };

  this.remove = function(player) {
    var index = this.players.indexOf(player);
    if (index != -1) {
      this.players.splice(index, 1);
    }
  };
});
