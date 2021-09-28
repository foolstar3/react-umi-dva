import React from 'react';
import { message, Select, Form, Input, Modal, FormInstance } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { connect } from 'umi';

class AddModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tempAddValue: '',
      testUserList: [],
      projectList: '',
    };
  }
  formRef = React.createRef<FormInstance>();

  componentDidMount() {
    this.props.dispatch({
      type: 'userList/getUserList',
      callback: (res) => {
        this.setState({
          testUserList: res,
        });
      },
    });
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 'None',
      },
      callback: (res, rescount) => {
        this.setState({
          projectList: res,
        });
      },
    });
  }

  handleSubmit = () => {
    const addModule = this.state.tempAddValue;
    this.props.dispatch({
      type: 'moduleList/addModuleList',
      payload: {
        ...addModule,
      },
      callback: (res) => {
        this.props.handleTotalNumber();
        this.props.childrenPageChange();
        message.success(res.message);
      },
    });
    this.props.showAddModal(false);
    this.onReset();
  };

  handleAddValueChange = (singleValueChange, ValueChange) => {
    const { projectList, testUserList } = this.state;
    for (let i = 0; i < testUserList.length; i++) {
      if (
        ValueChange.test_user &&
        testUserList[i].username === ValueChange.test_user
      ) {
        ValueChange.test_user = testUserList[i].id;
      }
    }
    for (let i = 0; i < projectList.length; i++) {
      if (
        ValueChange.project &&
        projectList[i].project_name === ValueChange.project
      ) {
        ValueChange.project = projectList[i].id;
      }
    }
    ValueChange.id = this.setState({
      tempAddValue: ValueChange,
    });
  };

  handleCancel = () => {
    this.onReset();
    this.props.showAddModal(false);
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  render() {
    const addVisible = this.props?.addVisible;
    const { projectList, testUserList } = this.state;
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
          name="basic_moduleList"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onValuesChange={this.handleAddValueChange}
          ref={this.formRef}
        >
          <Form.Item
            label="模块名称"
            name="module_name"
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            <Input />
          </Form.Item>
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
            label="测试人员"
            name="test_user"
            rules={[{ required: true, message: '请输入测试人员名称' }]}
          >
            {
              <Select
                style={{ width: 314 }}
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {testUserList &&
                  Array.isArray(testUserList) &&
                  testUserList.length &&
                  testUserList.map((item) => {
                    return (
                      <Option value={item.username}>{item.username}</Option>
                    );
                  })}
              </Select>
            }
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

export default connect(({ moduleList, projectList, userList }) => ({
  moduleList,
  projectList,
  userList,
}))(AddModal);
