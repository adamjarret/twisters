/**
 * This example will produce the same output as
 * {@link https://github.com/jcarpanelli/spinnies/blob/0.5.1/examples/demo.js}
 *
 * Important: Message content is not cached by default.
 * This means that message text must be provided to subsequent put calls,
 * even if the text is unchanged.
 * See: custom-cache.js example to update messages using only changed attributes.
 */

const chalk = require('chalk');
const { Twisters } = require('twisters');
const { OK, NO } = require('../utils/prefixes');

const fruits = {
  interval: 150,
  frames: ['🍇', '🍈', '🍉', '🍋']
};

const indent = (value, n = 2, char = ' ') => `${char.repeat(n)}${value}`;

const twisters = new Twisters({
  spinner: fruits,
  messageDefaults: {
    render: (message, frame) => {
      const { active, text, meta } = message;
      const txt = chalk.blue(text);
      const rendered = active && frame ? `${frame} ${txt}` : txt;
      return meta && meta.indent ? indent(rendered, meta.indent) : rendered;
    }
  }
});

function succeed(name, message) {
  twisters.put(name, {
    ...message,
    active: false,
    text: chalk.green(`${OK} ${message.text}`)
  });
}

function fail(name, message) {
  twisters.put(name, {
    ...message,
    active: false,
    text: chalk.red(`${NO} ${message.text}`)
  });
}

twisters.put('first-spinner', {
  text: chalk.white('Lorem Ipsum is simply dummy text')
});

setTimeout(() => {
  twisters.put('second-spinner', { text: "I'm line 2" });
}, 3000);

setTimeout(() => {
  twisters.put('third-spinner', {
    text: chalk.yellowBright("And I'm ironman") // cspell:disable-line
  });
}, 5000);

setTimeout(() => {
  twisters.put('ephemeral-spinner', {
    text: 'Im an ephemeral spinner and will dissapear soon :(' // cspell:disable-line
  });
}, 6000);

setTimeout(() => {
  twisters.put('spinner-that-changes', {
    text:
      'I am another spinner that would love to make some friends! Also I am very long, but I break into two or more lines if needed'
  });
}, 7000);

setTimeout(() => {
  twisters.put('indented', {
    text: 'Im an indented line with 3 spaces',
    meta: {
      indent: 3
    }
  });
}, 7500);

setTimeout(() => {
  twisters.put('non-spinnable', {
    active: false,
    text: 'Im a non-spinnable line'
  });
}, 8000);

setTimeout(() => {
  fail('second-spinner', { text: 'And I failed :\\' });
}, 9000);

setTimeout(() => {
  succeed('indented', {
    text: 'Im an indented line with 3 spaces',
    meta: {
      indent: 3
    }
  });
}, 9500);

setTimeout(() => {
  succeed('first-spinner', {
    text: "I'm the updated (and optional) success message"
  });
}, 10000);

setTimeout(() => {
  twisters.put('third-spinner', {
    text: chalk.yellow('I have been updated :D')
  });
}, 12000);

setTimeout(() => {
  twisters.put('third-spinner', {
    text: chalk.cyan('I have been updated again :D')
  });
}, 14500);

setTimeout(() => {
  twisters.remove('ephemeral-spinner');
}, 16000);

setTimeout(() => {
  twisters.put('third-spinner', {
    text: chalk.magenta('Again, with fancy colors!')
  });
}, 17000);

setTimeout(() => {
  succeed('third-spinner', {
    text: 'Again, with fancy colors!'
  });
}, 20000);

setTimeout(() => {
  succeed('spinner-that-changes', {
    text: chalk.blue('Bye!')
  });
}, 18000);
