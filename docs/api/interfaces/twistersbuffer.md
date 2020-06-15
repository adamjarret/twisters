# Interface: TwistersBuffer

## Hierarchy

- **TwistersBuffer**

## Implemented by

- [LineBuffer](../classes/linebuffer.md)

## Index

### Properties

- [isDisabled](twistersbuffer.md#readonly-isdisabled)

### Methods

- [cleanup](twistersbuffer.md#optional-cleanup)
- [init](twistersbuffer.md#optional-init)
- [teardown](twistersbuffer.md#optional-teardown)
- [updateBegin](twistersbuffer.md#optional-updatebegin)
- [updateEnd](twistersbuffer.md#optional-updateend)
- [write](twistersbuffer.md#write)

## Properties

### <a id="readonly-isdisabled" name="readonly-isdisabled"></a> `Readonly` isDisabled

• **isDisabled**: _boolean_

Should be true if related stream is not TTY.

## Methods

### <a id="optional-cleanup" name="optional-cleanup"></a> `Optional` cleanup

▸ **cleanup**(): _void_

Called after the last update.

**Returns:** _void_

---

### <a id="optional-init" name="optional-init"></a> `Optional` init

▸ **init**(): _void_

Called before the first update.

**Returns:** _void_

---

### <a id="optional-teardown" name="optional-teardown"></a> `Optional` teardown

▸ **teardown**(): _void_

Called the first time a removed message is encountered.

**Returns:** _void_

---

### <a id="optional-updatebegin" name="optional-updatebegin"></a> `Optional` updateBegin

▸ **updateBegin**(): _void_

Called before writing a group of buffered messages.

**Returns:** _void_

---

### <a id="optional-updateend" name="optional-updateend"></a> `Optional` updateEnd

▸ **updateEnd**(): _void_

Called after writing a group of buffered messages.

**Returns:** _void_

---

### <a id="write" name="write"></a> write

▸ **write**(`text`: string | null, `isBuffered`: boolean): _void_

Called to write text to the stream.

**Implementation Notes:**

- The `updateStart` method will be called to start an update batch before writing buffered messages.
- The `updateEnd` method will be called to signify the end of an update batch after messages are written.
- Unbuffered messages will NOT be written AFTER buffered messages within an update batch.
- Unbuffered messages may be written outside of an update batch.

**Parameters:**

| Name         | Type               |
| ------------ | ------------------ |
| `text`       | string &#124; null |
| `isBuffered` | boolean            |

**Returns:** _void_
