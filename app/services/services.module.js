angular.module('app.services', [
  'app.models',
  // offline storage
  'LocalForageModule'
]).config(function($localForageProvider) {
  // namespace the underlying localforage instance
  $localForageProvider.config({
    name: 'Shanghai Rummy'
  });
});