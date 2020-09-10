const assert = require('assert');
window = {};
require('../src/js/widget/OsWidget.js');


it('should initialize OsWidget object on window', () => {
  assert.equal(!!window.OsWidget, true);
})