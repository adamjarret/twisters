const { Twisters, defaultRender } = require('twisters');
const { OK, NO } = require('./prefixes');
const timeout = require('./timeout');

const lineBreakText = 'Message text\nmay contain\nline breaks';

const longTextPrefix = 'This message is long and will wrap.';

const longText = 'All work and no play makes Jack a dull boy. '.repeat(2);

const fullwidthText = 'Fullwidth characters like 古 are supported';

const selfDestruct = (s) => `${s} seconds until this message will be removed`;

/**
 * This example output is used by several examples to demonstrate various
 * features.
 *
 * Important: Message content is not cached by default.
 * This means that message text must be provided to subsequent put calls,
 * even if the text is unchanged.
 * See: custom-cache.js example to update messages using only changed attributes.
 */
module.exports = async (twisters = new Twisters(), styles = {}) => {
  const successPrefix = styles.green ? styles.green(OK) : OK;
  const failPrefix = styles.red ? styles.red(NO) : NO;
  const blue = styles.blue || ((s) => s);
  const magenta = styles.magenta || ((s) => s);

  function succeed(name, message) {
    twisters.put(name, {
      ...message,
      active: false,
      text: `${successPrefix} ${message.text}`
    });
  }

  function fail(name, message) {
    twisters.put(name, {
      ...message,
      active: false,
      text: `${failPrefix} ${message.text}`
    });
  }

  twisters.put('A', { text: 'Task A will succeed' });

  twisters.put('B', { text: 'Task B will fail' });

  await timeout(1500);

  succeed('A', { text: 'Task A succeeded (1s)' });

  await timeout(1000);

  fail('B', { text: 'Task B failed (2s)' });

  // removable
  for (let i = 3; i > 0; i--) {
    twisters.put('removable', { text: magenta(selfDestruct(i)) });
    await timeout(1000);
  }

  twisters.remove('removable');

  // string-width
  twisters.put('string-width', {
    text: blue(fullwidthText)
  });

  await timeout(2000);

  succeed('string-width', { text: blue(fullwidthText) });

  // line break
  twisters.put('line-break', {
    text: lineBreakText,
    // spinner will be magenta for this message
    render: (message, frame) =>
      defaultRender(message, frame ? magenta(frame) : frame)
  });

  await timeout(2000);

  succeed('line-break', { text: lineBreakText });

  // long
  twisters.put('long', { text: `${blue(longTextPrefix)} ${longText}` });

  await timeout(2000);

  succeed('long', { text: `${blue(longTextPrefix)} ${longText}` });
};
