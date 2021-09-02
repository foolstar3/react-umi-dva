import React, { Component } from 'react';
import { history, Link } from 'umi';
import ImagesUrl from '@/constant/imagesUrl';
import './index.less';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Layout, Dropdown, Menu, message } from 'antd';
const { Header } = Layout;

// 通过
import logo from '../../assets/logo.png';
const dropdownMenu = (
  <Menu>
    <Menu.Item key="0">
      <span onClick={() => message.info('功能开发中')}>修改密码</span>
    </Menu.Item>
    <Menu.Item key="1">
      <Link to="/login">注销</Link>
    </Menu.Item>
  </Menu>
);
class MyHeader extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      isModalVisible: false,
    };
  }
  showModal() {
    // console.log('show');
    this.setState({ isModalVisible: true });
  }
  handleOk() {
    history.push('/login');
    this.setState({ isModalVisible: false });
  }
  handleCancel() {
    this.setState({ isModalVisible: false });
  }
  render() {
    return (
      <Header className="header">
        <div className="header_left">
          <div className="header_left_content">
            <div className="header_logo">
              <img src={ImagesUrl.Logo} alt="" width="80" height="40" />
            </div>
          </div>
        </div>
        <div className="header_center"></div>
        <div className="header_right">
          <div className="header_right_content">
            <div className="user_icon">
              <img
                src={ImagesUrl.UserIcon}
                style={{ width: 38, height: 38, borderRadius: '19px' }}
              ></img>
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
            <div className="user_home">
              <div className="user_home_content" onClick={this.showModal}>
                <a className="">
                  <img src={ImagesUrl.Logout} width="38"></img>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="退出登录"
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>您确定退出登陆？</p>
        </Modal>
      </Header>
    );
  }
}

export default MyHeader;
