;(function(angular) {
  var models = angular.module('app.models');

  models.factory('Round', function(RoundScore) {
    function Round(name, players) {
      this.name = name;
      this.active = false;
      this.completed = false;

      this.scores = players.map(function(player) {
        return new RoundScore(player);
      });
    }

    Round.fromData = function(data) {
      var round = new Round(data.name, []);
      round.active = data.active;
      round.completed = data.completed;

      round.scores = data.scores.map(function(scoreData) {
        return RoundScore.fromData(scoreData);
      });

      return round;
    };

    var p = Round.prototype;

    p.scoreFor = function(player) {
      return this.scores.filter(function(score) {
        return score.player == player;
      })[0] || null;
    };

    p.allScoresReported = function() {
      return this.scores.every(function(roundScore) {
        return roundScore.scoreReported();
      });
    };

    Object.defineProperty(p, 'shanghai', {
      set: function(shanghai) {
        this.scores.forEach(function(roundScore) {
          roundScore.shanghai = shanghai;
        });
      },
      get: function() {
        return this.scores.some(function(roundScore) {
          return roundScore.shanghai;
        });
      }
    });

    return Round;
  });

})(angular);