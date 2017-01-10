jest.autoMockOff();

import React from 'react';
import ReactDom from 'react-dom';
import TestUtils from 'react-addons-test-utils'


import ZSample from './ZSample_ES6Class'


describe('ZSample', ()=>{
  let component = TestUtils.renderIntoDocument(<ZSample />);

  let node = ReactDom.findDOMNode(component);



  it('기본값 랜더링', () => {

    expect(node.textContent).toEqual('ES6 클래스 컴포넌트')
  })

})
