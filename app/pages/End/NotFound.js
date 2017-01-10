import './NotFound.less';
import React, { Component, PropTypes, contextTypes } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <div className="NotFound">
        <header className="Header">
          <Link className="logo" to={'/'}><h1>Parse-React-Redux-Router</h1></Link>
        </header>

        <main className="main" role="main">

          <p><strong>페이지를 찾을 수 없습니다.</strong></p>
          <p>
          찾으시려는 웹페이지의 주소가 잘못입력되었거나,<br />페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
          </p>

          <Link to={'/'}>메인페이지로 이동하기</Link>

        </main>
      </div>
    );
  }
}
