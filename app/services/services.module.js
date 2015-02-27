angular.module('app.services', [
  'app.models',
  // offline storage
  'LocalForageModule'
]).config(function($localForageProvider) {
  // set up a namespace for the underlying localforage instance
  $localForageProvider.config({
    name: 'Shanghai Rummy'
  });
});