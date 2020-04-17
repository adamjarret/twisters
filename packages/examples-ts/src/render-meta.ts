import chalk from 'chalk';
import Twisters from 'twisters';
import { OK, NO } from './utils/prefixes';

interface Meta {
  status?: 'success' | 'warning' | 'failure' | 'hidden' | null;
}

const defaultMeta: Meta = {};

// This example demonstrates how to provide additional information about a message
//  via the meta property and then use that information in a custom render function.
const twisters = new Twisters<Meta>({
  messageDefaults: {
    render: (message, frame): string | null => {
      const { active, text, meta } = message;
      const { status } = meta || defaultMeta;

      let txt;

      // Use meta information to determine style
      switch (status) {
        case 'hidden':
          // Return null from render function to hide a message
          return null;
        case 'success':
          txt = chalk.green(`${OK} ${text}`);
          break;
        case 'warning':
          txt = chalk.yellow(`${OK} ${text}`);
          break;
        case 'failure':
          txt = chalk.red(`${NO} ${text}`);
          break;
        default:
          txt = text;
          break;
      }

      return active && frame ? `${frame} ${txt}` : txt;
    }
  }
});

// Add messages
twisters.put('hidden', { meta: { status: 'hidden' } });
twisters.put('example', { text: 'Task A' });
twisters.put('example-warning', { text: 'Task B' });
twisters.put('example-error', { text: 'Task C' });

setTimeout(() => {
  twisters.put('example', {
    active: false,
    meta: { status: 'success' },
    text: 'Task A succeeded'
  });
}, 2000);

setTimeout(() => {
  twisters.put('example-warning', {
    active: false,
    meta: { status: 'warning' },
    text: 'Task B finished with warnings'
  });
}, 4000);

setTimeout(() => {
  twisters.put('example-error', {
    active: false,
    meta: { status: 'failure' },
    text: 'Task C failed'
  });

  twisters.put('hidden', {
    active: false,
    meta: { status: null },
    text: 'This hidden message was just revealed'
  });
}, 6000);
