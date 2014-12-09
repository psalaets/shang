;(function(angular) {
  angular.module('app.models').value('RoundScore', RoundScore);

  function RoundScore(player) {
    this.player = player;
    this.rawScore = null;
    this.perfectDeal = false;
    this.shanghai = false;
  }

  var p = RoundScore.prototype;

  Object.defineProperty(p, 'actualScore', {
    get: function() {
      var actualScore = this.rawScore || 0;

      if (this.perfectDeal) {
        actualScore -= 5;
      }

      if (this.shanghai && actualScore > 0) {
        actualScore *= 2;
      }

      return actualScore;
    }
  });

})(angular);