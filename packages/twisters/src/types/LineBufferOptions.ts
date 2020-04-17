export interface LineBufferOptions {
  /**
   * Output stream. Pass null to prevent all output.
   * @default process.stderr
   */
  stream: NodeJS.WriteStream | null;

  /**
   * Disable TTY functionality. Messages will be immediately flushed to output.
   * @default false if CI environment variable is not set, otherwise true
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/disable.js options/disable.js}
   */
  disable: boolean;

  /**
   * Discard stdin input (except Ctrl+C) while running if it's TTY.
   * This prevents the spinner from twitching on input, outputting broken lines on Enter key presses,
   * and prevents buffering of input while the spinner is running.
   * This option has no effect on Windows as there's no good way to implement discarding stdin properly there.
   * This option has no effect if line buffer is disabled.
   * @default true
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/discardStdin.js options/discardStdin.js}
   */
  discardStdin: boolean;

  /**
   * Cleanup and exit process when sigint is called.
   * @remarks If this value is false, it is recommended that you call cleanup in your custom sigint handler.
   * @default true
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/handleSigint.js options/handleSigint.js}
   */
  handleSigint: boolean;

  /**
   * Truncate output to fit in terminal (`stream.rows`).
   * This option has no effect if line buffer is disabled.
   * @remarks Useful when displaying more buffered message lines than the stream has rows.
   * @default true
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/truncate.js options/truncate.js}
   */
  truncate: boolean;

  /**
   * Attempt to split lines at spaces when wrapping.
   * @default false
   * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/options/wordWrap.js options/wordWrap.js}
   */
  wordWrap: boolean;

  /**
   * Line ending character.
   * @default '\n'
   */
  EOL: string;
}
