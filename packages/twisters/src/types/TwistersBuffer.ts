export interface TwistersBuffer {
  /**
   * Should be true if related stream is not TTY.
   */
  readonly isDisabled: boolean;

  /**
   * Called before the first update.
   */
  init?(): void;

  /**
   * Called before writing a group of buffered messages.
   */
  updateBegin?(): void;

  /**
   * Called after writing a group of buffered messages.
   */
  updateEnd?(): void;

  /**
   * Called the first time a removed message is encountered.
   */
  teardown?(): void;

  /**
   * Called after the last update.
   */
  cleanup?(): void;

  /**
   * Called to write text to the stream.
   *
   * __Implementation Notes:__
   * - The `updateStart` method will be called to start an update batch before writing buffered messages.
   * - The `updateEnd` method will be called to signify the end of an update batch after messages are written.
   * - Unbuffered messages will NOT be written AFTER buffered messages within an update batch.
   * - Unbuffered messages may be written outside of an update batch.
   */
  write(text: string | null, isBuffered: boolean): void;
}
