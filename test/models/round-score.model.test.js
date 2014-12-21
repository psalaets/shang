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

    it('starts rawScore as null', function () {
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
      it('is same as rawScore', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;

        assert.equal(roundScore.actualScore, 100);
      });

      it('is 5 less than rawScore when perfect deal is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.perfectDeal = true;

        assert.equal(roundScore.actualScore, 95);
      });

      it('is 2x rawScore when shanghai is true', function() {
        var roundScore = new RoundScore('billy');

        roundScore.rawScore = 100;
        roundScore.shanghai = true;

        assert.equal(roundScore.actualScore, 200);
      });

      it('is 2x of 5 less than rawScore when shanghai and perfect deal are true', function() {
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

  describe('#scoreReported()', function () {
    it('returns true when rawScore has been set', function() {
      var roundScore = new RoundScore('billy');

      roundScore.rawScore = 10;

      assert.equal(roundScore.scoreReported(), true);
    });

    it('returns false when rawScore has never been set', function() {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.scoreReported(), false);
    });

    it('returns false when rawScore is undefined', function() {
      var roundScore = new RoundScore('billy');

      roundScore.rawScore = void 0;

      assert.equal(roundScore.scoreReported(), false);
    });

    it('returns false when rawScore is null', function() {
      var roundScore = new RoundScore('billy');

      roundScore.rawScore = null;

      assert.equal(roundScore.scoreReported(), false);
    });
  });

  describe('#wentOut', function () {
    it('is true if rawScore is zero', function() {
      var roundScore = new RoundScore('billy');

      roundScore.rawScore = 0;

      assert.equal(roundScore.wentOut(), true);
    });

    it('is false if rawScore is greater than zero', function() {
      var roundScore = new RoundScore('billy');

      roundScore.rawScore = 5;

      assert.equal(roundScore.wentOut(), false);
    });

    it('is false if rawScore is not set yet', function() {
      var roundScore = new RoundScore('billy');

      assert.equal(roundScore.wentOut(), false);
    });
  });

  describe('.fromData()', function () {
    it('creates RoundScore instance from js object', function() {
      var data = {
        player: 'bob',
        rawScore: 10,
        perfectDeal: true,
        shanghai: false
      };

      var roundScore = RoundScore.fromData(data);

      assert.equal(roundScore.player, 'bob');
      assert.equal(roundScore.rawScore, 10);
      assert.equal(roundScore.perfectDeal, true);
      assert.equal(roundScore.shanghai, false);
    });
  });
});
