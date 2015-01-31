var assert = chai.assert;

function minutesAfter(date, minutes) {
  var millisPerMinute = 1000 * 60;
  return new Date(date.getTime() + (minutes * millisPerMinute));
}

describe('duration filter', function() {
  var durationFilter;
  var startDate = new Date();

  beforeEach(module('app'));
  beforeEach(inject(function($filter) {
    durationFilter = $filter('duration');
  }));

  describe('60+ minutes have elapsed', function() {
    it('displays duration by hour and minute', function() {
      var endDate = minutesAfter(startDate, 81);
      var result = durationFilter(startDate, endDate);

      assert.equal(result, '1 hr 21 min');
    });

    it('does not display minutes when they are zero', function() {
      var endDate = minutesAfter(startDate, 60);
      var result = durationFilter(startDate, endDate);

      assert.equal(result, '1 hr');
    });
  });

  describe('1-59 minutes have elapsed', function() {
    it('only displays minutes', function() {
      var endDate = minutesAfter(startDate, 59);
      var result = durationFilter(startDate, endDate);

      assert.equal(result, '59 min');
    });
  });

  describe('fractional minutes have elapsed', function() {
    it('rounds down to closest minute', function() {
      // add one minute and 50 millis
      var endDate = new Date(startDate.getTime() + (60 * 1000) + 50);
      var result = durationFilter(startDate, endDate);

      assert.equal(result, '1 min');
    });
  });

  describe('0 minutes have elapsed', function() {
    it('indicates < minute', function() {
      var endDate = minutesAfter(startDate, 0);
      var result = durationFilter(startDate, endDate);

      assert.equal(result, 'less than 1 minute');
    });
  });

  it('returns null for from date', function() {
    var result = durationFilter(null, new Date());

    assert.equal(result, null);
  });

  it('returns null for to date', function() {
    var result = durationFilter(new Date(), null);

    assert.equal(result, null);
  });

  it('returns null for undefined from date', function() {
    var result = durationFilter(void 0, new Date());

    assert.equal(result, null);
  });

  it('returns null for undefined to date', function() {
    var result = durationFilter(new Date(), void 0);

    assert.equal(result, null);
  });
});