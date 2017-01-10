import './ZSample_Animation.less'
import React, { Component, PropTypes } from 'react'

export default class ZSample_Animation extends Component {

  static propTypes = {};
  static defaultProps = { propery: '기본값'};

  constructor(props){
    super(props);
    this.state = { value: '컴포넌트 상태 변수' }
  }

  render(){
    return (
      <div className="ZSample_Animation">
        <div className="heart">&hearts;</div>
      </div>
    );
  }
}