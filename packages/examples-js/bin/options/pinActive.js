const { Twisters } = require('twisters');

const twisters = new Twisters({ pinActive: true });

twisters.put('Quick');
setTimeout(() => twisters.put('Quick', { active: false }), 6000);

twisters.put('Quicker');
setTimeout(() => twisters.put('Quicker', { active: false }), 4000);

twisters.put('Quickest');
setTimeout(() => twisters.put('Quickest', { active: false }), 2000);

twisters.put('Inactive', { active: false });
