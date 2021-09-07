import React from 'react';
import { Card, Select, Form, Input, Modal, Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class EditModal extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.editSubmit = this.editSubmit.bind(this);
    this.editCancel = this.editCancel.bind(this);
    this.handleEditValueChange = this.handleEditValueChange.bind(this);
    this.state = {
      tempEditValue: '',
    };
  }

  //在模态框中点击提交按钮
  editSubmit(value: any) {
    const editGlobalVar = this.state.tempEditValue;
    const EditId = this.props.tempValue.id;
    this.props.dispatch({
      type: 'moduleList/addModuleList',
      payload: {
        ...editGlobalVar,
        id: EditId,
      },
      callback: () => {
        this.props.dispatch({
          type: 'globalVarList/getGlobalVarList',
          payload: {
            page: 1,
          },
        });
      },
    });
    this.props.showEditModal(false);
  }

  //修改项目的返回键
  editCancel = () => {
    this.props.showEditModal(false);
  };

  handleEditValueChange(singleValueChange, ValueChange) {
    this.setState({
      tempEditValue: ValueChange,
    });
  }

  render() {
    const { editVisible, tempValue } = this.props;
    return (
      <div>
        {editVisible && (
          <Modal
            visible={editVisible}
            title="修改模块信息"
            closable={true}
            maskClosable={false}
            onOk={this.editSubmit}
            onCancel={this.editCancel}
            okText="修改"
            okButtonProps={{ shape: 'round' }}
            cancelButtonProps={{ shape: 'round', type: 'text' }}
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
