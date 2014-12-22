angular.module('app', [
  'app.models',
  'app.services',
  'app.title',
  'app.new-game',
  'app.play-game',
  'app.scorecard',
  'app.templates',
  'app.danger',
  // routing
  'ngRoute',
  // offline storage
  'LocalForageModule'
]);