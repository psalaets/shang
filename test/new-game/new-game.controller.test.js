var assert = chai.assert;

describe('new game controller', function () {
  var controller, scope;

  beforeEach(module('app'));
  beforeEach(inject(function($controller, $rootScope, _persistence_, _navigation_, _Game_, rules) {
    scope = $rootScope.$new();
    controller = $controller('NewGameController as setup', {
      $scope: scope,
      availablePlayers: [],
      persistence: _persistence_,
      navigation: _navigation_,
      Game: _Game_,
      rules: rules
    });
  }));

  describe('selectPlayer()', function() {
    it('marks player as selected', function() {
      controller.selectPlayer('bob');

      assert.equal(controller.isSelected('bob'), true);
    });
  });

  describe('selectEnteredPlayer()', function() {
    it('makes entered player available and selects them', function() {
      controller.enteredName = 'joe';
      controller.selectEnteredPlayer();

      assert.notEqual(controller.availablePlayers.indexOf('joe'), -1);
      assert.equal(controller.isSelected('joe'), true);
    });

    it('does nothing if enteredName is blank', function() {
      controller.enteredName = '';
      controller.selectEnteredPlayer();

      assert.equal(controller.isSelected(''), false);
    });

    it('resets enteredName', function() {
      controller.enteredName = 'entered player';
      controller.selectEnteredPlayer();

      assert.equal(controller.enteredName, '');
    });
  });

  describe('deselectPlayer()', function() {
    it('makes player not selected', function() {
      controller.selectPlayer('bob');

      controller.deselectPlayer('bob');

      assert.equal(controller.isSelected('bob'), false);
    });
  });

  describe('toggleSelection()', function() {
    it('selects unselected player', function() {
      controller.toggleSelection('bob');

      assert.equal(controller.isSelected('bob'), true);
    });

    it('deselects selected player', function() {
      controller.selectPlayer('bob');

      controller.toggleSelection('bob');

      assert.equal(controller.isSelected('bob'), false);
    });
  });

  describe('decksNeeded', function() {
    it('is 2 with 3-4 selected players', function() {
      controller.selectPlayer('1');
      controller.selectPlayer('2');
      controller.selectPlayer('3');

      assert.equal(controller.decksNeeded, 2);

      controller.selectPlayer('4');

      assert.equal(controller.decksNeeded, 2);
    });

    it('is 3 with 5-6 selected players', function() {
      controller.selectPlayer('1');
      controller.selectPlayer('2');
      controller.selectPlayer('3');
      controller.selectPlayer('4');
      controller.selectPlayer('5');

      assert.equal(controller.decksNeeded, 3);

      controller.selectPlayer('6');

      assert.equal(controller.decksNeeded, 3);
    });

    it('is 4 with 7-8 selected players', function() {
      controller.selectPlayer('1');
      controller.selectPlayer('2');
      controller.selectPlayer('3');
      controller.selectPlayer('4');
      controller.selectPlayer('5');
      controller.selectPlayer('6');
      controller.selectPlayer('7');

      assert.equal(controller.decksNeeded, 4);

      controller.selectPlayer('8');

      assert.equal(controller.decksNeeded, 4);
    });
  });

  describe('canBeginGame()', function () {
    it('is false until at least three players are in list', function() {
      controller.selectPlayer('bob');
      controller.selectPlayer('jill');

      assert(!controller.canBeginGame());

      controller.selectPlayer('jan');

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

      spyOn(persistence, 'setPlayers').and.callFake(function(players) {
        return $q(function(resolve, reject) {
          resolve(players);
        });
      });

      spyOn(navigation, 'goToGame');
    }));

    it('starts a new game with given players as current game', function(done) {
      controller.selectPlayer('jill');
      controller.selectPlayer('joe');
      controller.selectPlayer('jen');

      controller.beginGame()
        .then(loadFakeGame)
        .then(assertGameState)
        .finally(done);

      function loadFakeGame() {
        return persistence.loadGame('doesnt matter');
      }

      function assertGameState(game) {
        assert.ok(game.startTime);
        assert.equal(game.players[0].name, 'jill');
        assert.equal(game.players[1].name, 'joe');
        assert.equal(game.players[2].name, 'jen');
      }

      // must call this to make $q promise chains go
      $rootScope.$apply();
    });

    it('saves available player list', function(done) {
      controller.makeAvailable('bob');
      controller.makeAvailable('katie');
      controller.makeAvailable('tim');

      controller.beginGame()
        .then(assertPlayersWereSaved)
        .finally(done);

      function assertPlayersWereSaved(players) {
        expect(persistence.setPlayers).toHaveBeenCalledWith(['tim', 'katie', 'bob']);
      }

      // must call this to make $q promise chains go
      $rootScope.$apply();
    });

    it('navigates to game', function(done) {
      controller.selectPlayer('jill');
      controller.selectPlayer('joe');
      controller.selectPlayer('jen');

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
