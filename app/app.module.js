angular.module('app', [
  'app.services',
  // routes
  'app.title',
  'app.new-game',
  'app.play-game',
  'app.scorecard',
  'app.danger',
  // partials are inlined under this namespace
  'app.templates',
  // routing
  'ngRoute'
]);