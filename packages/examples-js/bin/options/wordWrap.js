const { Twisters, LineBuffer } = require('twisters');

const twisters = new Twisters({ buffer: new LineBuffer({ wordWrap: true }) });

const text = 'Pack my box with five dozen liquor jugs. '.repeat(10);

twisters.put('wordWrap: true');
twisters.put('a', { text });

setTimeout(() => {
  twisters.remove('wordWrap: true');
  twisters.remove('a');

  const twistersNoWrap = new Twisters();

  twistersNoWrap.put('wordWrap: false');
  twistersNoWrap.put('a', { text });

  setTimeout(() => {
    twistersNoWrap.remove('wordWrap: false');
    twistersNoWrap.remove('a');
  }, 4000);
}, 4000);
