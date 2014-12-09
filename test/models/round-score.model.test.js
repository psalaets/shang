var assert = chai.assert;

describe('RoundScore', function () {
  var RoundScore;

  beforeEach(module('app'));
  beforeEach(inject(function(_RoundScore_) {
    RoundScore = _RoundScore_;
  }));

  describe('Constructor', function () {
    it('sets player', function () {
      var roundScore = new RoundScore('emily');

      assert.equal(roundScore.player, 'emily');
    });

    it('starts score as null', function () {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.score, null);
    });
  });

  describe('.fromData()', function () {
    it('creates RoundScore instance from js object', function() {
      var data = {
        player: 'bob',
        score: 10
      };

      var roundScore = RoundScore.fromData(data);

      assert.equal(roundScore.player, 'bob');
      assert.equal(roundScore.score, 10);
    });
  });
});
