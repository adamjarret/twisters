const { Twisters, LineBuffer } = require('twisters');
const timeout = require('../utils/timeout');

/**
 * This experimental LineBuffer subclass clears the terminal scrollback
 * before updating.
 */
class ScrollbackLineBuffer extends LineBuffer {
  /**
   * Call clearScrollback before updates (if lineCount is not 0)
   */
  updateBegin() {
    if (this.lineCount !== 0) {
      this.clearScrollback();
    }

    super.updateBegin();
  }

  /**
   * Clear the terminal scrollback buffer
   */
  clearScrollback() {
    const { stream } = this.options;
    if (!stream || this.isDisabled) return;

    //  Thanks https://stackoverflow.com/a/29873308
    stream.write('\u001b[H\u001b[2J\u001b[3J');
  }
}

// Use subclass
const buffer = new ScrollbackLineBuffer({ truncate: false });
const twisters = new Twisters({ flushInactive: false }, buffer);

const messageCount = 100;

for (let i = 0; i < messageCount; i++) {
  twisters.put(`${i}`, {
    text: `Message ${i}`
  });
}

(async () => {
  for (let i = 0; i < messageCount; i++) {
    await timeout(200);
    twisters.put(`${i}`, {
      active: false,
      text: `Message ${i} done`
    });
  }

  // When flushInactive is false, flush must be called explicitly when all
  // operations have finished.
  twisters.flush();
})();
