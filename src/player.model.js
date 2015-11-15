var Backbone = require('Backbone');

var PlayersModel = Backbone.Model.extend({
  defaults: {
    name: '',
    sign: ''
  },

  initialize: function() {
    this.listenTo(this.collection, 'switchPlayers', function(nextPlayer) {
      if (this.id === nextPlayer) {
        this.set("isOnTurn", true);
      } else {
        this.set("isOnTurn", false);
      }
    }, this);
  }
});

module.exports = PlayersModel;