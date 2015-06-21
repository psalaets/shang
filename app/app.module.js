angular.module('app', [
  'app.services',
  // routes
  'app.title',
  'app.new-game',
  'app.play-game',
  'app.scorecard',
  'app.list-games',
  'app.danger',
  // partials are inlined under this namespace
  'app.templates',
  // the build defines constants in a config block under this namespace
  'app.config',
  // routing
  'ngRoute'
]).config(function(config, $compileProvider) {
  var enabled = 'debugInfoEnabled' in config ? config.debugInfoEnabled : true;
  $compileProvider.debugInfoEnabled(enabled);
});