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

  it('can add players', function () {
    var game = new Game();

    game.addPlayer('bob');
    game.addPlayer('amber');

    assert.deepEqual(game.getPlayers(), ['bob', 'amber']);
  });
});
