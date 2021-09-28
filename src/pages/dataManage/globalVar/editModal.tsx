import React from 'react';
import {
  message,
  Card,
  Select,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Space,
} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
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
    this.setState({
      tempEditValue: ValueChange,
    });
  };

  render() {
    const { editVisible, tempValue } = this.props;
    const projectList = this.props?.projectList?.projectList;
    console.log('projectList', projectList);
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
                label="项目名称"
                name="project"
                rules={[{ required: true, message: '请输入项目名称' }]}
                initialValue={tempValue.project_name}
              >
                {
                  <Select
                    style={{ width: 314 }}
                    placeholder="请选择"
                    allowClear
                    showSearch
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
                          <Option value={item.id}>{item.project_name}</Option>
                        );
                      })}
                  </Select>
                }
              </Form.Item>
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

export default connect(({ globalVarList, projectList }) => ({
  globalVarList,
  projectList,
}))(EditModal);
