var Backbone = require('Backbone');
var WinnerView = require('./winner.view');
var Board = Backbone.View.extend({
  // id: 'main',
  el: $('#main'),
  initialize: function(options) {
    if (typeof options.players != 'undefined' && !options.players.isPristine) {
      this.players = options.players;
    } else {
      return window.location.hash = 'start';
    }

    this.collection.on('change reset', function() {
      this.render();
    }, this);

    this.players.on('change', function() {
      this.render();
    }, this);

    this.collection.on('switchPlayers', function(nextPlayer) {
      console.log('switch', this.players.trigger('switchPlayers', nextPlayer));
    }, this);

    // The collection should notify us when the game ends
    this.collection.on('gameEnds', function(options) {
      options = options || {hasWinner: false};
      this.initializeWinnerView(options);
    }, this);

    this.render();
  },

  initializeWinnerView: function(options) {
    options = options || {hasWinner: false};

    var viewOptions = {};

    if (options.hasWinner) {
      var winnerModels = this.players.filter(function(item) {
        return item.get('isOnTurn') === true;
      });
      viewOptions.model = winnerModels[0];
    }


    var winnerView = new WinnerView(viewOptions);

    this.listenTo(winnerView, 'playAgain', function() {
      this.collection.clean();
      winnerView.remove();
    });
  },

  events: {
    'click .cell': 'onClick'
  },

  onClick: function(e) {
    var cellNumber = $(e.target).data('index');
    this.collection.fill(cellNumber);
  },

  template: _.template($('#boardTemplate').html()),

  render: function() {
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      players: this.players.toJSON()
    }));
  }
});

module.exports = Board;