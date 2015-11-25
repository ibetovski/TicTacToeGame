var Backbone = require('Backbone');
var Players = Backbone.View.extend({

  el: function() {
    $('#main').append('<div></div>');
    return $('#main').find('div');
  },

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
      if (index < 2) {
        if (this.value.length === 0) {
          alert('Please enter names for both players');
          return;
        }

        collection.get(index).set('name', _.escape(this.value));
        collection.get(index).set('sign', index);
      }
    });

    if (collection.get(0).get('name').length > 0 && collection.get(1).get('name').length) {
      // start playing :)
      window.location.hash = "play";
    }

  },

  template: _.template($('#playersTemplate').html()),

  render: function() {
    this.$el.html(this.template());
  }
});

module.exports = Players;