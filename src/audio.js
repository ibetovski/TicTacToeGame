var mediator = require('./mediator');

var sounds = {
  sounds: {
    click: new Audio('./audio/click.wav'),
    // this is fn because of the volume control
    hasWinner: (function() {
      var audio = new Audio('./audio/has_winner.wav');
      audio.volume = 0.1;
      return audio
    })(),
    noWinner: new Audio('./audio/no_winner.wav'),
    flip: new Audio('./audio/flip.wav')
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

    mediator.on('flip', function() {
      this.play('flip');
    }, this);
  }
}

sounds.init();
module.exports = sounds;