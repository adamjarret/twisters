const { tabStop } = require('twisters');

const input = '12345678\t2020-01-01 06:42:17\tFull width 古\tA.jpg';

console.log(input);
console.log(tabStop(input.split('\t')));
