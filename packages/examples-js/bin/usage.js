const chalk = require('chalk');
const { Twisters } = require('twisters');

// Create a twisters instance to manage messages
const twisters = new Twisters();

// Add a message (messages are active by default)
twisters.put('a', {
  text: 'Hello world!'
});

setTimeout(() => {
  // Update the message
  twisters.put('a', {
    // Text can optionally be styled with any ANSI library
    text: chalk.yellow('This text has been updated')
  });
}, 2000);

setTimeout(() => {
  // Update the message again
  twisters.put('a', {
    // Spinner is not shown when active is false
    active: false,
    // Display a yellow prefix before the text
    text: `${chalk.yellow('+')} Done (4s)`
  });
}, 4000);
