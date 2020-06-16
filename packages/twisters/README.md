# Twisters

[![npm version](https://img.shields.io/npm/v/twisters.svg?style=flat)](https://npmjs.org/package/twisters 'View this project on npm')
[![git repository](https://img.shields.io/badge/source-GitHub-brightgreen)](https://github.com/adamjarret/twisters/tree/master/packages/twisters 'View this project on GitHub')

![Demo Screen Shot](https://adamjarret.github.io/twisters/assets/demo-chalk.gif)

Display multiple simultaneous animated spinners in node terminal applications

- BYO-colors (supports [chalk](https://github.com/chalk/chalk), [colorette](https://github.com/jorgebucaran/colorette), [kleur](https://github.com/lukeed/kleur), [kuler](https://github.com/3rd-Eden/kuler), etc. but _depends_ on none of them)
- Compatible with any spinner from [cli-spinners](https://github.com/sindresorhus/cli-spinners)
- Supports [fullwidth characters](https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms)
- Simple and flexible [API](https://adamjarret.github.io/twisters/api/)
- Lots of [examples](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/)
- Written in TypeScript

Inspired by [spinnies](https://github.com/jcarpanelli/spinnies) and
[ora](https://github.com/sindresorhus/ora)

## Installation

    npm install twisters

or

    yarn add twisters

### TypeScript

If you use TypeScript, `@types/node` must also be installed:

    npm install -D @types/node

or

    yarn add -D @types/node

## Usage

```js
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
```

### Result

![Usage Screen Shot](https://adamjarret.github.io/twisters/assets/usage.gif)

## Options

The [Twisters class](https://adamjarret.github.io/twisters/api/classes/twisters.html) constructor takes an optional `options` argument. Defaults are used if corresponding values are not defined, which means this:

```js
const { Twisters } = require('twisters');

const twisters = new Twisters();
```

is equivalent to this:

```js
const {
  Twisters,
  LineBuffer,
  terminalSupportsUnicode,
  dots,
  dashes
} = require('twisters');

const twisters = new Twisters({
  spinner: terminalSupportsUnicode() ? dots : dashes,
  flushInactive: true,
  pinActive: false,
  messageDefaults: {
    active: true,
    removed: false,
    render: (message, frame) => {
      const { active, text } = message;
      return active && frame ? `${frame} ${text}` : text;
    }
  },
  buffer: new LineBuffer({
    EOL: '\n',
    disable: !!process.env.CI,
    discardStdin: true,
    handleSigint: true,
    stream: process.stderr,
    truncate: true,
    wordWrap: false
  })
});
```

See the documentation for details:

- [Message](https://adamjarret.github.io/twisters/api/interfaces/message.html)
- [TwistersOptions](https://adamjarret.github.io/twisters/api/interfaces/twistersoptions.html)
- [LineBufferOptions](https://adamjarret.github.io/twisters/api/interfaces/linebufferoptions.html)

## Known Limitations

Care must be taken with messages that contain tab (`\t`) characters.
See [tabStop](https://adamjarret.github.io/twisters/api/#tabstop) for details.

## Examples

See the [examples-js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js) and [examples-ts](https://github.com/adamjarret/twisters/tree/master/packages/examples-ts) packages

## Documentation

See [API Documentation](https://adamjarret.github.io/twisters/api/)

## Development

See [README](https://github.com/adamjarret/twisters#readme) in the repository root

## License

[MIT](https://github.com/adamjarret/twisters/tree/master/LICENSE.txt)

## Author

[Adam Jarret](https://atj.me)
