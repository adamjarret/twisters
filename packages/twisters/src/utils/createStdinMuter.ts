import readline, { Interface } from 'readline';
import MuteStream from 'mute-stream';

/**
 * Mute/unmute a stream.
 */
export interface Muter {
  mute: () => void;
  unmute: () => void;
  isMuted: () => boolean;
}

/**
 * Returns an object capable of muting stdin output.
 * @remarks This implementation was based on `StdinDiscarder` from [ora](https://github.com/sindresorhus/ora) (MIT).
 */
export function createStdinMuter(): Muter | undefined {
  const { stdin: input, stdout } = process;

  // No known way to make this work reliably on Windows
  if (process.platform === 'win32' || !input.isTTY) {
    return;
  }

  const output = new MuteStream();
  output.pipe(stdout);
  output.mute();

  let rl: Interface | undefined;
  let isMuted = false;

  const unmute = (): void => {
    if (!isMuted) {
      return;
    }

    rl?.close();
    rl?.removeAllListeners('SIGINT');
    rl = undefined;
    isMuted = false;
  };

  const mute = (): void => {
    if (isMuted) {
      return;
    }

    isMuted = true;

    rl = readline.createInterface({ input, output });

    rl.on('SIGINT', () => {
      unmute();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      process.emit('SIGINT');
    });
  };

  return { mute, unmute, isMuted: (): boolean => isMuted };
}

export default createStdinMuter;
