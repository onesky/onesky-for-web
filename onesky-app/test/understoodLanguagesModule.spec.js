const assert = require('assert');
window = {};
window.OsWidget = {};
var called = false;
var apicalled = false;
window.OsWidget.addLoader = () => { called = true; }
window.OsAppApi = {};
window.OsSelectors = {};
window.OsAppApi.findAppSelectorByExperienceType = () => { apicalled = true; }

var selectorcalled = false;
window.OsWidget.addSelectorRender = () => { selectorcalled = true; }
require('../src/js/widget/understoodLanguagesModule.js');

describe('Window Test Suite- All functions should be defined', ()=>{
  it('should initialize OsWidget.addLoader',()=>{
    assert.equal(called, true);
  })

  it('should initialize OsWidget.addSelectorRender',()=>{
    assert.equal(called, true);
  })
});