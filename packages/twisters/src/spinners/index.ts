// Extracted from [spinnies](https://github.com/jcarpanelli/spinnies) (MIT)

import { Spinner } from '../types';

export const dots: Spinner = {
  interval: 50,
  frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
};

export const dashes: Spinner = {
  interval: 80,
  frames: ['-', '_']
};
