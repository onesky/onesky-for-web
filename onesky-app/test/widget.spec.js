const assert = require('assert');
window = {};
require('../src/js/widget/OsWidget.js');

describe('Window Test Suite- All functions should be defined', ()=>{
  it('should initialize OsWidget object on window', () => {
    assert.equal(!!window.OsSelectors, true);
    assert.equal(!!window.OsWidget, true);
    assert.equal(!!window.OsWidgetStylist, true);
  })
});

describe('OsWidget Test Suite- All functions should be defined', ()=>{

  it('should initialize OsWidget.init',()=>{
    assert.equal(!!window.OsWidget.init,true);
  })

  it('should initialize OsWidget.replace',()=>{
    assert.equal(!!window.OsWidget.replace,true);
  })

  it('should initialize OsWidget.initWithUrl',()=>{
    assert.equal(!!window.OsWidget.initWithUrl,true);
  })

  it('should initialize OsWidget.addLoader',()=>{
    assert.equal(!!window.OsWidget.addLoader,true);
  })

  it('should initialize OsWidget.addSelectorRender',()=>{
    assert.equal(!!window.OsWidget.addSelectorRender,true);
  })

  it('should initialize OsWidget.getUser',()=>{
    assert.equal(!!window.OsWidget.getUser,true);
  })

  it('should initialize OsWidget.render',()=>{
    assert.equal(!!window.OsWidget.render,true);
  })
  it('should initialize OsWidget.webTransition',()=>{
    assert.equal(!!window.OsWidget.webTransition,true);
  })
  it('should initialize OsWidget.getUrlPathObject',()=>{
    assert.equal(!!window.OsWidget.getUrlPathObject,true);
  })
  it('should initialize OsWidget.getUrlQueryParameterValue',()=>{
    assert.equal(!!window.OsWidget.getUrlQueryParameterValue,true);
  })
  it('should initialize OsWidget.getQueryParameterNameFromOutput',()=>{
    assert.equal(!!window.OsWidget.getQueryParameterNameFromOutput,true);
  })
  it('should initialize OsWidget.urlGetAddedParameter',()=>{
    assert.equal(!!window.OsWidget.urlGetAddedParameter,true);
  })

  it('should initialize OsWidget.getUrlHostnameLocaleFromMappedLocation',()=>{
    assert.equal(!!window.OsWidget.getUrlHostnameLocaleFromMappedLocation,true);
  })
  it('should initialize OsWidget.getUrlPathLocaleFromMappedLocation',()=>{
    assert.equal(!!window.OsWidget.getUrlPathLocaleFromMappedLocation,true);
  })
  it('should initialize OsWidget.getUrlQueryLocaleFromMappedLocation',()=>{
    assert.equal(!!window.OsWidget.getUrlQueryLocaleFromMappedLocation,true);
  })
  it('should initialize OsWidget.queryStringToJson',()=>{
    assert.equal(!!window.OsWidget.queryStringToJson,true);
  })
  it('should initialize OsWidget.rewriteParameteredUrlWithRefresh',()=>{
    assert.equal(!!window.OsWidget.rewriteParameteredUrlWithRefresh,true);
  })
  it('should initialize OsWidget.rewriteParameteredUrlWithoutRefresh',()=>{
    assert.equal(!!window.OsWidget.rewriteParameteredUrlWithoutRefresh,true);
  })
  it('should initialize OsWidget.rewritePathUrlWithRefresh',()=>{
    assert.equal(!!window.OsWidget.rewritePathUrlWithRefresh,true);
  })
  it('should initialize OsWidget.rewritePathUrlWithoutRefresh',()=>{
    assert.equal(!!window.OsWidget.queryStringToJson,true);
  })  
});

describe('OsWidgetStylist Test Suite- All functions should be defined', ()=>{

  it('OsWidgetStylist.renderHtmlSelector should be defined',()=>{
  assert.equal(!!window.OsWidgetStylist.renderHtmlSelector,true);
  })

});

it('OsWidget.init should call addEventListener on window object', () => { 
  var called = false;
  window.addEventListener = () => { called = true; }
  window.OsWidget.init();
  assert.equal(called, true);
})

it('OsWidget.replace should call initWithUrl 4 times', () => { 
  var count = 0;
  window.OsWidget.initWithUrl = () => { count = count + 1; }
  window.OsWidget.loaders = [];
  window.OsWidget.replace();
  assert.equal(count, 4);
})

it('OsWidget.getUser should return no user if user is not present', () => {
  onesky = {};
  assert.equal(!!window.OsWidget, true);
  var result = window.OsWidget.getUser();
  assert.equal(!!result, false);
})

it('OsWidget.getUser should return user if user is present', () => {
  onesky = {identifiedUser: { id: 'sam', name: 'samsam', email: 'abc@def.com'}};
  assert.equal(!!window.OsWidget, true);
  var result = window.OsWidget.getUser();
  assert.equal(result.id, 'sam');
})


