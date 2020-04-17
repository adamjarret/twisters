const { Twisters, LineBuffer } = require('twisters');

// When the discardStdin option is false, the stdin stream is not muted while
//  the animation is running.
// Allowing stdin to write data to stdout can cause strange behavior so using
//  this setting is NOT RECOMMENDED. It exists only as an "escape hatch" in case
//  muting stdin has adverse effects on the intended use case.
const buffer = new LineBuffer({ discardStdin: false });
const twisters = new Twisters(null, buffer);

// Add a message
twisters.put('a', {
  text: 'Press enter to demonstrate why discardStdin is true by default.'
});

setTimeout(() => {
  twisters.remove('a');
}, 6000);
