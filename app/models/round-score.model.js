;(function(angular) {
  angular.module('app.models').value('RoundScore', RoundScore);

  function RoundScore(player) {
    this.player = player;
    this.rawScore = null;
    this.perfectDeal = false;
    this.shanghai = false;
  }

  var p = RoundScore.prototype;

  p.togglePerfectDeal = function() {
    this.perfectDeal = !this.perfectDeal;
  };

  p.toggleShanghai = function() {
    this.shanghai = !this.shanghai;
  };

  Object.defineProperty(p, 'actualScore', {
    get: function() {
      var actualScore = this.rawScore || 0;

      if (this.perfectDeal) {
        actualScore -= 5;
      }

      if (this.shanghai) {
        actualScore *= 2;
      }

      return actualScore;
    }
  });

})(angular);