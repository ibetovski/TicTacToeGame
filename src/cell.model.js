var Backbone = require('Backbone');

var Cell = Backbone.Model.extend({
  defaults: {
    "isEmpty": true
  },

  /**
   * Puts a mark into the cell.
   * @return {Void}
   */
  fill: function(sign) {
    this.set('isEmpty', false);
    this.set('sign', sign);
  }
});

module.exports = Cell;