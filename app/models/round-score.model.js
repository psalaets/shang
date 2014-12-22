;(function(angular) {
  angular.module('app.models').value('RoundScore', RoundScore);

  function RoundScore(player) {
    this.player = player;
    this.rawScore = null;
    this.perfectDeal = false;
    this.shanghai = false;
  }

  var p = RoundScore.prototype;

  p.scoreReported = function() {
    return this.rawScore !== null && this.rawScore !== void 0;
  };

  p.wentOut = function() {
    return this.rawScore === 0;
  };

  Object.defineProperty(p, 'actualScore', {
    get: function() {
      if (!this.scoreReported()) return null;

      var actualScore = this.rawScore;

      if (this.perfectDeal) {
        actualScore -= 5;
      }

      if (this.shanghai && actualScore > 0) {
        actualScore *= 2;
      }

      return actualScore;
    }
  });

  RoundScore.fromData = function(data) {
    var roundScore = new RoundScore(data.player);
    roundScore.rawScore = data.rawScore;
    roundScore.perfectDeal = data.perfectDeal;
    roundScore.shanghai = data.shanghai;
    return roundScore;
  };
})(angular);