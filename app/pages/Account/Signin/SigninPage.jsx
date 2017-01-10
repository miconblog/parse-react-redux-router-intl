import './SigninPage.less';
import Parse from 'parse';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../actions/user';
import { browserHistory, Link } from 'react-router';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;


const SigninPage = Form.create()(

  class extends Component {

    constructor(props){
      super(props);

      this.state = {
        name: '',
        date: null
      }
    }

    componentWillMount(){
      if( this.props.loginUser.objectId ) {
        browserHistory.replace('/');
      }
    }


    render() {
      const { date } = this.state;
      const { getFieldDecorator, setFieldsValue } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };

      let dateStr = '';
      if( date ){
        dateStr = date.format('LL')
      }

      return (
        <div className="SigninPage" >
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: '유효한 이메일 형식이 아닙니다.',
                }, {
                  required: true, message: '이메일을 입력해주세요.',
                }],
              })(
                <Input addonBefore={<Icon type="mail" />} placeholder="이메일" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '비밀번호를 입력해주세요.' }],
              })(
                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="비밀번호" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>비밀번호 저장</Checkbox>
              )}
              {/*<a className="login-form-forgot">Forgot password</a>*/}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              <div className="links">
                <Link to={'/reset-password'}>비밀번호를 잃어버렸습니다.</Link>
                <Link to={'/signup'}>회원가입</Link>
              </div>
            </FormItem>
          </Form>
        </div>
      );
    }

    handleSubmit = (e) =>{
      e.preventDefault();

      this.props.form.validateFields((err, fieldsValue) => {
        if (err) {
          return;
        }

        // Should format date value before submit.
        const values = {
          ...fieldsValue,
          'email': fieldsValue['email'],
          'password': fieldsValue['password']
        };

        Parse.User.logIn(values.email, values.password, {
          success: user => {


            let loginUser = user.toJSON();

            this.props.login(loginUser);

            browserHistory.push('/timeline');

          },
          error: (user, error) => {

            console.log('error', user, error)
            // The login failed. Check error to see why.
          }
        });

      });
    }
  }

);

function mapStateToProps(state, ownProps) {
  return {
    loginUser: state.get('loginUser')
  }
}

export default connect(mapStateToProps, {
  login
})(SigninPage)

