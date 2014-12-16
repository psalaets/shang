var assert = chai.assert;

describe('rank filter', function() {
  var filter;

  beforeEach(module('app'));
  beforeEach(inject(function($filter) {
    filter = $filter('rank');
  }));

  it('appends suffix to rank', function() {
    // doubt we'll ever have even 9 players
    assert.equal(filter(1), '1st');
    assert.equal(filter(2), '2nd');
    assert.equal(filter(3), '3rd');
    assert.equal(filter(4), '4th');
    assert.equal(filter(5), '5th');
    assert.equal(filter(6), '6th');
    assert.equal(filter(7), '7th');
    assert.equal(filter(8), '8th');
    assert.equal(filter(9), '9th');
    assert.equal(filter(10), '10th');
    assert.equal(filter(11), '11th');
    assert.equal(filter(12), '12th');
    assert.equal(filter(13), '13th');
  });

  it('returns empty string for null rank', function() {
    assert.equal(filter(null), '');
  });

  it('returns empty string for undefined rank', function() {
    assert.equal(filter(void 0), '');
  });
});