import readline from 'readline';
import stringWidth from 'string-width';
import { LineBufferOptions, TwistersBuffer } from '../types';
import { sharedCursor, sharedStdinMuter } from './constants';
import wrapText from './wrapText';

export class LineBuffer implements TwistersBuffer {
  /**
   * Buffered line count.
   */
  public lineCount: number;

  /**
   * Configuration options.
   */
  public options: LineBufferOptions;

  readonly isDisabled: boolean;

  constructor(options?: Partial<LineBufferOptions>) {
    this.options = {
      EOL: '\n',
      disable: !!process.env.CI,
      discardStdin: true,
      handleSigint: true,
      stream: process.stderr,
      truncate: true,
      wordWrap: false,
      ...options
    };

    const { disable, handleSigint, stream } = this.options;

    this.lineCount = 0;
    this.isDisabled = disable || !stream || !stream.isTTY;

    if (handleSigint) {
      process.on('SIGINT', () => {
        this.cleanup();

        // Emulate default node behavior (exit with code 128 + signal number)
        process.exit(128 + 2);
      });
    }
  }

  /**
   * 1. Hide the terminal cursor.
   * 2. Mute stdin (if discardStdin option is true).
   */
  public init(): void {
    if (!this.isDisabled) {
      sharedCursor.hide();

      if (this.options.discardStdin) {
        sharedStdinMuter?.mute();
      }
    }
  }

  /**
   * Reset the line counter.
   */
  public updateBegin(): void {
    if (this.isDisabled) return;

    this.lineCount = 0;
  }

  /**
   * 1. Clear from the cursor to the end of the screen.
   * 2. Move the cursor to top of buffered content.
   */
  public updateEnd(): void {
    const { stream } = this.options;
    if (!stream || this.isDisabled) return;

    readline.clearScreenDown(stream);

    readline.moveCursor(stream, 0, -this.lineCount);
  }

  /**
   * 1. Restore terminal cursor visibility and position.
   * 2. Unmute stdin (if it was previously muted).
   * @remarks If the handleSigint option is false, this method should be called from any custom
   * sigint handler.
   */
  public cleanup(): void {
    const { stream } = this.options;
    if (!stream || this.isDisabled) return;

    sharedCursor.show();

    readline.moveCursor(stream, 0, this.lineCount);

    sharedStdinMuter?.unmute();
  }

  /**
   * Write text to the stream.
   *
   * __Usage Notes:__
   * - The `updateStart` method should be called to start an update batch before writing buffered messages.
   * - The `updateEnd` method should be called to signify the end of an update batch after messages are written.
   * - Unbuffered messages should NOT be written AFTER buffered messages within an update batch.
   * - Unbuffered messages may be written outside of an update batch.
   */
  public write(text: string | null, isBuffered = true): void {
    const { stream, truncate, wordWrap, EOL } = this.options;
    if (!stream || text === null) return;

    const maxColumns = stream.columns;
    const wrapped = isBuffered ? wrapText(text, maxColumns, wordWrap) : text;
    const lines = wrapped.split(EOL);

    lines.forEach((line) => {
      if (!this.isDisabled && truncate && this.lineCount >= stream.rows - 1) {
        return;
      }
      stream.write(line);
      if (!this.isDisabled && stringWidth(line) < maxColumns) {
        readline.clearLine(stream, 1); // Clear from cursor to end of line
      }
      stream.write(EOL);
      if (isBuffered) {
        this.lineCount++;
      }
    });
  }
}
