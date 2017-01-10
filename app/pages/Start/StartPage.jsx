import './StartPage.less';
import React, { Component, PropTypes } from 'react';
import { connect }  from 'react-redux';
import { Link }  from 'react-router';
import { FormattedMessage } from 'react-intl';

import LocaleSwitch from '../../components/LocaleSwitch/LocaleSwitch'

class StartPage extends Component {

  static propTypes = {
    loginUser: PropTypes.object.isRequired
  };

  constructor(props){
    super(props);

    this.state = {}
  }

  render(){

    const { routeName, children } = this.props;

    return (
      <div id="app" className="StartPage">
        <div><FormattedMessage id="StartPage.main.text" defaultMessage="StartPage.main.text" /></div>
        <LocaleSwitch />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

export default connect(mapStateToProps, {
})(StartPage)
