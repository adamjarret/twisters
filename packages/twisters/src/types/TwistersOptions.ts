import { Message, NoMeta } from './Message';
import { Spinner } from './Spinner';
import { TwistersBuffer } from './TwistersBuffer';

export interface TwistersOptions<Meta = NoMeta> {
  /**
   * Object that implements the `TwistersBuffer` interface.
   * Handles writing lines to a stream.
   * @default new LineBuffer()
   */
  buffer: TwistersBuffer;

  /**
   * Spinner definition.
   * This option has no effect if line buffer is disabled.
   * @remarks Compatible with {@Link https://github.com/sindresorhus/cli-spinners | cli-spinners}
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/spinner.js options/spinner.js}
   * @default dots (if terminal supports unicode, otherwise dashes)
   */
  spinner: Spinner;

  /**
   * Messages inherit these values when they are passed to put.
   * @example
   * {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render.js render.js},
   * {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-meta.js render-meta.js},
   * {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/render-non-tty.js render-non-tty.js}
   */
  messageDefaults?: Partial<Message<Meta>>;

  /**
   * Flush inactive messages ASAP.
   * This option has no effect if line buffer is disabled.
   * @remarks If this value is false, you must call twisters.flush() when all operations have completed.
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/flushInactive.js options/flushInactive.js}
   * @default true
   */
  flushInactive: boolean;

  /**
   * Always render active messages on the bottommost lines.
   * This causes messages to be flushed in the order they finish.
   * This option has no effect if line buffer is disabled.
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/pinActive.js options/pinActive.js}
   * @default false
   */
  pinActive: boolean;
}
