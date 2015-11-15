var Backbone = require('Backbone');

var Router = Backbone.Router.extend({
  routes: {
    "": 'start',
    "start": 'start',
    "play": 'play'
  }
});

module.exports = Router;