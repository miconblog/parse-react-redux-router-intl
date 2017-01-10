import './ZSample.less'
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { updateAppState } from '../../actions'

export default class ZSample extends Component {

  static propTypes = {
  };

  static defaultProps = {
    propery: '기본값'
  };

  constructor(props){
    super(props);

    this.state = {
      value: '컴포넌트 상태 변수'
    }
  }

  render(){
    return (
      <div>ES6 클래스 컴포넌트</div>
    );
  }
}