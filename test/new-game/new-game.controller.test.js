var assert = chai.assert;

describe('new game controller', function () {
  var controller, scope;

  beforeEach(module('app'));
  beforeEach(inject(function($controller, $rootScope, _persistence_, _navigation_, _Game_) {
    scope = $rootScope.$new();
    controller = $controller('NewGameController as setup', {
      $scope: scope,
      persistence: _persistence_,
      navigation: _navigation_,
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
    var navigation, persistence, $rootScope;
    var gameId = 10;

    beforeEach(inject(function(_navigation_, _persistence_, $q, _$rootScope_) {
      navigation = _navigation_;
      persistence = _persistence_;
      $rootScope = _$rootScope_;

      var savedGame;
      spyOn(persistence, 'saveGame').and.callFake(function(game) {
        savedGame = game;
        game.id = gameId;

        return $q(function(resolve, reject) {
          resolve(game);
        });
      });
      spyOn(persistence, 'loadGame').and.callFake(function(id) {
        return $q(function(resolve, reject) {
          resolve(savedGame);
        });
      });

      spyOn(navigation, 'goToGame');
    }));

    it('starts a new game with given players as current game', function(done) {
      controller.add('jill');
      controller.add('joe');
      controller.add('jen');

      controller.beginGame()
        .then(loadFakeGame)
        .then(assertGameState)
        .finally(done);

      function loadFakeGame() {
        return persistence.loadGame('doesnt matter');
      }

      function assertGameState(game) {
        assert.ok(game.startTime);
        assert.deepEqual(game.getPlayers(), ['jill', 'joe', 'jen']);
      }

      // must call this to make $q promise chains go
      $rootScope.$apply();
    });

    it('navigates to game', function(done) {
      controller.add('jill');
      controller.add('joe');
      controller.add('jen');

      controller.beginGame()
        .then(assertNavigation)
        .finally(done);

      function assertNavigation() {
        // this should be jasmine's expect and not chai's
        expect(navigation.goToGame).toHaveBeenCalledWith(gameId);
      }

      // must call this to make $q promise chains go
      $rootScope.$apply();
    });
  });
});
