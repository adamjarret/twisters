const { Twisters, LineBuffer } = require('twisters');

const buffer = new LineBuffer({ handleSigint: false });
const twisters = new Twisters({ buffer });

// When the handleSigint option is false, a custom handler should be defined that:
//  a) calls buffer.cleanup()
//  b) exits the process
// If no handler is defined, the process will exit but cleanup will not be called
// which may result in the cursor position being incorrect after the process exits.
// If a handler is defined, the process will not exit automatically so it MUST call
// process.exit() explicitly.
process.on('SIGINT', () => {
  buffer.cleanup();
  console.log('Interrupted');
  process.exit(0);
});

// Add a message
twisters.put('a', {
  text: 'Press ctrl+c to interrupt'
});

setTimeout(() => {
  twisters.remove('a');
}, 6000);
