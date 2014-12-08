var assert = chai.assert;

describe('title controller', function () {
  var controller, scope;

  beforeEach(module('app'));
  beforeEach(inject(function($controller, $rootScope, _navigation_) {
    scope = $rootScope.$new();
    controller = $controller('TitleController as shang', {
      $scope: scope,
      navigation: _navigation_
    });
  }));

  describe('newGame()', function () {
    var navigation;

    beforeEach(inject(function(_navigation_) {
      navigation = _navigation_;

      spyOn(navigation, 'goToGameSetup');
    }));

    it('navigates to game setup', function() {
      controller.newGame();

      assert.equal(navigation.goToGameSetup.calls.count(), 1);
    });
  });
});
