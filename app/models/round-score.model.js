;(function(angular) {
  angular.module('app.models').value('RoundScore', RoundScore);

  function RoundScore(player) {
    this.player = player;
    this.score = null;
  }

  RoundScore.fromData = function(data) {
    var roundScore = new RoundScore(data.player);
    roundScore.score = data.score;
    return roundScore;
  };
})(angular);