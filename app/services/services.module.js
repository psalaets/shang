angular.module('app.services', [
  'app.models',
  // offline storage
  'LocalForageModule',
  // data migrations
  'angular-localforage-migrations'
])
.config(function($localForageProvider) {
  // set up a namespace for the underlying localforage instance
  $localForageProvider.config({
    name: 'Shanghai Rummy'
  });
})
.config(function(migrationsProvider) {
  migrationsProvider.setInternalNamespace('shanghai rummy')

  migrationsProvider.add({
    id: 1,
    migrate: function($localForage, $q) {
      // old namespace is the angular-localforage default name and storeName
      // https://github.com/ocombe/angular-localForage#configure-the-provider-
      var oldNamespace = $localForage.createInstance({
        name: 'lf',
        storeName: 'keyvaluepairs'
      });

      var changeNamespacePromises = [];

      return oldNamespace.iterate(function(value, key) {
        changeNamespacePromises.push($localForage.setItem(key, value));
      }).then(function() {
        if (changeNamespacePromises.length > 0) {
          return $q.all(changeNamespacePromises);
        }
      }).then(function() {
        // this is best we can do through LF api for cleaning up old namespace
        return oldNamespace.clear();
      });
    }
  });
});