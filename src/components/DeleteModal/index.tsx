import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './index.less';

class DeleteModal extends Component {
  handleOk = () => {
    const { onOk } = this.props;
    onOk();
  };

  handleCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };

  render() {
    const { title, isModalVisible } = this.props;
    return (
      <Modal
        className="modal"
        title={title || '删除'}
        visible={isModalVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <div className="flex_center">
            <Button onClick={this.handleCancel}>取消</Button>
            <Button type="primary" onClick={this.handleOk}>
              确认
            </Button>
          </div>,
        ]}
      >
        <DeleteOutlined style={{ color: 'red', fontSize: '24px' }} />
        <div>确定删除？</div>
      </Modal>
    );
  }
}

export default DeleteModal;
