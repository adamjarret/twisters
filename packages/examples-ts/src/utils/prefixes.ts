import { terminalSupportsUnicode } from 'twisters';

const unicode = terminalSupportsUnicode();

export const OK = unicode ? '✓' : '√';
export const NO = unicode ? '✖' : '×';
