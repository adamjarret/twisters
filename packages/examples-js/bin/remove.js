const { Twisters } = require('twisters');

// Create a twisters instance to manage messages
const twisters = new Twisters();

// Call remove immediately
twisters.put('z');
twisters.remove('z');

// Call remove after delay
twisters.put('c', {
  text: 'Running'
});

twisters.put('b', {
  text: 'Secondary'
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
  twisters.remove('b');
}, 1000);

setTimeout(() => {
  twisters.remove('c');
}, 1500);
