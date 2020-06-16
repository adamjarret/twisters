# API

## Index

### Classes

- [LineBuffer](classes/linebuffer.md)
- [Twisters](classes/twisters.md)

### Interfaces

- [Cursor](interfaces/cursor.md)
- [LineBufferOptions](interfaces/linebufferoptions.md)
- [Message](interfaces/message.md)
- [Muter](interfaces/muter.md)
- [Spinner](interfaces/spinner.md)
- [SpinnerLoop](interfaces/spinnerloop.md)
- [TwistersBuffer](interfaces/twistersbuffer.md)
- [TwistersOptions](interfaces/twistersoptions.md)

### Type aliases

- [ForEachMessageCallback](README.md#foreachmessagecallback)
- [MessageMap](README.md#messagemap)
- [NoMeta](README.md#nometa)

### Variables

- [sharedCursor](README.md#const-sharedcursor)
- [sharedStdinMuter](README.md#const-sharedstdinmuter)

### Functions

- [createCursor](README.md#createcursor)
- [createSpinnerLoop](README.md#createspinnerloop)
- [createStdinMuter](README.md#createstdinmuter)
- [defaultRender](README.md#defaultrender)
- [tabStop](README.md#tabstop)
- [terminalSupportsUnicode](README.md#terminalsupportsunicode)
- [wrapText](README.md#wraptext)

### Object literals

- [dashes](README.md#const-dashes)
- [dots](README.md#const-dots)

## Type aliases

### <a id="foreachmessagecallback" name="foreachmessagecallback"></a> ForEachMessageCallback

Ƭ **ForEachMessageCallback**: _function_

#### Type declaration:

▸ (`message`: [Message](interfaces/message.md)‹Meta›, `name`: string, `allMessages`: [MessageMap](README.md#messagemap)‹Meta›): _void_

**Parameters:**

| Name          | Type                                     |
| ------------- | ---------------------------------------- |
| `message`     | [Message](interfaces/message.md)‹Meta›   |
| `name`        | string                                   |
| `allMessages` | [MessageMap](README.md#messagemap)‹Meta› |

---

### <a id="messagemap" name="messagemap"></a> MessageMap

Ƭ **MessageMap**: _Map‹string, [Message](interfaces/message.md)‹Meta››_

---

### <a id="nometa" name="nometa"></a> NoMeta

Ƭ **NoMeta**: _undefined_

## Variables

### <a id="const-sharedcursor" name="const-sharedcursor"></a> `Const` sharedCursor

• **sharedCursor**: _[Cursor](interfaces/cursor.md)_ = createCursor()

---

### <a id="const-sharedstdinmuter" name="const-sharedstdinmuter"></a> `Const` sharedStdinMuter

• **sharedStdinMuter**: _undefined | [Muter](interfaces/muter.md)_ = createStdinMuter()

## Functions

### <a id="createcursor" name="createcursor"></a> createCursor

▸ **createCursor**(): _[Cursor](interfaces/cursor.md)_

Returns an object capable of showing and hiding the CLI cursor.

**`remarks`** This is a thin wrapper around [cli-cursor](https://www.npmjs.com/package/cli-cursor).

**Returns:** _[Cursor](interfaces/cursor.md)_

---

### <a id="createspinnerloop" name="createspinnerloop"></a> createSpinnerLoop

▸ **createSpinnerLoop**(`spinner`: [Spinner](interfaces/spinner.md)): _[SpinnerLoop](interfaces/spinnerloop.md)_

Returns an object capable of managing setInterval calls related to a spinner.

**`remarks`** This implementation was based on code from [spinnies](https://github.com/jcarpanelli/spinnies) (MIT).

**Parameters:**

| Name      | Type                             |
| --------- | -------------------------------- |
| `spinner` | [Spinner](interfaces/spinner.md) |

**Returns:** _[SpinnerLoop](interfaces/spinnerloop.md)_

---

### <a id="createstdinmuter" name="createstdinmuter"></a> createStdinMuter

▸ **createStdinMuter**(): _[Muter](interfaces/muter.md) | undefined_

Returns an object capable of muting stdin output.

**`remarks`** This implementation was based on `StdinDiscarder` from [ora](https://github.com/sindresorhus/ora) (MIT).

**Returns:** _[Muter](interfaces/muter.md) | undefined_

---

### <a id="defaultrender" name="defaultrender"></a> defaultRender

▸ **defaultRender**‹**Meta**›(`message`: [Message](interfaces/message.md)‹Meta›, `frame`: string | null): _string_

The function used to render messages if a render function is not defined by the Message object.

**Type parameters:**

▪ **Meta**

**Parameters:**

| Name      | Type                                   |
| --------- | -------------------------------------- |
| `message` | [Message](interfaces/message.md)‹Meta› |
| `frame`   | string &#124; null                     |

**Returns:** _string_

---

### <a id="tabstop" name="tabstop"></a> tabStop

▸ **tabStop**(`input`: string[], `columns`: number): _string_

Simulate tab stops using spaces

**`remarks`** `tabStop` can be used instead of actual tabs to sidestep a TTY quirk.

When Twisters overwrites a line of text, it only clears from the end of the new text
to the end of the terminal line (as opposed to clearing the entire line before
writing which can cause a flickering effect).

When a tab (`\t`) character is written to the stream, the cursor advances without
overwriting the text, which can cause garbage text to remain on the line in some cases.

Use `tabStop` to create the illusion of regular tab breaks by inserting the
required number of spaces (assumes 8 character wide tab stop by default).

**`example`** [util/tab-stop.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/util/tab-stop.js)

```js
tabStop(line.split('\t'));
```

**Parameters:**

| Name      | Type     | Default |
| --------- | -------- | ------- |
| `input`   | string[] | -       |
| `columns` | number   | 8       |

**Returns:** _string_

---

### <a id="terminalsupportsunicode" name="terminalsupportsunicode"></a> terminalSupportsUnicode

▸ **terminalSupportsUnicode**(): _boolean_

The default command prompt and PowerShell in Windows do not support Unicode characters.
However, the VS Code integrated terminal and the Windows Terminal both do,
so this function takes the TERM_PROGRAM and WT_SESSION environment variables into account.

**`remarks`** This implementation was extracted from [spinnies](https://github.com/jcarpanelli/spinnies) (MIT).

**Returns:** _boolean_

---

### <a id="wraptext" name="wraptext"></a> wrapText

▸ **wrapText**(`text`: string, `columns`: number, `wordWrap`: boolean): _string_

Wrap text to the specified column width by inserting line breaks.

**`remarks`** This is a thin wrapper around [wrap-ansi](https://www.npmjs.com/package/wrap-ansi).

**Parameters:**

| Name       | Type    | Default |
| ---------- | ------- | ------- |
| `text`     | string  | -       |
| `columns`  | number  | 80      |
| `wordWrap` | boolean | false   |

**Returns:** _string_

## Object literals

### <a id="const-dashes" name="const-dashes"></a> `Const` dashes

### ▪ **dashes**: _object_

### <a id="frames" name="frames"></a> frames

• **frames**: _string[]_ = ['-', '_']

### <a id="interval" name="interval"></a> interval

• **interval**: _number_ = 80

---

### <a id="const-dots" name="const-dots"></a> `Const` dots

### ▪ **dots**: _object_

### <a id="frames" name="frames"></a> frames

• **frames**: _string[]_ = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']

### <a id="interval" name="interval"></a> interval

• **interval**: _number_ = 50
