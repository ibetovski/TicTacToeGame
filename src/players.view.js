var Backbone = require('Backbone');
var Players = Backbone.View.extend({

  el: $('#main'),
  initialize: function() {
    this.render();
  },

  events: {
    'submit': 'onSubmit'
  },

  /** 
   * Get form values and set them to the model.
   * @param  {Object} e JS event
   * @return {Void}
   */
  onSubmit: function(e) {
    e.preventDefault();
    var collection = this.collection;

    // sets player's name and his sign
    this.$el.find('input[name]').each(function(index) {
      collection.get(index).set('name', this.value);
      collection.get(index).set('sign', index);
    });

    // start playing :)
    window.location.hash = "play";
  },

  template: _.template($('#playersTemplate').html()),

  render: function() {
    this.$el.html(this.template());
  }
});

module.exports = Players;