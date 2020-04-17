const { Twisters, LineBuffer } = require('twisters');

// This example demonstrates a line buffer that is always disabled.
// Note: To see disabled output for other examples, set the environment variable CI=1
const buffer = new LineBuffer({ disable: true });
const twisters = new Twisters(null, buffer);

require('../../utils/createDemo')(twisters);
