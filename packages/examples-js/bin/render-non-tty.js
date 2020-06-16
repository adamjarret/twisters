const { Twisters, defaultRender } = require('twisters');

// This example will print the timestamp before the message text when
// the line buffer is disabled.
// The line buffer is automatically disabled for non-TTY streams.
// Run this script with CI=1 to force disabled output:
//  CI=1 node render-non-tty.js
const twisters = new Twisters({
  messageDefaults: {
    render: (message, frame) => {
      // If frame is null, the line buffer is disabled.
      //  Alternately, you could check if twisters.options.buffer.isDisabled is true.
      if (frame === null) {
        return `[${new Date().toISOString()}] ${message.text}`;
      }
      return defaultRender(message, frame);
    }
  }
});

// Add an inactive message
twisters.put('z', {
  text: 'This message is inactive.',
  active: false
});

// Add a message
twisters.put('a', {
  text: 'Loading'
});

setTimeout(() => {
  // Update the message
  twisters.put('a', {
    // Spinner is not shown when active is false
    active: false,
    // Change text
    text: 'Loaded (4s)'
  });
}, 4000);
