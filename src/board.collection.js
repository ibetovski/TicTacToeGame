var Backbone = require('Backbone');
var Cell = require('./cell.model');

var GAME_TURNS = 9;

var Board = Backbone.Collection.extend({
  model: Cell,

  /**
   * The default sign is 0. This value should change after every player's turn.
   * We will create nextSign from it and it will change on every turn.
   * firstPlater changes only when the game ends.
   * @type {Number}
   */
  firstPlayer: 0,
  nextSign: null,

  /**
   * Track how many turns are left and see if there is a winner in the end.
   * @type {Number}
   */
  turnsLeft: GAME_TURNS,

  /**
   * Flags the collection and proceeds according to that.
   * @type {Boolean}
   */
  hasWinner: false,

  getEmptyModels: function() {
    var models = [];

    for (var i = 0; i < GAME_TURNS; i++) {
      models.push({id: i});
    }

    return models;
  },

  /**
   * Bind all the listeners we need and create the collection.
   * 
   * @return {Void}
   */
  initialize: function() {
    this.on('fill', function() {
      this.turnsLeft--;
      this.checkForWinner();

      if (!this.hasWinner) {
        if (!this.turnsLeft) {
          return this.endGame();
        }
        this.switchPlayers();

      } else {
        this.endGame({hasWinner: true});
      }


    }, this);

    this.on('reset', function() {
      this.turnsLeft = GAME_TURNS;
      this.hasWinner = false;

      // every game we switch players
      this.nextSign = null;
      this.firstPlayer = !this.firstPlayer & 1;
      this.trigger('switchPlayers', this.firstPlayer);
    }, this);

    this.add(this.getEmptyModels());
  },

  /**
   * Fills only if there is no any winner yet.
   * 
   * @param  {Number} id The cell's id to be filled.
   * @return {Void}
   */
  fill: function(id) {
    if (this.nextSign === null) {
      this.nextSign = this.firstPlayer;
    }

    if (!this.hasWinner && this.get(id).get('isEmpty')) {
      this.get(id).fill(this.nextSign);
    }
  },

  clean: function() {
    this.reset(this.getEmptyModels());
  },

  endGame: function(options) {
    options = options || {hasWinner: false};
    this.trigger('gameEnds', options);
  },

  switchPlayers: function() {
    this.nextSign = !this.nextSign & 1;
    this.trigger('switchPlayers', this.nextSign);
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