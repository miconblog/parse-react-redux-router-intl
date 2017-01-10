import './Header.less';
import Parse from 'parse';
import React, { Component, PropTypes } from 'react';
import { logout } from '../../actions/user';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends Component {

  static propTypes = {};

  static defaultProps = {};

  constructor(props){
    super(props);

    this.state = {
      current: 'home'
    }
  }

  render(){

    const { loginUser } = this.props;

    return (
      <header className="Header">
        <Link className="logo" to={'/'}><h1>Parse-React-Redux-Router-Intl</h1></Link>

        <Menu className="menu-list" onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
        >
          <Menu.Item key="home">
            <Link to={'/'}><Icon type="home"/><FormattedMessage id="Header.menu.home"/></Link>
          </Menu.Item>

          {!loginUser.objectId &&
          <Menu.Item key="signin">
            <Link to={'/signin'}><Icon type="user"/><FormattedMessage id="Header.menu.signin"/></Link>
          </Menu.Item>
          }
          {loginUser.objectId &&
          <Menu.Item key="username">
            {loginUser.username}
          </Menu.Item>
          }
          {loginUser.objectId &&
          <Menu.Item key="signout">
            <Icon type="user"/>로그아웃
          </Menu.Item>
          }
        </Menu>
      </header>
    );
  }

  handleClick = (e) => {

    if( e.key === 'signout' ){
      Parse.User
        .logOut()
        .then(() => {
          this.props.logout();
          browserHistory.replace('/');
        });

    }

    this.setState({
      current: e.key
    })
  }
}


function mapStateToProps(state, ownProps) {
  return {}
}

export default connect(mapStateToProps, { logout })(Header)
