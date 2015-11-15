var Backbone = require('Backbone');
var Model = require('./player.model');

var PlayersCollection = Backbone.Collection.extend({
  isPristine: true,
  model: Model,
  nextPlayer: null,

  initialize: function() {
    // we need empty models.
    this.add({id: 0, isOnTurn: true});
    this.add({id: 1});

    this.on('change:name', function() {
      this.isPristine = false;
    }, this);
  }


});

module.exports = PlayersCollection;