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
  public lineBuffer: TwistersBuffer;
  public spinnerLoop: SpinnerLoop;

  protected messages: MessageMap<Meta>;

  constructor(
    options: Partial<TwistersOptions<Meta>> | null = null,
    lineBuffer = new LineBuffer()
  ) {
    this.options = {
      spinner: terminalSupportsUnicode() ? dots : dashes,
      flushInactive: true,
      pinActive: false,
      ...options
    };
    this.lineBuffer = lineBuffer;
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
    return Array.from(this.messages.values()).some(({ active }) => active);
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
    const { messageDefaults } = this.options;
    const message: Message<Meta> = {
      text: name,
      active: true,
      render: defaultRender,
      ...messageDefaults,
      ...messageOpt
    };

    if (this.lineBuffer.isDisabled) {
      this.lineBuffer.write(message.render(message, null, name), false);
    } else {
      this.messages.set(name, message);
      this.refresh();
    }

    return message;
  }

  /**
   * Remove a buffered message by name
   */
  public remove(name: string): Message<Meta> | undefined {
    if (this.lineBuffer.isDisabled) {
      return;
    }

    const message = this.pick(name);

    this.messages.delete(name);

    this.refresh();

    return message;
  }

  /**
   * Flush messages to stream.
   * @remarks This is called automatically if the `flushInactive` option is true.
   * Otherwise this must be called manually when all messages have finished.
   */
  public flush(): void {
    if (this.lineBuffer.isDisabled) {
      return;
    }

    this.spinnerLoop.stop();
    this.updateBuffer();
    this.lineBuffer.cleanup();
    this.messages.clear();
  }

  protected refresh(): void {
    const { flushInactive } = this.options;

    if (flushInactive && !this.hasActiveMessage()) {
      this.flush();
    } else {
      this.lineBuffer.init();
      this.spinnerLoop.start((frame) => this.updateBuffer(frame));
    }
  }

  protected updateBuffer(frame = ''): void {
    const { flushInactive, pinActive } = this.options;
    const pinned = new Map<string, Message<Meta>>();
    let foundActive = false;

    this.lineBuffer.updateBegin();

    // Write (or pin) each message
    this.forEachMessage((message, name) => {
      if (message.active) {
        if (pinActive) {
          pinned.set(name, message);
          return;
        }
        foundActive = true;
      }

      const isBuffered = foundActive || !flushInactive;

      this.lineBuffer.write(message.render(message, frame, name), isBuffered);

      if (!isBuffered) {
        this.messages.delete(name);
      }
    });

    // Write each pinned message (always active and buffered)
    pinned.forEach((message, name) => {
      this.lineBuffer.write(message.render(message, frame, name), true);
    });

    this.lineBuffer.updateEnd();
  }
}

export default Twisters;
