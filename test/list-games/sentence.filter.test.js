var assert = chai.assert;

describe('sentence filter', function() {
  var filter;

  beforeEach(module('app'));
  beforeEach(inject(function($filter) {
    filter = $filter('sentence');
  }));

  it('returns empty string when given empty array', function() {
    var result = filter([]);

    assert.equal('', result);
  });

  it('returns just the name when given one name', function() {
    var result = filter(['tanya']);

    assert.equal('tanya', result);
  });

  it('returns names delimited by "and" when two names', function() {
    var result = filter(['tanya', 'bob']);

    assert.equal('tanya and bob', result);
  });

  it('returns names delimited by comma (ending with "and") when given 3+ names', function() {
    var result = filter(['tanya', 'bob', 'helen']);

    assert.equal('tanya, bob and helen', result);
  });
});