import { Spinner } from '../types';

/**
 * Manage setInterval calls related to a spinner.
 */
export interface SpinnerLoop {
  start: (callback: (frame: string) => void) => void;
  stop: () => void;
  currentFrameIndex: () => number;
}

/**
 * Returns an object capable of managing setInterval calls related to a spinner.
 * @remarks This implementation was based on code from [spinnies](https://github.com/jcarpanelli/spinnies) (MIT).
 */
export function createSpinnerLoop(spinner: Spinner): SpinnerLoop {
  let currentFrameIndex = 0;
  let currentInterval: NodeJS.Timeout | null = null;

  const stop = (): void => {
    if (currentInterval) {
      clearInterval(currentInterval);
    }
  };

  const start = (callback: (frame: string) => void): void => {
    const { frames, interval } = spinner;

    stop();

    currentInterval = setInterval(() => {
      const index = currentFrameIndex;
      callback(frames[index]);
      currentFrameIndex = index === frames.length - 1 ? 0 : index + 1;
    }, interval);
  };

  return { start, stop, currentFrameIndex: (): number => currentFrameIndex };
}

export default createSpinnerLoop;
