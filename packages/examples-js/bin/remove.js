const { Twisters } = require('twisters');

// Create a twisters instance to manage messages
const twisters = new Twisters();

// Call remove immediately
twisters.put('z');
twisters.remove('z');

// Call remove after delay
twisters.put('b', {
  text: 'Running'
});

twisters.put('a', {
  text: 'Hello world!'
});

setTimeout(() => {
  twisters.remove('a');
  twisters.put('a', {
    text: '\tGoodbye!',
    active: false
  });
  twisters.put('b', { text: 'Done', active: false });
}, 1000);
