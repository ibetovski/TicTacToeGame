var Backbone = require('Backbone');
var Cell = require('./cell.model');

var Board = Backbone.Collection.extend({
  model: Cell,

  /**
   * The default sign is 0. This value should change after every player's turn.
   * @type {Number}
   */
  nextSign: 0,

  /**
   * Flags the collection and proceeds according to that.
   * @type {Boolean}
   */
  hasWinner: false,

  /**
   * Bind all the listeners we need and create the collection.
   * 
   * @return {Void}
   */
  initialize: function() {
    this.on('change:isEmpty', function() {
      this.switchPlayers();
    }, this);

    this.on('change', function() {
      this.checkForWinner();
    }, this);

    for (var i = 0; i < 9; i++) {
      this.add({id: i});
    }
  },

  /**
   * Fills only if there is no any winner yet.
   * 
   * @param  {Number} id The cell's id to be filled.
   * @return {Void}
   */
  fill: function(id) {
    if (!this.hasWinner) {
      this.get(id).fill(this.nextSign);
    }
  },

  switchPlayers: function() {
    this.nextSign = !this.nextSign & 1;
  },

  /**
   * Checks every posible pattern for a winning match.
   * @return {Void} [description]
   */
  checkForWinner: function() {
    // check all rows and columns for a winning match.
    for (var i = 0; i < 3; i++) {
      this.getRow(i);
      this.getColumn(i);
    }

    // and check both diagonals.
    this.getDiagonal(0);
    this.getDiagonal(2);
  },

  /**
   * Tell the matching cells they won.
   * @return {Void}
   */
  notifyWinnerCells: function() {
    for (i = 0; i < this.matchingIds.length; i++) {
      this.get(this.matchingIds[i]).trigger('winner');
    }
  },

  /**
   * Use in order to check every row for a winner match.
   * @param  {Number} row The number of the row you want to check (starts from 0)
   * @return {Boolean}     If there is a winning match.
   * 
   * @todo: Use reusable code.
   */
  getRow: function(row) {
    if (this.hasWinner) {
      return true;
    }

    var step = 3;
    var matchingCount = 0;

    var prevSign;
    var model;

    var modelId;
    var matchingIds = [];

    for (var i = 0; i < 3; i++) {
      modelId = row * step + i;
      model = this.get(modelId);
      if (i === 0 && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingIds.push(modelId);
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingIds.push(modelId);
      }
    }

    if (matchingIds.length === 3) {
      this.matchingIds = matchingIds;
      this.notifyWinnerCells();
      return this.hasWinner = true;
    }
  },

  /**
   * Use in order to check every column for a winner match.
   * @param  {Number} column The number of the column you want to check (starts from 0)
   * @return {Boolean}     If there is a winning match.
   * 
   * @todo: Use reusable code.
   */
  getColumn: function(column) {
    if (this.hasWinner) {
      return true;
    }

    var step = 3;
    var matchingCount = 0;

    var prevSign;
    var model;

    var modelId;
    var matchingIds = [];

    for (var i = 0; i < 3; i++) {
      modelId = column + i * step;
      model = this.get(modelId);
      if (i === 0 && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingIds.push(modelId);
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingIds.push(modelId);
      }
    }

    if (matchingIds.length === 3) {
      this.matchingIds = matchingIds;
      this.notifyWinnerCells();
      return this.hasWinner = true;
    }
  },

  /**
   * Check a diagonal by providing a number if diagonal.
   * 
   * @param  {Number} diagonal The starting cell number of the diagonal (0 or 2)
   * @return {Boolean}
   *
   * @todo: The diagonal numbers are confusing
   * @todo: Use reusable code.
   */
  getDiagonal: function(diagonal) {
    if (this.hasWinner) {
      return true;
    }

    var step = 4;

    if (diagonal === 2) {
      step = 2;
    }

    var matchingCount = 0;

    var prevSign;
    var model;

    var modelId;
    var matchingIds = [];

    for (var i = 0; i < 3; i++) {
      modelId = diagonal + i * step;
      model = this.get(modelId);
      if (i === 0 && !model.get('isEmpty')) {
        prevSign = model.get('sign');
        matchingIds.push(modelId);
      } else if (!model.get('isEmpty') && prevSign === model.get('sign')) {
        matchingIds.push(modelId);
      }
    }

    if (matchingIds.length === 3) {
      this.matchingIds = matchingIds;
      this.notifyWinnerCells();
      return this.hasWinner = true;
    }
  }
});

module.exports = Board;