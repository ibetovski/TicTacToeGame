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
var Audio = require('./audio');

var router = new Router();

var playersCollection = new PlayersCollection();

var playersView;
var boardView;

router.on('route:start' , function(){
  playersView = new PlayersView({
    collection: playersCollection
  });

  if (boardView != null) {
    boardView.remove();
    boardView = null;
  }
});

router.on('route:play' , function(){
  boardView = new BoardView({
    collection: new Collection(),
    players: playersCollection
  });

  if (playersView != null) {
    playersView.remove();
    playersView = null;
  }
});

Backbone.history.start();