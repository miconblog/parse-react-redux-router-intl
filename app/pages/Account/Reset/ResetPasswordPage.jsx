import './ResetPasswordPage.less';
import React, { Component, PropTypes } from 'react';
import { requestPasswordReset } from '../../../libs/parseConnectRedux';
import { FormattedMessage } from 'react-intl';

import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;


export default Form.create()(

  class ResetPasswordPage extends Component {

    render() {

      const { getFieldDecorator } = this.props.form;

      return (
        <div className="ResetPasswordPage" >
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
              <Button type="primary" htmlType="submit" className="login-form-button">
                <FormattedMessage id="ResetPasswordPage.submit.button" />
              </Button>
              <p className="notice">
                <FormattedMessage id="ResetPasswordPage.notice" />
              </p>
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
          'email': fieldsValue['email']
        };

        requestPasswordReset(values.email);

      });
    }
  }

);
