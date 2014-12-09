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

  describe('#togglePerfectDeal()', function () {
    it('1 call turns on perfect deal flag', function () {
      var roundScore = new RoundScore('billy');

      roundScore.togglePerfectDeal();

      assert.equal(roundScore.perfectDeal, true);
    });

    it('2 calls turns off perfect deal flag', function () {
      var roundScore = new RoundScore('billy');

      roundScore.togglePerfectDeal();
      roundScore.togglePerfectDeal();

      assert.equal(roundScore.perfectDeal, false);
    });
  });

  describe('#toggleShanghai()', function () {
    it('1 call turns on shanghai flag', function () {
      var roundScore = new RoundScore('billy');

      roundScore.toggleShanghai();

      assert.equal(roundScore.shanghai, true);
    });

    it('2 calls turns off shanghai flag', function () {
      var roundScore = new RoundScore('billy');

      roundScore.toggleShanghai();
      roundScore.toggleShanghai();

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

    describe('rawScore has been set', function () {
      it('is same as raw score', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;

        assert.equal(roundScore.actualScore, 100);
      });

      it('is 5 less than raw score when perfect deal is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.togglePerfectDeal();

        assert.equal(roundScore.actualScore, 95);
      });

      it('is 2x raw score when shanghai is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.toggleShanghai();

        assert.equal(roundScore.actualScore, 200);
      });

      it('is 2x of 5 less than raw score when shanghai and perfect deal are true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.toggleShanghai();
        roundScore.togglePerfectDeal();

        assert.equal(roundScore.actualScore, 190);
      });
    });
  });
});
