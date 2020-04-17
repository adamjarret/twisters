declare module 'mute-stream' {
  import { Duplex } from 'stream';

  export interface MuteStreamOptions {
    /**
     * Set to a string to replace each character with the specified string when muted.
     * (So you can show **** instead of the password, for example.)
     */
    replace?: string;

    /**
     * If you are using a replacement char, and also using a prompt with a readline stream
     * (as for a Password: ***** input), then specify what the prompt is so that backspace
     * will work properly. Otherwise, pressing backspace will overwrite the prompt with the
     * replacement character, which is weird.
     */
    prompt?: string;
  }

  export interface MuteStreamInstance extends Duplex {
    mute: () => void;
    unmute: () => void;
    isTTY: boolean;
  }

  const MuteStream: {
    new (options?: MuteStreamOptions): MuteStreamInstance;
  };

  export default MuteStream;
}
