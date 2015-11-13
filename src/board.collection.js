var Backbone = require('Backbone');
var Cell = require('./cell.model');

var Board = Backbone.Collection.extend({
  model: Cell,
  initialize: function(argument) {

    this.on('change', function() {
      this.hasWinner();
    }, this);

    for (var i = 0; i < 9; i++) {
      this.add({id: i});
    }
  },

  fill: function(id) {
    this.get(id).fill();
  },

  hasWinner: function() {

  },

  getRow: function(row) {
    var firstCell = row * 3;
    var matchingCount = 0;

    var prevSign;
    var model;

    for (var i = firstCell; i < firstCell + 3; i++) {
      model = this.get(i);
      if (i === firstCell && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingCount++;
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingCount++;
      }
    }

    return matchingCount === 3;
  },

  getColumn: function(column) {
    var firstCell = column;
    var step = 3;
    var matchingCount = 0;

    var prevSign;
    var model;

    for (var i = 0; i < 3; i++) {
      model = this.get(column + i * 3);
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
    var firstCell = 0;
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