;(function(angular) {
  var module = angular.module('app.controller');

  module.controller('NewGameCtrl', NewGameCtrl);

  function NewGameCtrl() {
    this.playerName = '';

    this.players = [];

    this.add = function() {
      if (this.playerName) {
        this.players.push(this.playerName);
        this.playerName = '';
      }
    };

    this.remove = function(player) {
      var index = this.players.indexOf(player);
      if (index != -1) {
        this.players.splice(index, 1);
      }
    };
  }
})(angular);