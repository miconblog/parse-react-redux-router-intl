import './MainLayout.less';
import React, { Component, PropTypes } from 'react';
import { connect }  from 'react-redux';
import Header    from '../../components/Header/Header';

class MainLayout extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  render(){

    const { children, loginUser } = this.props;

    return (
      <div id="app" className="MainLayout">

        <Header loginUser={this.props.loginUser} />
        { children &&
          React.cloneElement(children, {
            loginUser: loginUser
          })
        }
      </div>
    )
  }
}



function mapStateToProps(state, ownProps) {
  return {
    loginUser: state.get('loginUser')
  }
}

export default connect(mapStateToProps, {

})(MainLayout)
