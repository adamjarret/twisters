const { Twisters } = require('twisters');

/**
 * This Twisters subclass maintains a cache of all messages so that they can be
 * updated by providing only changed properties.
 *
 * The implementation of when to remove items from the cache is left to the user.
 */
class CachedTwisters extends Twisters {
  constructor(options) {
    super(options);
    this.cachedMessages = new Map();
  }

  put(name, messageOptions) {
    const existingOptions = this.cachedMessages.get(name);

    const message = super.put(name, {
      ...existingOptions,
      ...messageOptions
      // If you use an object as the meta option and want to merge it,
      //  you can uncomment the following lines:
      // meta: {
      //   ...(existingOptions ? existingOptions.meta : undefined),
      //   ...(messageOptions ? messageOptions.meta : undefined)
      // }
    });

    this.cachedMessages.set(name, message);

    return message;
  }
}

// Use subclass
const twisters = new CachedTwisters();

// Add a message
twisters.put('a', {
  text:
    'This text will still be displayed after the message is updated' +
    ' without specifying text.'
});

setTimeout(() => {
  // Update the message without specifying the text
  twisters.put('a', { active: false });
}, 3000);
