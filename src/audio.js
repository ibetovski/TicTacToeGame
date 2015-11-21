var mediator = require('./mediator');

var sounds = {
  sounds: {
    click: new Audio('./audio/click.wav'),
    hasWinner: new Audio('./audio/has_winner.wav'),
    noWinner: new Audio('./audio/no_winner.wav')
  },

  play: function(name) {
    this.sounds[name].play();
  },

  init: function() {
    mediator.on('click', function() {
      this.play('click');
    }, this);

    mediator.on('hasWinner', function() {
      this.play('hasWinner');
    }, this);

    mediator.on('noWinner', function() {
      this.play('noWinner');
    }, this);
  }
}

sounds.init();
module.exports = sounds;