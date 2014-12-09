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

    it('creates 7 rounds', function () {
      var game = new Game();

      game.start();

      assert.equal(game.rounds.length, 7);
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
});
