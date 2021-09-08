import React from 'react';
import { Select, Form, Input, Modal, Table, Button, Space } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { connect } from 'umi';

class AddModal extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    this.state = {
      tempAddValue: '',
      testUserList: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'projectList/getUserList',
      callback: (res) => {
        this.setState({
          testUserList: res,
        });
      },
    });
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1,
      },
      callback: (res) => {
        this.setState({
          projectList: res.results,
        });
      },
    });
  }

  //在模态框中点击提交按钮
  handleSubmit() {
    const addModule = this.state.tempAddValue;
    this.props.dispatch({
      type: 'moduleList/addModuleList',
      payload: {
        ...addModule,
      },
      callback: (res) => {
        if (res.id !== undefined) {
          this.props.handleTotalNumber();
        }
        this.props.dispatch({
          type: 'moduleList/getModuleList',
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
        projectList[i].project_name == ValueChange.project
      ) {
        ValueChange.project = projectList[i].project;
      }
    }
    console.log('ValueChange', ValueChange);
    this.setState({
      tempAddValue: ValueChange,
    });
  }

  //添加项目的返回键
  handleCancel = () => {
    this.props.showAddModal(false);
  };

  render() {
    const addVisible = this.props.addVisible;
    const { projectList, testUserList } = this.state;
    console.log('projectList', projectList);
    return (
      <Modal
        visible={addVisible}
        title="模块信息"
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
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            {
              <Select style={{ width: 314 }}>
                {projectList &&
                  Array.isArray(projectList) &&
                  projectList.length &&
                  projectList.map((item) => {
                    return (
                      <Option value={item.project_name}>
                        {' '}
                        {item.project_name}{' '}
                      </Option>
                    );
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
              <Select style={{ width: 314 }}>
                {testUserList &&
                  Array.isArray(testUserList) &&
                  testUserList.length &&
                  testUserList.map((item) => {
                    return (
                      <Option value={item.username}> {item.username} </Option>
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

export default connect(({ moduleList, projectList }) => ({
  moduleList,
}))(AddModal);
