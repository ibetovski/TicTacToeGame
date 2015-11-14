var Backbone = require('Backbone');

var strings = ['O', 'X'];

var Cell = Backbone.Model.extend({
  defaults: {
    "isEmpty": true,
    "sign": null,
    "isWinner": false
  },

  initialize: function() {
    this.on('change:sign', function() {
      this.set('signString', strings[this.get('sign')]);
    }, this);

    this.on('winner', function() {
      this.set('isWinner', true);
    }, this);
  },

  /**
   * Puts a mark into the cell.
   * @return {Void}
   */
  fill: function(sign) {
    if (this.get('isEmpty')) {
      this.set('isEmpty', false);
      this.set('sign', sign);
    }
  }
});

module.exports = Cell;