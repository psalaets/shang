var assert = chai.assert;

describe('duration filter', function() {
  var durationFilter;

  beforeEach(module('app'));
  beforeEach(inject(function($filter) {
    durationFilter = $filter('duration');
  }));

  describe('60+ minutes have elapsed', function() {
    it('displays duration by hour and minute', function() {
      var result = durationFilter(81);

      assert.equal(result, '1 hr 21 min');
    });

    it('does not display minutes when they are zero', function() {
      var result = durationFilter(60);

      assert.equal(result, '1 hr');
    });
  });

  describe('1-59 minutes have elapsed', function() {
    it('only displays minutes', function() {
      var result = durationFilter(59);

      assert.equal(result, '59 min');
    });
  });

  describe('0 minutes have elapsed', function() {
    it('indicates < minute', function() {
      var result = durationFilter(0);

      assert.equal(result, 'less than 1 minute');
    });
  });

  it('treats null minutes like 0', function() {
    var result = durationFilter(null);

    assert.equal(result, 'less than 1 minute');
  });

  it('treats undefined minutes like 0', function() {
    var result = durationFilter(void 0);

    assert.equal(result, 'less than 1 minute');
  });
});