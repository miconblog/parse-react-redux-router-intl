import './LocaleSwitch.less';
import React, { Component, PropTypes } from 'react';
import { changeLanguage } from '../../actions/i18n'
import { connect }  from 'react-redux';
import { Radio } from 'antd';

class LocaleSwitch extends Component {

  static propTypes = {
    locale: PropTypes.string.isRequired
  };

  render(){

    const { locale } = this.props;

    return (
      <div className="LocaleSwitch">
        <Radio.Group defaultValue={locale} onChange={this.changeLocale}>
          <Radio.Button key="en" value={'en'}>English</Radio.Button>
          <Radio.Button key="ko" value={'ko'}>한국어</Radio.Button>
        </Radio.Group>
      </div>
    )
  }

  changeLocale = (e) => {
    this.props.changeLanguage(e.target.value);
  }
}

function mapStateToProps(state, ownProps) {
  return {
    locale: state.get('language').get('locale')
  }
}

export default connect(mapStateToProps, {
  changeLanguage
})(LocaleSwitch)
