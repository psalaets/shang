/*
* Build process generates some angular constants in a config block of this
* module. That's the only purpose this module serves.
*/
angular.module('app.config', [])
  // Hack: since angular let's things be defined twice this is the config for
  // dev. Now everywhere that 'config' is used we have to provide defaults since
  // config could be empty. Doing this because there isn't a build step in dev,
  // yet.
  .constant('config', {});