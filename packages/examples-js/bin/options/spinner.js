const { Twisters } = require('twisters');

// Use custom spinner
//  See https://github.com/sindresorhus/cli-spinners/blob/master/spinners.json for more examples
const twisters = new Twisters({
  spinner: {
    interval: 100,
    frames: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐']
  }
});

// Add a message
twisters.put('a', {
  text: 'Please wait'
});

setTimeout(() => {
  // Update the message
  twisters.put('a', {
    // Spinner is not shown when active is false
    active: false,
    // Change text
    text: 'Done (3s)'
  });
}, 3000);
