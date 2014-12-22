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

    it('starts round as incomplete', function () {
      var round = new Round('first', []);

      assert.equal(round.completed, false);
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
    it('returns true when every round score has a rawScore', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.scores[0].rawScore = 20;
      round.scores[1].rawScore = 30;

      assert.equal(round.allScoresReported(), true);
    });

    it('false when at least one round score does not have a rawScore', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.scores[0].rawScore = 20;

      assert.equal(round.allScoresReported(), false);
    });
  });

  describe('#shanghai', function () {
    it('setting it to true sets all roundScores shanghai to true', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.shanghai = true;

      assert.equal(round.scores[0].shanghai, true);
      assert.equal(round.scores[1].shanghai, true);
    });

    it('setting it to false sets all roundScores shanghai to false', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.shanghai = true;
      round.shanghai = false;

      assert.equal(round.scores[0].shanghai, false);
      assert.equal(round.scores[1].shanghai, false);
    });

    it('is true if any roundScore shanghai is true', function() {
      var round = new Round('first', ['bob', 'jill']);

      round.scores[1].shanghai = true;

      assert.equal(round.shanghai, true);
    });

    it('is false if all roundScores shanghai are false', function() {
      var round = new Round('first', ['bob', 'jill']);
      round.shanghai = true;

      round.scores[0].shanghai = false;
      round.scores[1].shanghai = false;

      assert.equal(round.shanghai, false);
    });
  });

  describe('.fromData()', function () {
    it('creates Round instance from plain js object', function () {
      var data = {
        name: 'Round 1',
        active: true,
        completed: false,
        scores: [{
          player: 'bob',
          rawScore: 5
        }, {
          player: 'jen',
          rawScore: 0
        }]
      };

      var round = Round.fromData(data);

      assert.equal(round.name, 'Round 1');
      assert.equal(round.active, true);
      assert.equal(round.completed, false);
      assert.equal(round.scores[0].player, 'bob');
      assert.equal(round.scores[0].rawScore, 5);
      assert.equal(round.scores[1].player, 'jen');
      assert.equal(round.scores[1].rawScore, 0);
    });
  });
});
