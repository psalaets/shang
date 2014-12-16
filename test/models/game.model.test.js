var assert = chai.assert;

describe('Game', function () {
  var Game;

  beforeEach(module('app'));
  beforeEach(inject(function(_Game_) {
    Game = _Game_;
  }));

  it('starts with no players', function () {
    var game = new Game();

    assert.equal(game.players.length, 0);
  });

  describe('#addPlayer()', function() {
    it('adds player to player list', function () {
      var game = new Game();

      game.addPlayer('bob');
      game.addPlayer('amber');

      assert.equal(game.players[0].name, 'bob');
      assert.equal(game.players[1].name, 'amber');
    });
  });

  describe('#getPlayer()', function() {
    it('gets player by name', function() {
      var game = new Game();

      game.addPlayer('bob');

      assert.equal(game.getPlayer('bob').name, 'bob');
    });

    it('returns null if there is no player by that name', function() {
      var game = new Game();

      assert.equal(game.getPlayer('bob'), null);
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
      game.addPlayer('bob');
      game.addPlayer('amber');

      game.start();

      assert.equal(game.rounds.length, 7);
    });

    it('activates first round', function () {
      var game = new Game();
      game.addPlayer('bob');
      game.addPlayer('amber');

      game.start();

      assert.equal(game.rounds[0].active, true);
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

  describe('#nextRound()', function () {
    it('deactivates and completes current round and activates round after it', function() {
      var game = new Game();
      game.addPlayer('amber');
      game.start();

      assert.equal(game.rounds[0].active, true);
      assert.equal(game.rounds[0].completed, false);

      assert.equal(game.rounds[1].active, false);

      game.nextRound();

      assert.equal(game.rounds[0].active, false);
      assert.equal(game.rounds[0].completed, true);

      assert.equal(game.rounds[1].active, true);
    });

    it('game is done when current round was last round', function() {
      var game = new Game();
      game.addPlayer('amber');
      game.start();

      game.nextRound(); // mark round 1 done
      game.nextRound(); // mark round 2 done
      game.nextRound(); // mark round 3 done
      game.nextRound(); // mark round 4 done
      game.nextRound(); // mark round 5 done
      game.nextRound(); // mark round 6 done
      game.nextRound(); // mark (last) round 7 done

      assert.equal(game.isDone(), true);
    });
  });

  describe('.fromData()', function () {
    it('creates game instance from js object', function() {
      var startTimeString = '2014-12-09T07:20:11Z';
      var startTimeDate = new Date(startTimeString);

      var data = {
        id: 4,
        players: [{
          name: 'bob',
          wilds: 2
        }, {
          name: 'joe',
          wilds: 1
        }],
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
        startTime: startTimeString
      };

      var game = Game.fromData(data);

      assert.equal(game.id, 4);
      assert.equal(game.players[0].name, 'bob');
      assert.equal(game.players[0].wilds, 2);
      assert.equal(game.players[1].name, 'joe');
      assert.equal(game.players[1].wilds, 1);
      assert.deepEqual(game.startTime, startTimeDate);
      assert.equal(game.rounds.length, 1);
    });
  });
});
