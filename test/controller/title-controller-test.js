var assert = chai.assert;

describe('title controller', function () {
  var controller, scope;

  beforeEach(module('app'));
  beforeEach(inject(function($controller, $rootScope, _NavigationService_) {
    scope = $rootScope.$new();
    controller = $controller('TitleCtrl as shang', {
      $scope: scope,
      NavigationService: _NavigationService_
    });
  }));

  describe('newGame()', function () {
    var NavigationService;

    beforeEach(inject(function(_NavigationService_) {
      NavigationService = _NavigationService_;

      spyOn(NavigationService, 'goToGameSetup');
    }));

    it('navigates to game setup', function() {
      controller.newGame();

      assert.equal(NavigationService.goToGameSetup.calls.count(), 1);
    });
  });
});
