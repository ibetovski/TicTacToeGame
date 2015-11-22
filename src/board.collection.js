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

  /**
   * Use it when you need a fresh collection.
   * 
   * @return {Array} Array of objects having ids.
   */
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

  /**
   * Clean the board and play again.
   * @return {Void}
   */
  clean: function() {
    this.reset(this.getEmptyModels());
  },

  /**
   * Stop the game.
   * @param  {Object} options {hasWinner: true/false}
   * @return {Void}
   */
  endGame: function(options) {
    options = options || {hasWinner: false};
    this.trigger('gameEnds', options);
  },

  /**
   * Every turn is a different player so switch them when needed.
   * @return {Void}
   */
  switchPlayers: function() {
    this.nextSign = !this.nextSign & 1;
    this.trigger('switchPlayers', this.nextSign);
  },

  /**
   * Checks every posible pattern for a winning match.
   * @return {Void} [description]
   */
  checkForWinner: function() {

    var patterns = [
      // rows
      [0,1,2],
      [3,4,5],
      [6,7,8],

      // columns
      [0,3,6],
      [1,4,7],
      [2,5,8],

      // diagonals
      [0,4,8],
      [2,4,6]
    ];

    return this.checkPerList(patterns);
  },

  /**
   * Tell the matching cells they won.
   * @return {Void}
   */
  notifyWinnerCells: function(ids) {
    ids.forEach(function(id) {
      this.get(id).trigger('winner');
    }, this);
  },

  /**
   * Provide an array of arrays with ids to be checked for winning match.
   * @param  {Array} patterns List of arrays holding ids.
   * @return {Boolean}        If there is a winner or not
   */
  checkPerList: function(patterns) {
    // iterate the list of arrays
    for (var i = 0; i < patterns.length; i++) {

      // if there is a winner, STOP
      if (this.hasWinner) {
        break;
      }

      // will be true if every item matches the requirements.
      this.hasWinner = patterns[i].every(function(id, index, ids) {
        return !this.get(id).get('isEmpty') &&
          this.get(id).get('sign') === this.get(ids[0]).get('sign');
      }, this);

      if (this.hasWinner) {
        // notify whoever is concerned
        this.notifyWinnerCells(patterns[i]);
      }
    }

    return this.hasWinner;

  }
});

module.exports = Board;