import wrapAnsi from 'wrap-ansi';

/**
 * Wrap text to the specified column width by inserting line breaks.
 * @remarks This is a thin wrapper around {@Link https://www.npmjs.com/package/wrap-ansi wrap-ansi}.
 */
export function wrapText(text: string, columns = 80, wordWrap = false): string {
  return wrapAnsi(text, columns, { trim: false, hard: true, wordWrap });
}

export default wrapText;
