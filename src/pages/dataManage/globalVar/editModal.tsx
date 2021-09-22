import React from 'react';
import { Card, Select, Form, Input, Modal, Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class EditModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tempEditValue: '',
    };
  }

  editSubmit = (value: any) => {
    const editGlobalVar = this.state.tempEditValue;
    const EditId = this.props.tempValue.id;
    this.props.dispatch({
      type: 'globalVarList/editGlobalVarList',
      payload: {
        ...editGlobalVar,
        id: EditId,
      },
      callback: () => {
        this.props.childrenPageChange();
      },
    });
    this.props.showEditModal(false);
  };

  editCancel = () => {
    this.props.showEditModal(false);
  };

  handleEditValueChange = (singleValueChange, ValueChange) => {
    this.setState({
      tempEditValue: ValueChange,
    });
  };

  render() {
    const { editVisible, tempValue } = this.props;
    return (
      <div>
        {editVisible && (
          <Modal
            visible={editVisible}
            title="修改全局信息"
            closable={true}
            maskClosable={false}
            onOk={this.editSubmit}
            onCancel={this.editCancel}
            okText="确认"
            okButtonProps={{ shape: 'round' }}
            cancelButtonProps={{ shape: 'round' }}
          >
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              onValuesChange={this.handleEditValueChange}
            >
              <Form.Item
                label="参数名称"
                name="var_name"
                rules={[{ required: true, message: '请输入参数名称' }]}
                initialValue={tempValue.var_name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="参数值"
                name="var_value"
                rules={[{ required: true, message: '请输入测试数' }]}
                initialValue={tempValue.var_value}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="简要描述"
                name="description"
                rules={[{ required: false }]}
                initialValue={tempValue.description}
              >
                <TextArea rows={3} />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(({ globalVarList }) => ({
  globalVarList,
}))(EditModal);
