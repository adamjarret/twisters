import cliCursor from 'cli-cursor';

/**
 * Show/hide the CLI cursor.
 */
export interface Cursor {
  hide: () => void;
  show: () => void;
  isHidden: () => boolean;
}

/**
 * Returns an object capable of showing and hiding the CLI cursor.
 * @remarks This is a thin wrapper around {@Link https://www.npmjs.com/package/cli-cursor cli-cursor}.
 */
export function createCursor(): Cursor {
  let isHidden = false;

  const hide = (): void => {
    if (!isHidden) {
      cliCursor.hide();
      isHidden = true;
    }
  };

  const show = (): void => {
    if (isHidden) {
      cliCursor.show();
      isHidden = false;
    }
  };

  return { hide, show, isHidden: (): boolean => isHidden };
}

export default createCursor;
