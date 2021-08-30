import React, { Component } from 'react';
import { history } from 'umi';
import ImagesUrl from '@/constant/imagesUrl';
import './index.less';
import { Modal, Layout } from 'antd';
const { Header } = Layout;

// 通过
import logo from '../../assets/logo.png';
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
    console.log('show');
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
            <div className="user_home">
              <div className="user_home_content" onClick={this.showModal}>
                <a href="#" className="">
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
