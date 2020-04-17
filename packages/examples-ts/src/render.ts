import Twisters from 'twisters';

// This example demonstrates how to implement a custom default message render
// function that is applied to all messages that do not explicitly implement
// their own.
const twisters = new Twisters({
  // Specify custom spinner
  spinner: {
    interval: 200,
    frames: ['.  ', '.. ', '...', '   ']
  },
  // Messages passed to put will inherit these properties
  messageDefaults: {
    render: (message, frame): string => {
      const { active, text } = message;
      // Render frame after text with no spacer
      return active && frame ? `${text}${frame}` : text;
    }
  }
});

// Add a message
twisters.put('a', { text: 'Loading' });

setTimeout(() => {
  // Update the message
  twisters.put('a', {
    // Spinner is not shown when active is false
    active: false,
    // Change text
    text: 'Loaded (4s)'
  });
}, 4000);
