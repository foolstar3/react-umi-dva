import React from 'react';
import { message, Select, Form, Input, Modal } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { connect } from 'umi';
import Message from '@/pages/examples/message';

class EditModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tempEditValue: '',
    };
  }

  editSubmit = () => {
    const editModule = this.state.tempEditValue;
    const EditId = this.props.tempValue.id;
    this.props.dispatch({
      type: 'moduleList/editModuleList',
      payload: {
        ...editModule,
        id: EditId,
      },
      callback: (res) => {
        this.props.childrenPageChange();
        message.success(res.message);
      },
    });
    this.props.showEditModal(false);
  };

  editCancel = () => {
    this.props.showEditModal(false);
  };

  handleEditValueChange = (singleValueChange, ValueChange) => {
    // const { projectList, testUserList } = this.props;
    console.log('this.props', this.props);
    const projectList = this.props.projectList.projectList;
    const testUserList = this.props.userList.userList;
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
    this.setState({
      tempEditValue: ValueChange,
    });
  };

  render() {
    const { editVisible, tempValue } = this.props;
    const projectList = this.props.projectList.projectList;
    const testUserList = this.props.userList.userList;
    return (
      <div>
        {editVisible && (
          <Modal
            visible={editVisible}
            title="编辑"
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
                label="模块名称"
                name="module_name"
                rules={[{ required: true, message: '请输入模块名称' }]}
                initialValue={tempValue.module_name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="项目名称"
                name="project"
                rules={[{ required: true, message: '请输入项目名称' }]}
                initialValue={tempValue.project_name}
              >
                {
                  <Select
                    style={{ width: 314 }}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {projectList &&
                      Array.isArray(projectList) &&
                      projectList.length &&
                      projectList.map((item) => {
                        return (
                          <Option value={item.project_name}>
                            {item.project_name}
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
                initialValue={tempValue.test_user_name}
              >
                {
                  <Select
                    style={{ width: 314 }}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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

export default connect(({ moduleList, projectList, userList }) => ({
  moduleList,
  projectList,
  userList,
}))(EditModal);
