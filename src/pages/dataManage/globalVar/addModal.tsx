import React from 'react';
import { message, Form, FormInstance, Input, Modal } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class AddModal extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.state = {
      tempAddValue: '',
    };
  }

  //获取表单域
  formRef = React.createRef<FormInstance>();

  //在模态框中点击提交按钮
  handleSubmit() {
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
        this.props.dispatch({
          type: 'globalVarList/getGlobalVarList',
          payload: {
            page: 1,
          },
        });
      },
    });
    this.props.showAddModal(false);
  }

  //添加模块中监听所有值的变化
  handleAddValueChange(singleValueChange, ValueChange) {
    this.setState({
      tempAddValue: ValueChange,
    });
  }
  //添加项目的返回键
  handleCancel = () => {
    this.props.showAddModal(false);
    this.onReset();
  };
  //重置
  onReset() {
    this.formRef.current!.resetFields();
  }

  render() {
    const addVisible = this.props.addVisible;
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
