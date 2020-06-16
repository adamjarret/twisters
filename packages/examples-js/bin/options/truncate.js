const { Twisters, LineBuffer } = require('twisters');
const timeout = require('../../utils/timeout');

// This example demonstrates the need for a strategy to deal with text overflow.
// Run this script with TRUNCATE=0 to demonstrate behavior when truncate is false:
//  TRUNCATE=0 node truncate.js
// See the custom-scrollback.js example for another method of dealing with overflow.
const buffer = new LineBuffer({ truncate: !process.env.TRUNCATE });
const twisters = new Twisters({ buffer });

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
})();
