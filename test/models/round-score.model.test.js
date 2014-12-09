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

    it('starts raw score as null', function () {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.rawScore, null);
    });

    it('starts perfect deal as false', function () {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.perfectDeal, false);
    });

    it('starts shanghai as false', function () {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.shanghai, false);
    });
  });

  describe('#actualScore', function () {
    describe('rawScore has never been set', function () {
      it('is 0', function() {
        var roundScore = new RoundScore('billy');

        assert.equal(roundScore.actualScore, 0);
      });
    });

    describe('rawScore is > 0', function () {
      it('is same as raw score', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;

        assert.equal(roundScore.actualScore, 100);
      });

      it('is 5 less than raw score when perfect deal is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.perfectDeal = true;

        assert.equal(roundScore.actualScore, 95);
      });

      it('is 2x raw score when shanghai is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.shanghai = true;

        assert.equal(roundScore.actualScore, 200);
      });

      it('is 2x of 5 less than raw score when shanghai and perfect deal are true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.shanghai = true;
        roundScore.perfectDeal = true;

        assert.equal(roundScore.actualScore, 190);
      });
    });

    describe('rawScore is 0', function () {
      it('is same as rawScore, when shanghai is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 0;
        roundScore.shanghai = true;

        assert.equal(roundScore.actualScore, 0);
      });

      it('is 5 less than rawScore, when shanghai and perfect deal are true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 0;
        roundScore.shanghai = true;
        roundScore.perfectDeal = true;

        assert.equal(roundScore.actualScore, -5);
      });
    });
  });
});
