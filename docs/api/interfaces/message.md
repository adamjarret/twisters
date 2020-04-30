# Interface: Message <**Meta**>

## Type parameters

▪ **Meta**

## Hierarchy

- **Message**

## Index

### Properties

- [active](message.md#active)
- [meta](message.md#optional-meta)
- [render](message.md#render)
- [text](message.md#text)

## Properties

### <a id="active" name="active"></a> active

• **active**: _boolean_

Optional status. Spinner is not displayed if active is false.

**`default`** true

---

### <a id="optional-meta" name="optional-meta"></a> `Optional` meta

• **meta**? : _Meta_

Optional additional information about this message. Can be used in render function, etc.

**`default`** undefined

**`example`** [ render-meta.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-meta.js)

---

### <a id="render" name="render"></a> render

• **render**: _function_

Optional function used to get the display text for the message if provided.

**`remarks`** The `spinnerFrame` param will be null if line buffer is disabled.

**`returns`** text to be written to stream (or null to write nothing)

**`example`**
[render.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render.js),
[render-meta.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-meta.js),
[render-non-tty.js](https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-non-tty.js)

#### Type declaration:

▸ (`message`: [Message](message.md)‹Meta›, `spinnerFrame`: string | null, `name`: string): _string | null_

**Parameters:**

| Name           | Type                        |
| -------------- | --------------------------- |
| `message`      | [Message](message.md)‹Meta› |
| `spinnerFrame` | string &#124; null          |
| `name`         | string                      |

---

### <a id="text" name="text"></a> text

• **text**: _string_

Optional text to display. If none is provided, the message name passed to put will be used.

**`default`** `name`
