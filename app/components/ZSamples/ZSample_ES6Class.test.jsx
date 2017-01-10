jest.autoMockOff();

import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import ZSample_ES6Class from './ZSample_ES6Class.jsx';

describe('ZSample_ES6Class', ()=>{
  let component = TestUtils.renderIntoDocument(<ZSample_ES6Class />);

  let node = ReactDom.findDOMNode(component);

  it('기본값 랜더링', () => {
    expect(node.textContent).toEqual('ES6 클래스 컴포넌트')
  })

})
