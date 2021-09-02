import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { history } from 'umi';
import { connect } from 'dva';

import ImgUrl from '@/constant/imagesUrl';

import styles from './index.less';

class Login extends Component<any, any> {
  userLogin = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload,
      callback: () => {
        const { loginInfo } = this.props;
        console.log(loginInfo);
        if (loginInfo.message === '登录成功') {
          history.push('/');
        }
      },
    });
  };

  onFinish = (formValue) => {
    this.handleLogin(formValue);
  };

  onFinishFailed = () => {
    console.log('onFinishFailed');
  };

  handleLogin = (formValue) => {
    console.log('handleLogin');
    this.userLogin(formValue);
  };

  handleRegistry = () => {
    console.log('handleRegistry');
  };

  render() {
    return (
      <div className={styles.loginWrap}>
        <div className={styles.imgDiv}>
          <img src={ImgUrl.LoginImg} alt="Login" />
        </div>
        <div className={styles.cardWarp}>
          <div className={styles.oauthHeader}>
            <p className={styles.oauthTitle}>千策-API测试平台</p>
          </div>
          <div className={styles.formLayout}>
            <Form
              name="login"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
            >
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名！' }]}
              >
                <Input placeholder="请输入用户名" />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ login }) => ({
  loginInfo: login.loginInfo,
}))(Login);
