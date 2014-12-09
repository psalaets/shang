var assert = chai.assert;

describe('Game', function () {
  var Game;

  beforeEach(module('app'));
  beforeEach(inject(function(_Game_) {
    Game = _Game_;
  }));

  it('starts with no players', function () {
    var game = new Game();

    assert.equal(game.getPlayers().length, 0);
  });

  it('starts all players with no wilds', function() {
    var game = new Game();

    game.addPlayer('bob');
    game.addPlayer('amber');

    assert.equal(game.countWilds('bob'), 0);
    assert.equal(game.countWilds('amber'), 0);
  });

  describe('#addPlayer()', function() {
    it('adds player to player list', function () {
      var game = new Game();

      game.addPlayer('bob');
      game.addPlayer('amber');

      assert.deepEqual(game.getPlayers(), ['bob', 'amber']);
    });
  });

  describe('#start()', function() {
    it('sets start time', function() {
      var game = new Game();

      assert.isNull(game.startTime);

      game.start();

      assert.isNotNull(game.startTime);
      assert.ok(game.startTime instanceof Date);
    });

    it('creates rounds with round scores in player order', function () {
      var game = new Game();
      game.addPlayer('bob');
      game.addPlayer('amber');

      game.start();

      assert.equal(game.rounds.length, 7);
      assert.equal(game.rounds[0].scores[0].player, 'bob');
      assert.equal(game.rounds[0].scores[1].player, 'amber');
    });
  });

  describe('#addWild()', function () {
    it('increments wild count for player', function() {
      var game = new Game();
      game.addPlayer('bob');

      game.addWild('bob');

      assert.equal(game.countWilds('bob'), 1);
    });
  });

  describe('#removeWild()', function () {
    it('decrements wild count for a player', function() {
      var game = new Game();
      game.addPlayer('bob');

      game.addWild('bob');
      game.removeWild('bob');

      assert.equal(game.countWilds('bob'), 0);
    });

    it('will not let wild count be negative', function() {
      var game = new Game();
      game.addPlayer('bob');

      game.removeWild('bob');

      assert.equal(game.countWilds('bob'), 0);
    });
  });

  describe('#totalScore()', function () {
    it('returns sum of all round scores for given player', function() {
      var game = new Game();
      game.addPlayer('amber');

      game.start();
      game.rounds[0].scoreFor('amber').score = 10;
      game.rounds[1].scoreFor('amber').score = 50;
      game.rounds[2].scoreFor('amber').score = 100;

      assert.equal(game.totalScore('amber'), 160);
    });
  });

  describe('.fromData()', function () {
    it('creates game instance from js object', function() {
      var startTimeString = '2014-12-09T07:20:11Z';
      var startTimeDate = new Date(startTimeString);

      var data = {
        id: 4,
        players: ['bob', 'joe'],
        rounds: [{
          name: 'Round 1',
          scores: [{
            player: 'bob',
            score: 5
          }, {
            player: 'joe',
            score: 0
          }]
        }],
        wildsByPlayer: {
          bob: 2,
          joe: 1
        },
        startTime: startTimeString
      };

      var game = Game.fromData(data);

      assert.equal(game.id, 4);
      assert.deepEqual(game.getPlayers(), ['bob', 'joe']);
      assert.deepEqual(game.startTime, startTimeDate);
      assert.deepEqual(game.wildsByPlayer, {
        bob: 2,
        joe: 1
      });
      assert.equal(game.rounds.length, 1);
    });
  });
});
