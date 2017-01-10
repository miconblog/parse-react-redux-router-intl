import './ZSample.less'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { updateAppState } from '../actions'

class ZSample extends Component {

  static propTypes = {
  }

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
    return <div>Redux 스토어에 직접 접근하기 위한 커넥트 컴포넌트</div>
  }
}

function mapStateToProps(state, ownProps) {
  return {
    routing: state.routing.locationBeforeTransitions
  }
}

export default connect(mapStateToProps, {
  updateAppState
})(ZSample)