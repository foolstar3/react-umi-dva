import React from 'react';
import { message, Form, FormInstance, Input, Modal } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class AddModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tempAddValue: '',
    };
  }

  formRef = React.createRef<FormInstance>();

  handleSubmit = () => {
    const addGlobalVar = this.state.tempAddValue;
    this.props.dispatch({
      type: 'globalVarList/addGlobalVarList',
      payload: {
        ...addGlobalVar,
      },
      callback: (res) => {
        if (res.message == '保存成功') {
          this.props.handleTotalNumber();
        } else {
          message.error('添加失败');
        }
        this.props.childrenPageChange();
      },
    });
    this.props.showAddModal(false);
    this.onReset();
  };

  handleAddValueChange = (singleValueChange, ValueChange) => {
    this.setState({
      tempAddValue: ValueChange,
    });
  };

  handleCancel = () => {
    this.props.showAddModal(false);
    this.onReset();
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  render() {
    const addVisible = this.props?.addVisible;
    return (
      <Modal
        visible={addVisible}
        title="全局信息"
        closable={true}
        maskClosable={false}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        okText="确认"
        okButtonProps={{ shape: 'round' }}
        cancelButtonProps={{ shape: 'round' }}
      >
        <Form
          name="basic_globalVarList"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onValuesChange={this.handleAddValueChange}
          ref={this.formRef}
        >
          <Form.Item
            label="参数名称"
            name="var_name"
            rules={[{ required: true, message: '请输入参数名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="参数值"
            name="var_value"
            rules={[{ required: true, message: '请输入测试数' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="简要描述"
            name="description"
            rules={[{ required: false }]}
          >
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default connect(({ globalVarList }) => ({
  globalVarList,
}))(AddModal);
