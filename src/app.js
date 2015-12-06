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
var StartView = require('./start.view');
var PlayerNamesView = require('./playerNames.view');
var Audio = require('./audio');

var router = new Router();

var playersCollection = new PlayersCollection();

var startView;
var boardView;
var playerNamesView;

router.on('route:start' , function(){
  startView = new StartView({
    collection: playersCollection
  });

  if (boardView != null) {
    boardView.remove();
    boardView = null;
  }

  if (playerNamesView != null) {
    playerNamesView.remove();
    playerNamesView = null;
  }
});

router.on('route:play' , function(){
  boardView = new BoardView({
    collection: new Collection(),
    players: playersCollection
  });

  playerNamesView = new PlayerNamesView({
    collection: playersCollection
  });

  if (startView != null) {
    startView.remove();
    startView = null;
  }
});

Backbone.history.start();