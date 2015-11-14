_.templateSettings = {
  evaluate: /\{\{(.+?)\}\}/g,
  interpolate: /\{\{=(.+?)\}\}/g,
  escape: /\{\{-(.+?)\}\}/g
};

var Model = require('./cell.model');
var Collection = require('./board.collection');
var View = require('./board.view');

var view = new View({
  collection: new Collection()
});