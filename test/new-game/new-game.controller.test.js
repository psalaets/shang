var assert = chai.assert;

describe('new game controller', function () {
  var controller, scope;

  beforeEach(module('app'));
  beforeEach(inject(function($controller, $rootScope, _navigation_, _currentGame_, _Game_) {
    scope = $rootScope.$new();
    controller = $controller('NewGameController as setup', {
      $scope: scope,
      navigation: _navigation_,
      currentGame: _currentGame_,
      Game: _Game_
    });
  }));

  describe('add()', function () {
    it('adds player to player list', function () {
      controller.add('bob');

      assert.deepEqual(controller.players, ['bob']);
    });
  });

  describe('addFromPlayerName()', function () {
    it('adds playerName value to player list', function () {
      controller.playerName = 'bob';

      controller.addFromPlayerName();

      assert.deepEqual(controller.players, ['bob']);
    });

    it('reset playerName value to empty string', function () {
      controller.playerName = 'bob';

      controller.addFromPlayerName();

      assert.equal(controller.playerName, '');
    });

    it('does not add player if playerName is blank', function () {
      controller.playerName = '';

      controller.addFromPlayerName();

      assert.deepEqual(controller.players, []);
    });
  });

  describe('remove()', function () {
    it('removes player from list by name', function () {
      controller.add('bob');
      controller.add('jill');

      controller.remove('bob');

      assert.deepEqual(controller.players, ['jill']);
    });
  });

  describe('canBeginGame()', function () {
    it('is false until at least three players are in list', function() {
      controller.add('bob');
      controller.add('jill');

      assert(!controller.canBeginGame());

      controller.add('jan');

      assert(controller.canBeginGame());
    });
  });

  describe('beginGame()', function () {
    var currentGame, navigation;

    beforeEach(inject(function(_currentGame_, _navigation_) {
      currentGame = _currentGame_;
      navigation = _navigation_;

      spyOn(navigation, 'goToGame');
    }));

    it('starts a new game with given players as current game', function() {
      controller.add('jill');
      controller.add('joe');
      controller.add('jen');

      controller.beginGame();

      var game = currentGame.get();

      assert.ok(game);
      assert.ok(game.startTime);
      assert.deepEqual(game.getPlayers(), ['jill', 'joe', 'jen']);
    });

    it('navigates to game', function() {
      controller.add('jill');
      controller.add('joe');
      controller.add('jen');

      controller.beginGame();

      assert.equal(navigation.goToGame.calls.count(), 1);
    });
  });
});
