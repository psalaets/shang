module.exports = TitleCtrl;

function TitleCtrl($location) {
  this.newGame = function() {
    $location.path('/games/new')
  };
}
