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

  it('should not override existing sign with another one', function() {
    expect(cell.get('isEmpty')).to.be.ok;
    cell.fill(0);
    cell.fill(1);
    expect(cell.get('sign')).to.equal(0);
  });

  it('should convert 0 sign to string O', function() {
    cell.fill(0);
    expect(cell.get('signString')).to.equal('O');
  });

  it('should convert 1 sign to string X', function() {
    cell.fill(1);
    expect(cell.get('signString')).to.equal('X');
  });
});