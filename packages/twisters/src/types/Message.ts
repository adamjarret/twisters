export type NoMeta = undefined;

export interface Message<Meta = NoMeta> {
  /**
   * Optional status. Spinner is not displayed if active is false.
   * @default true
   */
  active: boolean;

  /**
   * Optional text to display. If none is provided, the message name passed to put will be used.
   * @default `name`
   */
  text: string;

  /**
   * Optional additional information about this message. Can be used in render function, etc.
   * @default undefined
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-meta.js | render-meta.js}
   */
  meta?: Meta;

  /**
   * Optional function used to get the display text for the message if provided.
   * @remarks The `spinnerFrame` param will be null if line buffer is disabled.
   * @returns text to be written to stream (or null to write nothing)
   * @example
   * {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render.js render.js},
   * {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-meta.js render-meta.js},
   * {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-non-tty.js render-non-tty.js}
   */
  render: (
    message: Message<Meta>,
    spinnerFrame: string | null,
    name: string
  ) => string | null;
}

export type MessageMap<Meta = NoMeta> = Map<string, Message<Meta>>;
