var Backbone = require('Backbone');

var Cell = Backbone.Model.extend({
  defaults: {
    "isEmpty": true,
    "sign": null
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