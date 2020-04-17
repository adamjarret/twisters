# Terminalizer Usage

Run commands from **project root**.

## Prerequisites

- [terminalizer](https://terminalizer.com/install) (`npm install -g terminalizer`)

## `demo-chalk.js`

### Record

    terminalizer record ./tmp/demo-chalk.yml -d 'node ./packages/examples-js/bin/demo-chalk.js' -c ./terminalizer/config.yml

Then, manually edit **./tmp/demo-chalk.yml**:

- Remove items from start of `records` that cause a blank frames
- Add item to the end of `records`:

        - delay: 1000
          content: " "

### Render

    terminalizer render ./tmp/demo-chalk.yml -o ./docs/assets/demo-chalk.gif

## `usage.js`

### Record

    terminalizer record ./tmp/usage.yml -d 'node ./packages/examples-js/bin/usage.js' -c ./terminalizer/config.yml

Then, manually edit **./tmp/usage.yml**:

- Set value of `rows` to `2`
- Remove items from start of `records` that cause a blank frames
- Add item to the end of `records`:

        - delay: 1000
          content: " "

### Render

    terminalizer render ./tmp/usage.yml -o ./docs/assets/usage.gif
