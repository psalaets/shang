angular.module('app', [
  'app.models',
  'app.services',
  'app.title',
  'app.new-game',
  'app.play-game',
  'app.scorecard',
  'app.templates',
  // routing
  'ngRoute',
  // offline storage
  'LocalForageModule'
]);