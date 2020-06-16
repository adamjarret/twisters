import stringWidth from 'string-width';

/**
 * Simulate tab stops using spaces
 * @remarks `tabStop` can be used instead of actual tabs to sidestep a TTY quirk.
 * 
 * When Twisters overwrites a line of text, it only clears from the end of the new text
 * to the end of the terminal line (as opposed to clearing the entire line before
 * writing which can cause a flickering effect).
 * 
 * When a tab (`\t`) character is written to the stream, the cursor advances without
 * overwriting the text, which can cause garbage text to remain on the line in some cases.
 * 
 * Use `tabStop` to create the illusion of regular tab breaks by inserting the
 * required number of spaces (assumes 8 character wide tab stop by default).
 * @example {@link https://github.com/adamjarret/twisters/tree/master/packages/examples-js/bin/util/tab-stop.js util/tab-stop.js}
 * ```js
 * tabStop(line.split('\t'))
 * ```
 */
export function tabStop(input: string[], columns = 8): string {
  const lastIndex = input.length - 1;

  return input.reduce<string>((agg, chunk, i) => {
    agg += chunk;
    if (i !== lastIndex) {
      agg += ' '.repeat(columns - (stringWidth(agg) % columns) || columns);
    }
    return agg;
  }, '');
}
