import React, { Component } from 'react';
import { history, Link } from 'umi';
import { connect } from 'dva';
import ImagesUrl from '@/constant/imagesUrl';
import './index.less';
import {
  DownOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Modal, Layout, Dropdown, Menu, message, Button } from 'antd';
const { Header } = Layout;

class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      isModalVisible: false,
    };
  }

  logout = (value) => {
    const payload = {
      username: value,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'login/logout',
      payload,
      callback: (res) => {
        if (res.message === '登出成功') {
          history.push('/login');
          message.info('登出成功');
          localStorage.removeItem('qc_user');
          localStorage.removeItem('token');
          localStorage.removeItem('openKeys');
          localStorage.removeItem('selectedKeys');
        }
        this.setState({
          isModalVisible: false,
        });
      },
    });
  };

  showModal() {
    this.setState({ isModalVisible: true });
  }

  handleCancel() {
    this.setState({ isModalVisible: false });
  }
  passwordInfo = () => {
    Modal.info({
      title: '提示信息',
      content: (
        <div>
          <p>账号为：qc</p>
          <p>密码为：qiance</p>
        </div>
      ),
      onOk() {
        window.open('http://10.6.209.209:4999/web/#/5/23');
      },
    });
  };

  render() {
    const dropdownMenu = (
      <Menu>
        {/* <Menu.Item key="0" onClick={() => message.info('功能开发中')}>
          <span><EditOutlined />&nbsp;&nbsp;修改密码</span>
        </Menu.Item> */}
        <Menu.Item key="1" onClick={this.showModal}>
          <span>
            <LogoutOutlined />
            &nbsp;&nbsp;注销
          </span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="header">
        <div className="header_left">
          <div className="header_left_content">
            <div className="header_logo">
              <Link to="/">
                <img src={ImagesUrl.Logo} alt="" width="80" height="40" />
              </Link>
            </div>
          </div>
        </div>
        <div className="header_center"></div>
        <div className="header_right">
          <div className="header_right_content">
            <div className="user_icon">
              <img
                src={ImagesUrl.UserIcon}
                style={{ width: 30, height: 30, borderRadius: '15px' }}
              ></img>
            </div>
            <div>
              <Button onClick={this.passwordInfo} type="text" style={{}}>
                <QuestionCircleOutlined style={{ fontSize: '30px' }} />
              </Button>
            </div>
            <Dropdown overlay={dropdownMenu} trigger={['click']}>
              <div className="user_profile">
                <div className="user_profile_content">
                  <span>
                    {/* <img src={ImagesUrl.Logout} width="38"></img> */}
                    {localStorage.getItem('qc_user')}
                  </span>
                  <DownOutlined className="icon" />
                </div>
              </div>
            </Dropdown>
          </div>
        </div>
        <Modal
          title="退出登录"
          visible={this.state.isModalVisible}
          onOk={(e) => this.logout(localStorage.getItem('qc_user'))}
          onCancel={this.handleCancel}
        >
          <p>您确定退出登录？</p>
        </Modal>
      </Header>
    );
  }
}

export default connect(({ login }) => ({}))(MyHeader);
