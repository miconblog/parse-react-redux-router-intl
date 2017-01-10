import './SignupPage.less';
import Parse from 'parse';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../actions/user';
import { browserHistory, Link } from 'react-router';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd';
const FormItem = Form.Item;

class Signup extends Component {

  static propTypes = {
    intl : intlShape.isRequired
  };

  constructor(props){
    super(props);

    console.log( props );

    this.state = {
      passwordDirty: false
    }
  }

  componentWillMount(){
    if( this.props.loginUser.objectId ) {
      browserHistory.replace('/');
    }
  }

  render() {
    const { pickerOpen, date } = this.state;
    const { form: { getFieldDecorator, setFieldsValue} } = this.props;
    const {formatMessage} = this.props.intl;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };

    return (
      <div className="SignupPage" >
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="이메일"
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '유효한 이메일 형식이 아닙니다.',
              }, {
                required: true, message: formatMessage({id:'SignupPage.Form.email.requiredMessage'}),
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="비밀번호"
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '비밀번호를 입력해주세요.',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password" onBlur={this.handlePasswordBlur} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="비밀번호 확인"
            hasFeedback
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '비밀번호가 다릅니다.',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
              별명&nbsp;
                <Tooltip title="이메일 대신 별명을 사용합니다.">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: '별명을 입력하세요.' }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
              rules: [{ required: true, message: '약관에 동의해주세요.' }],
            })(
              <Checkbox><a>회원약관</a>에 동의합니다.</Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" size="large">가입하기</Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  handleSubmit =(e)=> {
    e.preventDefault();
    const { loginUser: { baby } } = this.props;



    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }

      var user = new Parse.User();
      user.set('username', values.email);
      user.set('email', values.email);
      user.set('password', values.password);
      user.set('nickname', values.nickname);
      user.set('agreement', values.agreement);
      user.set('baby', baby)

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.

          console.log( user );
          this.props.login(user.toJSON())
          browserHistory.push('/timeline');
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          console.log(`Error: ${error.code} ${error.message}`);
        }
      });

    });
  }

  handlePasswordBlur=(e)=> {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('비밀번호를 확인해주세요.');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
}


const SignupPage = Form.create()(injectIntl(Signup));

function mapStateToProps(state, ownProps) {
  return {
    loginUser: state.get('loginUser')
  }
}

export default connect(mapStateToProps, {
  login
})(SignupPage)
