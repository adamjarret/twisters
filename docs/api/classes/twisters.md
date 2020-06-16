# Class: Twisters ‹**Meta**›

## Type parameters

▪ **Meta**

## Hierarchy

- **Twisters**

## Index

### Constructors

- [constructor](twisters.md#constructor)

### Properties

- [lineBuffer](twisters.md#linebuffer)
- [options](twisters.md#options)
- [spinnerLoop](twisters.md#spinnerloop)

### Methods

- [flush](twisters.md#flush)
- [forEachMessage](twisters.md#foreachmessage)
- [hasActiveMessage](twisters.md#hasactivemessage)
- [log](twisters.md#log)
- [messageCount](twisters.md#messagecount)
- [pick](twisters.md#pick)
- [put](twisters.md#put)
- [remove](twisters.md#remove)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

\+ **new Twisters**(`options?`: Partial‹[TwistersOptions](../interfaces/twistersoptions.md)‹Meta››, `buffer?`: [TwistersBuffer](../interfaces/twistersbuffer.md)): _[Twisters](twisters.md)_

Create new Twisters instance

**Parameters:**

| Name       | Type                                                               | Description                                                                                                  |
| ---------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `options?` | Partial‹[TwistersOptions](../interfaces/twistersoptions.md)‹Meta›› | -                                                                                                            |
| `buffer?`  | [TwistersBuffer](../interfaces/twistersbuffer.md)                  | **DEPRECATED** Please define `buffer` in `options` instead of passing it as the second constructor parameter |

**Returns:** _[Twisters](twisters.md)_

## Properties

### <a id="linebuffer" name="linebuffer"></a> lineBuffer

• **lineBuffer**: _[TwistersBuffer](../interfaces/twistersbuffer.md)_

**`deprecated`** Please reference `options.buffer` instead

---

### <a id="options" name="options"></a> options

• **options**: _[TwistersOptions](../interfaces/twistersoptions.md)‹Meta›_

---

### <a id="spinnerloop" name="spinnerloop"></a> spinnerLoop

• **spinnerLoop**: _[SpinnerLoop](../interfaces/spinnerloop.md)_

## Methods

### <a id="flush" name="flush"></a> flush

▸ **flush**(): _void_

Flush messages to stream.

**`remarks`** This is called automatically if the `flushInactive` option is true.
Otherwise this must be called manually when all messages have finished.

**Returns:** _void_

---

### <a id="foreachmessage" name="foreachmessage"></a> forEachMessage

▸ **forEachMessage**(`callback`: [ForEachMessageCallback](../README.md#foreachmessagecallback)‹Meta›): _void_

Iterate over buffered messages and invoke the callback for each one.

**Parameters:**

| Name       | Type                                                                |
| ---------- | ------------------------------------------------------------------- |
| `callback` | [ForEachMessageCallback](../README.md#foreachmessagecallback)‹Meta› |

**Returns:** _void_

---

### <a id="hasactivemessage" name="hasactivemessage"></a> hasActiveMessage

▸ **hasActiveMessage**(): _boolean_

Returns true if any of the buffered messages are active, otherwise false.

**Returns:** _boolean_

---

### <a id="log" name="log"></a> log

▸ **log**(`text`: string, `messageOpt?`: Partial‹[Message](../interfaces/message.md)‹Meta››): _[Message](../interfaces/message.md)‹Meta›_

Log an inactive message
(convenience function equivalent to `put('text', { active: false })`)

**Parameters:**

| Name          | Type                                               |
| ------------- | -------------------------------------------------- |
| `text`        | string                                             |
| `messageOpt?` | Partial‹[Message](../interfaces/message.md)‹Meta›› |

**Returns:** _[Message](../interfaces/message.md)‹Meta›_

---

### <a id="messagecount" name="messagecount"></a> messageCount

▸ **messageCount**(): _number_

Get buffered message count.

**Returns:** _number_

---

### <a id="pick" name="pick"></a> pick

▸ **pick**(`name`: string): _[Message](../interfaces/message.md)‹Meta› | undefined_

Get buffered message by name.

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `name` | string |

**Returns:** _[Message](../interfaces/message.md)‹Meta› | undefined_

---

### <a id="put" name="put"></a> put

▸ **put**(`name`: string, `messageOpt?`: Partial‹[Message](../interfaces/message.md)‹Meta››): _[Message](../interfaces/message.md)‹Meta›_

Add/update a message

**`remarks`** Message content is not cached by default.
**This means that message text must be provided to subsequent `put` calls,
even if the text is unchanged.**
See [custom-cache.js example](https://github.com/adamjarret/twisters/blob/master/packages/examples-js/bin/custom-cache.js) to update messages using only changed attributes.

**Parameters:**

| Name          | Type                                               |
| ------------- | -------------------------------------------------- |
| `name`        | string                                             |
| `messageOpt?` | Partial‹[Message](../interfaces/message.md)‹Meta›› |

**Returns:** _[Message](../interfaces/message.md)‹Meta›_

---

### <a id="remove" name="remove"></a> remove

▸ **remove**(`name`: string): _[Message](../interfaces/message.md)‹Meta› | undefined_

Remove a buffered message by name
(convenience function equivalent to `put('name', { removed: true })`)

**Parameters:**

| Name   | Type   |
| ------ | ------ |
| `name` | string |

**Returns:** _[Message](../interfaces/message.md)‹Meta› | undefined_

The existing message that was removed or undefined if no message was found for the provided key
