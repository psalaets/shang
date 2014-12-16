;(function(angular) {
  angular.module('app.models').value('Player', Player);

  function Player(name) {
    this.name = name;
    this.wilds = 0;
    this.rank = null;
  }

  var p = Player.prototype;

  p.addWild = function() {
    this.wilds += 1;
  };

  p.removeWild = function() {
    if (this.wilds) {
      this.wilds -= 1;
    }
  };
})(angular);