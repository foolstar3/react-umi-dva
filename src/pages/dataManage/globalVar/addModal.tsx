import React from 'react';
import { message, Form, FormInstance, Input, Modal, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
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
        this.props.handleTotalNumber();
        message.success(res.message);
        this.props.childrenPageChange();
      },
    });
    this.props.showAddModal(false);
    this.onReset();
  };

  handleAddValueChange = (singleValueChange, ValueChange) => {
    console.log('ValueChange', ValueChange);
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
    const projectList = this.props?.projectList?.projectList;
    return (
      <Modal
        visible={addVisible}
        title="新增"
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
            label="项目名称"
            name="project"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            {
              <Select
                style={{ width: 314 }}
                placeholder="请选择"
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {projectList &&
                  Array.isArray(projectList) &&
                  projectList.length &&
                  projectList.map((item) => {
                    return <Option value={item.id}>{item.project_name}</Option>;
                  })}
              </Select>
            }
          </Form.Item>
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

export default connect(({ globalVarList, projectList }) => ({
  globalVarList,
  projectList,
}))(AddModal);
