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

  describe('#scoreReported()', function () {
    it('returns true when score has been set', function() {
      var roundScore = new RoundScore('billy');

      roundScore.score = 10;

      assert.equal(roundScore.scoreReported(), true);
    });

    it('returns false when score has never been set', function() {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.scoreReported(), false);
    });

    it('returns false when score is undefined', function() {
      var roundScore = new RoundScore('billy');

      roundScore.score = void 0;

      assert.equal(roundScore.scoreReported(), false);
    });

    it('returns false when score is null', function() {
      var roundScore = new RoundScore('billy');

      roundScore.score = null;

      assert.equal(roundScore.scoreReported(), false);
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
