var Backbone = require('Backbone');
var _ = require('underscore');

var Mediator = {};
_.extend(Mediator, Backbone.Events);

module.exports = Mediator;