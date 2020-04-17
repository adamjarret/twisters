# Class: LineBuffer

## Hierarchy

- **LineBuffer**

## Implements

- [TwistersBuffer](../interfaces/twistersbuffer.md)

## Index

### Constructors

- [constructor](linebuffer.md#constructor)

### Properties

- [isDisabled](linebuffer.md#isdisabled)
- [lineCount](linebuffer.md#linecount)
- [options](linebuffer.md#options)

### Methods

- [cleanup](linebuffer.md#cleanup)
- [init](linebuffer.md#init)
- [updateBegin](linebuffer.md#updatebegin)
- [updateEnd](linebuffer.md#updateend)
- [write](linebuffer.md#write)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

\+ **new LineBuffer**(`options?`: Partial‹[LineBufferOptions](../interfaces/linebufferoptions.md)›): _[LineBuffer](linebuffer.md)_

**Parameters:**

| Name       | Type                                                             |
| ---------- | ---------------------------------------------------------------- |
| `options?` | Partial‹[LineBufferOptions](../interfaces/linebufferoptions.md)› |

**Returns:** _[LineBuffer](linebuffer.md)_

## Properties

### <a id="isdisabled" name="isdisabled"></a> isDisabled

• **isDisabled**: _boolean_

_Implementation of [TwistersBuffer](../interfaces/twistersbuffer.md).[isDisabled](../interfaces/twistersbuffer.md#isdisabled)_

---

### <a id="linecount" name="linecount"></a> lineCount

• **lineCount**: _number_

Buffered line count.

---

### <a id="options" name="options"></a> options

• **options**: _[LineBufferOptions](../interfaces/linebufferoptions.md)_

Configuration options.

## Methods

### <a id="cleanup" name="cleanup"></a> cleanup

▸ **cleanup**(): _void_

_Implementation of [TwistersBuffer](../interfaces/twistersbuffer.md)_

1. Restore terminal cursor visibility and position.
2. Unmute stdin (if it was previously muted).

**`remarks`** If the handleSigint option is false, this method should be called from any custom
sigint handler.

**Returns:** _void_

---

### <a id="init" name="init"></a> init

▸ **init**(): _void_

_Implementation of [TwistersBuffer](../interfaces/twistersbuffer.md)_

1. Hide the terminal cursor.
2. Mute stdin (if discardStdin option is true).

**Returns:** _void_

---

### <a id="updatebegin" name="updatebegin"></a> updateBegin

▸ **updateBegin**(): _void_

_Implementation of [TwistersBuffer](../interfaces/twistersbuffer.md)_

Reset the line counter.

**Returns:** _void_

---

### <a id="updateend" name="updateend"></a> updateEnd

▸ **updateEnd**(): _void_

_Implementation of [TwistersBuffer](../interfaces/twistersbuffer.md)_

1. Clear from the cursor to the end of the screen.
2. Move the cursor to top of buffered content.

**Returns:** _void_

---

### <a id="write" name="write"></a> write

▸ **write**(`text`: string | null, `isBuffered`: boolean): _void_

_Implementation of [TwistersBuffer](../interfaces/twistersbuffer.md)_

Write text to the stream.

**Usage Notes:**

- The `updateStart` method should be called to start an update batch before writing buffered messages.
- The `updateEnd` method should be called to signify the end of an update batch after messages are written.
- Unbuffered messages should NOT be written AFTER buffered messages within an update batch.
- Unbuffered messages may be written outside of an update batch.

**Parameters:**

| Name         | Type               | Default |
| ------------ | ------------------ | ------- |
| `text`       | string &#124; null | -       |
| `isBuffered` | boolean            | true    |

**Returns:** _void_
