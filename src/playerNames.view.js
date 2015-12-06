var Backbone = require('Backbone');
var PlayerNamesView = Backbone.View.extend({

  el: function() {
    var container = $('<div></div>');
    $('#playersNames').append(container);
    return container;
  },

  initialize: function() {
    this.listenTo(this.collection, 'change', function(model) {
      if (!model.get('isOnTurn')) {
        this.$('.player-names div:nth-child(' + (model.id + 1) + ')').removeClass('on-turn');
      } else {
        this.$('.player-names div:nth-child(' + (model.id + 1) + ')').addClass('on-turn');
      }
    });

    this.render();
  },

  template: _.template($('#playerNamesTemplate').html()),

  render: function() {
    this.$el.html(this.template({players: this.collection.toJSON()}));
  }
});

module.exports = PlayerNamesView;