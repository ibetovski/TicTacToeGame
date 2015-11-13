var expect = require('chai').expect;
var Cell = require('../src/cell.model');

describe('Cell', function() {

  var cell;
  // setup dependency code.
  beforeEach(function() {
    cell = new Cell();
  });

  // teardown
  afterEach(function() {
    cell = null;
  });

  it('should be empty', function() {
    expect(cell.get('isEmpty')).to.be.ok;
  });

  it('should be filled', function() {
    cell.fill();
    expect(cell.get('isEmpty')).not.to.be.ok;
  });

  it('should be filled with X', function() {
    cell.fill(1);
    expect(cell.get('sign')).to.equal(1);
  });

  it('should be filled with O', function() {
    cell.fill(0);
    expect(cell.get('sign')).to.equal(0);
  });
});