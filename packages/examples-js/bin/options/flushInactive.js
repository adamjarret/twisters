const { Twisters } = require('twisters');

// By default, inactive messages are flushed to the output stream ASAP.
// Flushed messages may not be updated or removed.
// Set the flushInactive option to false to keep all messages buffered
// in memory until the flush method is called.
// This is useful if you want to be able to update/remove inactive messages.
//
// REMEMBER TO EXPLICITLY CALL twisters.flush() WHEN THIS VALUE IS FALSE.
//
const twisters = new Twisters({ flushInactive: false });

// Add messages
twisters.put('a', {
  active: false,
  text: 'This inactive line can still be removed'
});

twisters.put('b', {
  text: 'Hello'
});

twisters.put('c', {
  active: false,
  text: 'This inactive line can still be updated'
});

// Update messages after delay
setTimeout(() => {
  // Mark 'b' inactive and update text
  twisters.put('b', {
    active: false,
    text: 'Hello (6s)'
  });

  setTimeout(() => {
    // Mark 'c' active
    twisters.put('c', {
      active: true,
      text: "Look, I'm active now!"
    });

    setTimeout(() => {
      // Mark 'c' inactive and update text
      twisters.put('c', {
        active: false,
        text: 'World'
      });

      // When flushInactive is false, flush must be called explicitly when all
      // operations have finished.
      twisters.flush();
    }, 2000);
  }, 1000);
}, 6000);

// Remove 'a' message after delay
setTimeout(() => {
  twisters.remove('a');
}, 3000);
