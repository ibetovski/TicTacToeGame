var Backbone = require('Backbone');
var WinnerView = require('./winner.view');
var mediator = require('./mediator');

var Board = Backbone.View.extend({
  // id: 'main',
  el: function() {
    $('#main').append('<div></div>');
    return $('#main').find('div');
  },

  initialize: function(options) {

    if (typeof options.players != 'undefined' && !options.players.isPristine) {
      this.players = options.players;
    } else {
      return window.location.hash = 'start';
    }

    this.listenTo(this.collection,'change reset', function() {
      this.render();
    });

    this.listenTo(this.collection, 'switchPlayers', function(nextPlayer) {
      this.players.trigger('switchPlayers', nextPlayer);
    });

    // The collection should notify us when the game ends
    this.listenTo(this.collection, 'gameEnds', function(options) {
      options = options || {hasWinner: false};
      this.initializeWinnerView(options);
    });

    this.render({isFirstRender: true});
  },

  initializeWinnerView: function(options) {
    options = options || {hasWinner: false};

    if (options.hasWinner) {
      var winnerModels = this.players.filter(function(item) {
        return item.get('isOnTurn') === true;
      });
      options.model = winnerModels[0];
    }


    var winnerView = new WinnerView(options);

    this.listenTo(winnerView, 'playAgain', function() {
      winnerView.remove();

      // clean the cell content before rotating the board.
      this.$('.cell').each(function() {
        this.innerHTML = '';
      });

      // start flipping.
      this.$('.board-cells').addClass('is-flipping');
            
      // wait little bit and start a new game.
      setTimeout(function() {
        this.collection.clean();
      }.bind(this), 500);
    });
  },

  events: {
    'click .cell': 'onClick'
  },

  onClick: function(e) {
    e.preventDefault();
    var cellNumber = $(e.target).data('index');
    this.collection.fill(cellNumber);
    mediator.trigger('click');
  },

  template: _.template($('#boardTemplate').html()),

  render: function(options) {
    options = options || {};
    this.$el.html(this.template({
      items: this.collection.toJSON(),
      players: this.players.toJSON(),
      isFirstRender: options.isFirstRender
    }));

    // make the board appear with smooth transition at the first render.
    if (options.isFirstRender) {
      setTimeout(function() {
        this.$('.board-cells').removeClass('is-hidden');
      }.bind(this), 100);
    }
  }
});

module.exports = Board;