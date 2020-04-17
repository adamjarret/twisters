const { terminalSupportsUnicode } = require('twisters');

const unicode = terminalSupportsUnicode();

module.exports.OK = unicode ? '✓' : '√';
module.exports.NO = unicode ? '✖' : '×';
