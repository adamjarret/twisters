const kuler = require('kuler');

const red = (text) => kuler(text, '#FF0000');
const blue = (text) => kuler(text, '#0000FF');
const green = (text) => kuler(text, '#008000');
const magenta = (text) => kuler(text, '#FF00FF');

require('../utils/createDemo')(undefined, { red, green, blue, magenta });
