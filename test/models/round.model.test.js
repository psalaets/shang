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
});
