// 3rd party dependencies
var expect = require('chai').expect;
var sinon = require('sinon');

// app.
var Board = require('../src/board.collection');

describe('Board', function() {

  var board;

  // setup of dependencies.
  beforeEach(function() {
    board = new Board();
  });

  afterEach(function() {
    if (typeof board.checkForWinner.restore === 'function') {
      board.checkForWinner.restore();
    }

    if (typeof board.switchPlayers.restore === 'function') {
      board.switchPlayers.restore();
    }

    board = null;
  });

  it('should print 9 cells', function() {
    expect(board.length).to.equal(9);
  });

  it('should have all cells empty', function() {
    board.each(function(model) {
      expect(model.get('isEmpty')).to.be.ok;
    });
  });

  it('should check for winner on every turn', function() {
    sinon.stub(board, 'checkForWinner');

    board.fill(0);
    expect(board.checkForWinner.called).to.be.ok;

    board.fill(1);
    expect(board.checkForWinner.callCount).to.be.greaterThan(1);
  });

  it('should fill the model', function() {
    var cell = board.get(4);
    expect(cell.get('isEmpty')).to.be.ok;
    board.fill(4);
    expect(cell.get('isEmpty')).not.to.be.ok;
  });

  it('should match per sign', function() {
    expect(board.getRow(0)).not.to.be.ok;
    board.get(0).fill(0);
    board.get(1).fill(0);
    board.get(2).fill(0);
    expect(board.getRow(0)).to.be.ok;
  });

  it('should not match win if more than one sign', function() {
    expect(board.getRow(0)).not.to.be.ok;
    board.get(0).fill(0);
    board.get(1).fill(0);
    board.get(2).fill(1);
    expect(board.getRow(0)).not.to.be.ok;
  });

  it('should match win for the first row', function() {
    expect(board.getRow(0)).not.to.be.ok;
    board.get(0).fill();
    expect(board.getRow(0)).not.to.be.ok;
    board.get(1).fill();
    expect(board.getRow(0)).not.to.be.ok;
    board.get(2).fill();
    expect(board.getRow(0)).to.be.ok;
  });

  it('should match win for the 2nd row', function() {
    expect(board.getRow(1)).not.to.be.ok;
    board.get(3).fill();
    expect(board.getRow(1)).not.to.be.ok;
    board.get(4).fill();
    expect(board.getRow(1)).not.to.be.ok;
    board.get(5).fill();
    expect(board.getRow(1)).to.be.ok;
  });

  it('should match win for 3rd row', function() {
    expect(board.getRow(2)).not.to.be.ok;
    board.get(6).fill();
    expect(board.getRow(2)).not.to.be.ok;
    board.get(7).fill();
    expect(board.getRow(2)).not.to.be.ok;
    board.get(8).fill();
    expect(board.getRow(2)).to.be.ok;
  });

  it('should match win for 1st column', function() {
    expect(board.getColumn(0)).not.to.be.ok;
    board.get(0).fill();
    expect(board.getColumn(0)).not.to.be.ok;
    board.get(3).fill();
    expect(board.getColumn(0)).not.to.be.ok;
    board.get(6).fill();
    expect(board.getColumn(0)).to.be.ok;
  });

  it('should match win for 2nd column', function() {
    expect(board.getColumn(1)).not.to.be.ok;
    board.get(1).fill();
    expect(board.getColumn(1)).not.to.be.ok;
    board.get(4).fill();
    expect(board.getColumn(1)).not.to.be.ok;
    board.get(7).fill();
    expect(board.getColumn(1)).to.be.ok;
  });

  it('should match win for 3rd column', function() {
    expect(board.getColumn(2)).not.to.be.ok;
    board.get(2).fill();
    expect(board.getColumn(2)).not.to.be.ok;
    board.get(5).fill();
    expect(board.getColumn(2)).not.to.be.ok;
    board.get(8).fill();
    expect(board.getColumn(2)).to.be.ok;
  });

  it('should match win for left to right diagonal', function() {
    expect(board.getDiagonal(0)).not.to.be.ok;
    board.get(0).fill();
    expect(board.getDiagonal(0)).not.to.be.ok;
    board.get(4).fill();
    expect(board.getDiagonal(0)).not.to.be.ok;
    board.get(8).fill();
    expect(board.getDiagonal(0)).to.be.ok;
  });

  it('should match win for right to left diagonal', function() {
    expect(board.getDiagonal(2)).not.to.be.ok;
    board.get(2).fill();
    expect(board.getDiagonal(2)).not.to.be.ok;
    board.get(4).fill();
    expect(board.getDiagonal(2)).not.to.be.ok;
    board.get(6).fill();
    expect(board.getDiagonal(2)).to.be.ok;
  });

  it('should call switchPlayers function after every turn', function() {
    sinon.stub(board, 'switchPlayers');
    expect(board.get(0).get('isEmpty')).to.be.ok;
    board.fill(0);
    expect(board.get(0).get('isEmpty')).not.to.be.ok;
    expect(board.get(0).get('sign')).to.equal(0);
    expect(board.switchPlayers.called).to.be.ok;
  });

  it('should switch the sign after every turn', function() {
    board.fill(0);
    expect(board.get(0).get('sign')).to.equal(0);
    board.fill(1);
    expect(board.get(1).get('sign')).to.equal(1);
  });

  it('should not allow more turn if there is a winner', function() {
    board.fill(0); // O
    board.fill(3); // X
    board.fill(1); // O
    board.fill(4); // X
    board.fill(2); // O
    board.fill(5); // X
    expect(board.get(5).get('isEmpty')).to.be.ok;
  });
});