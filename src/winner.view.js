var Backbone = require('Backbone');
var mediator = require('./mediator');

var Winner = Backbone.View.extend({

  // we don't want Backbone to delete our real dom element on view.remove.
  el: function() {
    $('#winner-placeholder').append('<div></div>');
    return $('#winner-placeholder').find('div');
  },
  
  initialize: function(options) {
    options = options || {hasWinner: false};
    this.render();

    var eventName = 'hasWinner';
    
    if (!options.hasWinner) {
      eventName = 'noWinner';
    }

    mediator.trigger(eventName);
  },

  events: {
    'submit': 'onSubmit'
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.trigger('playAgain');
  },

  template: _.template($('#winnerTemplate').html()),

  render: function() {
    var templateOptions = {};

    if (typeof this.model != 'undefined') {
      templateOptions.winner = this.model.toJSON();
    }

    this.$el.html(this.template(templateOptions));
  }
});


module.exports = Winner;