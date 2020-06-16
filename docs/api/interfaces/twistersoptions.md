# Interface: TwistersOptions ‹**Meta**›

## Type parameters

▪ **Meta**

## Hierarchy

- **TwistersOptions**

## Index

### Properties

- [buffer](twistersoptions.md#buffer)
- [flushInactive](twistersoptions.md#flushinactive)
- [messageDefaults](twistersoptions.md#optional-messagedefaults)
- [pinActive](twistersoptions.md#pinactive)
- [spinner](twistersoptions.md#spinner)

## Properties

### <a id="buffer" name="buffer"></a> buffer

• **buffer**: _[TwistersBuffer](twistersbuffer.md)_

Object that implements the `TwistersBuffer` interface.
Handles writing lines to a stream.

---

### <a id="flushinactive" name="flushinactive"></a> flushInactive

• **flushInactive**: _boolean_

Flush inactive messages ASAP.
This option has no effect if line buffer is disabled.

**`remarks`** If this value is false, you must call twisters.flush() when all operations have completed.

**`example`** [options/flushInactive.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/flushInactive.js)

**`default`** true

---

### <a id="optional-messagedefaults" name="optional-messagedefaults"></a> `Optional` messageDefaults

• **messageDefaults**? : _Partial‹[Message](message.md)‹Meta››_

Messages inherit these values when they are passed to put.

**`example`**
[render.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render.js),
[render-meta.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-meta.js),
[render-non-tty.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-non-tty.js)

---

### <a id="pinactive" name="pinactive"></a> pinActive

• **pinActive**: _boolean_

Always render active messages on the bottommost lines.
This causes messages to be flushed in the order they finish.
This option has no effect if line buffer is disabled.

**`example`** [options/pinActive.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/pinActive.js)

**`default`** false

---

### <a id="spinner" name="spinner"></a> spinner

• **spinner**: _[Spinner](spinner.md)_

Spinner definition.
This option has no effect if line buffer is disabled.

**`remarks`** Compatible with [cli-spinners](https://github.com/sindresorhus/cli-spinners)

**`example`** [options/spinner.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/spinner.js)

**`default`** dots (if terminal supports unicode, otherwise dashes)
