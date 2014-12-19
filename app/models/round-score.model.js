;(function(angular) {
  angular.module('app.models').value('RoundScore', RoundScore);

  function RoundScore(player) {
    this.player = player;
    this.score = null;
  }

  var p = RoundScore.prototype;

  p.scoreReported = function() {
    return this.score !== null && this.score !== void 0;
  };

  p.wentOut = function() {
    return this.score === 0;
  };

  RoundScore.fromData = function(data) {
    var roundScore = new RoundScore(data.player);
    roundScore.score = data.score;
    return roundScore;
  };
})(angular);