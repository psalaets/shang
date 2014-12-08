var assert = chai.assert;

describe('new game controller', function () {
  var controller, scope;

  beforeEach(module('app'));
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('NewGameCtrl as setup', {
      $scope: scope
    });
  }));

  describe('add()', function () {
    it('adds playerName to player list', function () {
      controller.playerName = 'bob';

      controller.add();

      assert.deepEqual(controller.players, ['bob']);
      assert.equal(controller.playerName, '');
    });

    it('does not add player if playerName is blank', function () {
      controller.playerName = '';

      controller.add();

      assert.deepEqual(controller.players, []);
    });
  });

  describe('remove()', function () {
    it('removes player from list by name', function () {
      controller.playerName = 'bob';
      controller.add();

      controller.playerName = 'jill';
      controller.add();

      controller.remove('bob');

      assert.deepEqual(controller.players, ['jill']);
    });
  });

  describe('canBeginGame()', function () {
    it('is false until at least three players are in list', function() {
      controller.playerName = 'bob';
      controller.add();

      controller.playerName = 'jill';
      controller.add();

      assert(!controller.canBeginGame());

      controller.playerName = 'jan';
      controller.add();

      assert(controller.canBeginGame());
    });
  });

  describe('beginGame()', function () {
    var CurrentGame;

    beforeEach(inject(function(_CurrentGame_) {
      CurrentGame = _CurrentGame_;
    }));

    it('sets a new game as current game', function() {
      controller.playerName = 'jill';
      controller.add();

      controller.playerName = 'joe';
      controller.add();

      controller.playerName = 'jen';
      controller.add();

      controller.beginGame();

      var currentGame = CurrentGame.get();

      assert.ok(currentGame);
      assert.deepEqual(currentGame.getPlayers(), ['jill', 'joe', 'jen']);
    });

    it('navigates to in-game route');
  });
});
