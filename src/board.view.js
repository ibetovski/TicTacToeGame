var Backbone = require('Backbone');
var Board = Backbone.View.extend({
  // id: 'main',
  el: $('#main'),
  initialize: function() {
    this.collection.on('change', function() {
      this.render();
    }, this);

    this.render();
  },

  events: {
    'click .cell': 'onClick'
  },

  onClick: function(e) {
    var cellNumber = $(e.target).data('index');
    this.collection.fill(cellNumber);
  },

  template: _.template($('#myTemplate').html()),

  render: function() {
    this.$el.html(this.template({items: this.collection.toJSON()}));
  }
});

module.exports = Board;