var assert = chai.assert;

describe('Round', function () {
  var Round;

  beforeEach(module('app'));
  beforeEach(inject(function(_Round_) {
    Round = _Round_;
  }));

  describe('Constructor', function () {
    it('sets name', function () {
      var round = new Round('first', []);

      assert.equal(round.name, 'first');
    });

    it('starts round as inactive', function () {
      var round = new Round('first', []);

      assert.equal(round.active, false);
    });

    it('adds one round score per player', function () {
      var round = new Round('first', ['bob', 'jill']);

      assert.equal(round.scores[0].player, 'bob');
      assert.equal(round.scores[1].player, 'jill');
    });
  });

  describe('#scoreFor()', function () {
    it('returns score for given player', function() {
      var round = new Round('first', ['bob', 'jill']);

      assert.equal(round.scoreFor('bob'), round.scores[0]);
    });

    it('returns null if given player is unknown', function() {
      var round = new Round('first', ['bob', 'jill']);

      assert.equal(round.scoreFor('joan'), null);
    });
  });

  describe('#allScoresReported()', function () {
    it('returns true when every round score has a score', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.scores[0].score = 20;
      round.scores[1].score = 30;

      assert.equal(round.allScoresReported(), true);
    });

    it('false when at least one round score does not have a score', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.scores[0].score = 20;

      assert.equal(round.allScoresReported(), false);
    });
  });

  describe('.fromData()', function () {
    it('creates Round instance from plain js object', function () {
      var data = {
        name: 'Round 1',
        active: true,
        scores: [{
          player: 'bob',
          score: 5
        }, {
          player: 'jen',
          score: 0
        }]
      };

      var round = Round.fromData(data);

      assert.equal(round.name, 'Round 1');
      assert.equal(round.active, true);
      assert.equal(round.scores[0].player, 'bob');
      assert.equal(round.scores[0].score, 5);
      assert.equal(round.scores[1].player, 'jen');
      assert.equal(round.scores[1].score, 0);
    });
  });
});
