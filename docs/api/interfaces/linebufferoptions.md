# Interface: LineBufferOptions

## Hierarchy

- **LineBufferOptions**

## Index

### Properties

- [EOL](linebufferoptions.md#eol)
- [disable](linebufferoptions.md#disable)
- [discardStdin](linebufferoptions.md#discardstdin)
- [handleSigint](linebufferoptions.md#handlesigint)
- [stream](linebufferoptions.md#stream)
- [truncate](linebufferoptions.md#truncate)
- [wordWrap](linebufferoptions.md#wordwrap)

## Properties

### <a id="eol" name="eol"></a> EOL

• **EOL**: _string_

Line ending character.

**`default`** '\n'

---

### <a id="disable" name="disable"></a> disable

• **disable**: _boolean_

Disable TTY functionality. Messages will be immediately flushed to output.

**`default`** false if CI environment variable is not set, otherwise true

**`example`** [options/disable.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/disable.js)

---

### <a id="discardstdin" name="discardstdin"></a> discardStdin

• **discardStdin**: _boolean_

Discard stdin input (except Ctrl+C) while running if it's TTY.
This prevents the spinner from twitching on input, outputting broken lines on Enter key presses,
and prevents buffering of input while the spinner is running.
This option has no effect on Windows as there's no good way to implement discarding stdin properly there.
This option has no effect if line buffer is disabled.

**`default`** true

**`example`** [options/discardStdin.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/discardStdin.js)

---

### <a id="handlesigint" name="handlesigint"></a> handleSigint

• **handleSigint**: _boolean_

Cleanup and exit process when sigint is called.

**`remarks`** If this value is false, it is recommended that you call cleanup in your custom sigint handler.

**`default`** true

**`example`** [options/handleSigint.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/handleSigint.js)

---

### <a id="stream" name="stream"></a> stream

• **stream**: _WriteStream | null_

Output stream. Pass null to prevent all output.

**`default`** process.stderr

---

### <a id="truncate" name="truncate"></a> truncate

• **truncate**: _boolean_

Truncate output to fit in terminal (`stream.rows`).
This option has no effect if line buffer is disabled.

**`remarks`** Useful when displaying more buffered message lines than the stream has rows.

**`default`** true

**`example`** [options/truncate.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/truncate.js)

---

### <a id="wordwrap" name="wordwrap"></a> wordWrap

• **wordWrap**: _boolean_

Attempt to split lines at spaces when wrapping.

**`default`** false

**`example`** [options/wordWrap.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/wordWrap.js)
