import { dashes, dots } from './spinners';
import {
  Message,
  MessageMap,
  NoMeta,
  TwistersBuffer,
  TwistersOptions
} from './types';
import {
  LineBuffer,
  SpinnerLoop,
  createSpinnerLoop,
  terminalSupportsUnicode
} from './utils';

export type ForEachMessageCallback<Meta> = (
  message: Message<Meta>,
  name: string,
  allMessages: MessageMap<Meta>
) => void;

/**
 * The function used to render messages if a render function is not defined by the Message object.
 */
export function defaultRender<Meta>(
  message: Message<Meta>,
  frame: string | null
): string {
  const { active, text } = message;
  return active && frame ? `${frame} ${text}` : text;
}

export class Twisters<Meta = NoMeta> {
  public options: TwistersOptions<Meta>;
  public spinnerLoop: SpinnerLoop;

  /** @deprecated Please reference `options.buffer` instead */
  public lineBuffer: TwistersBuffer;

  protected messages: MessageMap<Meta>;

  /**
   * Create new Twisters instance
   * @param options
   * @param buffer __DEPRECATED__ Please define `buffer` in `options` instead of passing it as the second constructor parameter
   */
  constructor(
    options?: Partial<TwistersOptions<Meta>>,
    buffer?: TwistersBuffer
  ) {
    this.options = {
      buffer: options?.buffer || buffer || new LineBuffer(),
      spinner: terminalSupportsUnicode() ? dots : dashes,
      flushInactive: true,
      pinActive: false,
      ...options
    };
    this.lineBuffer = this.options.buffer;
    this.spinnerLoop = createSpinnerLoop(this.options.spinner);
    this.messages = new Map<string, Message<Meta>>();
  }

  /**
   * Get buffered message by name.
   */
  public pick(name: string): Message<Meta> | undefined {
    return this.messages.get(name);
  }

  /**
   * Get buffered message count.
   */
  public messageCount(): number {
    return this.messages.size;
  }

  /**
   * Iterate over buffered messages and invoke the callback for each one.
   */
  public forEachMessage(callback: ForEachMessageCallback<Meta>): void {
    this.messages.forEach(callback);
  }

  /**
   * Returns true if any of the buffered messages are active, otherwise false.
   */
  public hasActiveMessage(): boolean {
    return Array.from(this.messages.values()).some(
      ({ active, removed }) => active && !removed
    );
  }

  /**
   * Add/update a message
   *
   * @remarks Message content is not cached by default.
   * **This means that message text must be provided to subsequent `put` calls,
   * even if the text is unchanged.**
   * See {@Link https://github.com/adamjarret/twisters/blob/master/packages/examples-js/bin/custom-cache.js | custom-cache.js example} to update messages using only changed attributes.
   */
  public put(name: string, messageOpt?: Partial<Message<Meta>>): Message<Meta> {
    const { messageDefaults, buffer } = this.options;
    const message: Message<Meta> = {
      text: name,
      active: true,
      removed: false,
      render: defaultRender,
      ...messageDefaults,
      ...messageOpt
    };

    if (buffer.isDisabled) {
      if (!message.removed) {
        buffer.write(message.render(message, null, name), false);
      }
    } else {
      this.messages.set(name, message);
      this.refresh();
    }

    return message;
  }

  /**
   * Log an inactive message
   * (convenience function equivalent to `put('text', { active: false })`)
   */
  public log(text: string, messageOpt?: Partial<Message<Meta>>): Message<Meta> {
    return this.put(text, { active: false, ...messageOpt });
  }

  /**
   * Remove a buffered message by name
   * (convenience function equivalent to `put('name', { removed: true })`)
   * @returns The existing message that was removed or undefined if no message was found for the provided key
   */
  public remove(name: string): Message<Meta> | undefined {
    const message = this.pick(name);
    this.put(name, { removed: true });
    return message;
  }

  /**
   * Flush messages to stream.
   * @remarks This is called automatically if the `flushInactive` option is true.
   * Otherwise this must be called manually when all messages have finished.
   */
  public flush(): void {
    const { buffer } = this.options;
    if (buffer.isDisabled) {
      return;
    }

    this.spinnerLoop.stop();
    this.updateBuffer();
    buffer.cleanup && buffer.cleanup();
    this.messages.clear();
  }

  protected refresh(): void {
    const { buffer, flushInactive } = this.options;

    if (flushInactive && !this.hasActiveMessage()) {
      this.flush();
    } else {
      buffer.init && buffer.init();
      this.spinnerLoop.start((frame) => this.updateBuffer(frame));
    }
  }

  protected updateBuffer(frame = ''): void {
    const { buffer, flushInactive, pinActive } = this.options;
    const pinned = new Map<string, Message<Meta>>();
    let foundActive = false;
    let foundRemoved = false;

    buffer.updateBegin && buffer.updateBegin();

    // Write/pin/remove each message
    this.forEachMessage((message, name) => {
      if (message.removed) {
        if (!foundRemoved) {
          buffer.teardown && buffer.teardown();
          foundRemoved = true;
        }
        this.messages.delete(name);
        return;
      }

      if (message.active) {
        if (pinActive) {
          pinned.set(name, message);
          return;
        }
        foundActive = true;
      }

      const isBuffered = foundActive || !flushInactive;

      buffer.write(message.render(message, frame, name), isBuffered);

      if (!isBuffered) {
        this.messages.delete(name);
      }
    });

    // Write each pinned message (always active and buffered)
    pinned.forEach((message, name) => {
      buffer.write(message.render(message, frame, name), true);
    });

    buffer.updateEnd && buffer.updateEnd();
  }
}

export default Twisters;
