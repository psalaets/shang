var assert = chai.assert;

describe('Player', function () {
  var Player;

  beforeEach(module('app'));
  beforeEach(inject(function(_Player_) {
    Player = _Player_;
  }));

  describe('constructor', function () {
    it('sets name', function() {
      var player = new Player('bob');

      assert.equal(player.name, 'bob');
    });

    it('sets wilds to 0', function() {
      var player = new Player('bob');

      assert.equal(player.wilds, 0);
    });

    it('sets rank to null', function() {
      var player = new Player('bob');

      assert.equal(player.rank, null);
    });

    it('sets totalScore to null', function() {
      var player = new Player('bob');

      assert.equal(player.totalScore, null);
    });
  });

  describe('#addWild()', function() {
    it('increases wild count by 1', function() {
      var player = new Player('bob');

      player.addWild();

      assert.equal(player.wilds, 1);
    });
  });

  describe('#removeWild()', function() {
    it('decreases wild count by 1', function() {
      var player = new Player('bob');
      player.addWild();
      player.addWild();

      player.removeWild();

      assert.equal(player.wilds, 1);
    });

    it('cannot make wild count be negative', function() {
      var player = new Player('bob');

      player.removeWild();

      assert.equal(player.wilds, 0);
    });
  });

  describe('.fromData()', function() {
    it('restores player', function() {
      var data = {
        name: 'joe',
        rank: 1,
        wilds: 10,
        totalScore: 100
      };

      var player = Player.fromData(data);

      assert.equal(player instanceof Player, true);
      assert.equal(player.name, 'joe');
      assert.equal(player.rank, 1);
      assert.equal(player.wilds, 10);
      assert.equal(player.totalScore, 100);
    });
  });
});