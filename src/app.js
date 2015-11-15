_.templateSettings = {
  evaluate: /\{\{(.+?)\}\}/g,
  interpolate: /\{\{=(.+?)\}\}/g,
  escape: /\{\{-(.+?)\}\}/g
};

var Backbone = require('Backbone');


var Router = require('./router');
var Model = require('./cell.model');
var PlayersCollection = require('./players.collection');
var Collection = require('./board.collection');
var BoardView = require('./board.view');
var PlayersView = require('./players.view');

var router = new Router();

var playersCollection = new PlayersCollection();

router.on('route:start' , function(){
  var view = new PlayersView({
    collection: playersCollection
  });
});

router.on('route:play' , function(){
  var view = new BoardView({
    collection: new Collection(),
    players: playersCollection
  });
});

Backbone.history.start();