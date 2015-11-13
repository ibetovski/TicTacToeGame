var Backbone = require('Backbone');
var Cell = require('./cell.model');

var Board = Backbone.Collection.extend({
  model: Cell,
  nextSign: 0,
  initialize: function(argument) {

    this.on('change:isEmpty', function() {
      this.switchPlayers();
      this.hasWinner();
    }, this);

    for (var i = 0; i < 9; i++) {
      this.add({id: i});
    }
  },

  fill: function(id) {
    this.get(id).fill(this.nextSign);
  },

  switchPlayers: function() {
    this.nextSign = !this.nextSign & 1;
  },

  hasWinner: function() {
    // check all rows and columns for a winning match.
    for (var i = 0; i < 3; i++) {
      this.getRow(i);
      this.getColumn(i);
    }

    // and check both diagonals.
    this.getDiagonal(0);
    this.getDiagonal(2);
  },

  getRow: function(row) {
    var step = 3;
    var matchingCount = 0;

    var prevSign;
    var model;


    for (var i = 0; i < 3; i++) {
      model = this.get(row * step + i);
      if (i === 0 && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingCount++;
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingCount++;
      }
    }

    return matchingCount === 3;
  },

  getColumn: function(column) {
    var step = 3;
    var matchingCount = 0;

    var prevSign;
    var model;

    for (var i = 0; i < 3; i++) {
      model = this.get(column + i * step);
      if (i === 0 && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingCount++;
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingCount++;
      }
    }

    return matchingCount === 3;
  },

  getDiagonal: function(diagonal) {
    var step = 4;

    if (diagonal === 2) {
      step = 2;
    }

    var matchingCount = 0;

    var prevSign;
    var model;

    for (var i = 0; i < 3; i++) {
      model = this.get(diagonal + i * step);
      if (i === 0 && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingCount++;
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingCount++;
      }
    }

    return matchingCount === 3;
  }
});

module.exports = Board;