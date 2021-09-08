import React from 'react';
import { Tag, Collapse, Switch, Select, Form, Input, Modal } from 'antd';
import { connect } from 'umi';
import TreeNode from './treeNode';
const { Panel } = Collapse;
const { Option } = Select;
class AddModal extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    this.caseNumber = this.caseNumber.bind(this);
    this.state = {
      tempAddValue: '',
      caseNumber: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'testCase/getCaseList',
      payload: {
        page: 1,
      },
    });
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1,
      },
    });
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload: {
        page: 1,
      },
    });
  }

  //在模态框中点击提交按钮
  handleSubmit() {
    const addTask = this.state.tempAddValue;
    this.props.dispatch({
      type: 'taskList/addTaskList',
      payload: {
        ...addTask,
      },
      callback: () => {
        this.props.dispatch({
          type: 'taskList/getTaskListt',
          payload: {
            page: 1,
          },
        });
      },
    });
    this.props.showAddModal(false);
  }

  //添加任务中监听所有值的变化
  handleAddValueChange(singleValueChange, ValueChange) {
    this.setState({
      tempAddValue: ValueChange,
    });
  }

  //添加项目的返回键
  handleCancel = () => {
    this.props.showAddModal(false);
  };

  handleEnvListVisible() {}

  handleProjectListVisible() {}
  //选择用例个数传参
  caseNumber(checkedNumber: any) {
    this.setState({
      caseNumber: checkedNumber,
    });
  }

  render() {
    const caseNumber = this.state.caseNumber;
    const addVisible = this.props.addVisible;
    const envList = this.props?.envList?.envList?.results || [];
    const projectList = this.props?.projectList?.projectList || [];
    const caseList = this.props?.testCase?.caseList?.results || [];
    // const options = [{ value: 'blue' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]

    ///自定义列表参数
    function tagRender(props) {
      const { label, value, closable, onClose } = props;
      const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color="blue"
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginRight: 3 }}
        >
          {label}
        </Tag>
      );
    }

    return (
      <Modal
        visible={addVisible}
        title="新增任务"
        closable={true}
        maskClosable={false}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}
        okText="确认"
        okButtonProps={{ shape: 'round' }}
        cancelButtonProps={{ shape: 'round' }}
      >
        <Form
          name="basic_taskList"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onValuesChange={this.handleAddValueChange}
        >
          <Form.Item
            label="任务名称"
            name="name"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="简要描述" name="description">
            <Input />
          </Form.Item>
          <Form.Item
            label="状态"
            name="testcase_count"
            rules={[{ required: true, message: '请输入测试数' }]}
          >
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked={true}
              // onChange={(checked) => {
              //   this.onSwitchChange(checked, text, record);
              // }}
            />
          </Form.Item>
          <Form.Item
            label="运行环境"
            name="env"
            rules={[{ required: true, message: '请选择运行环境' }]}
          >
            {
              <Select
                style={{ width: 314 }}
                onFocus={this.handleEnvListVisible}
              >
                {envList &&
                  Array.isArray(envList) &&
                  envList.length &&
                  envList.map((item) => {
                    return (
                      <Option value={item.env_name}>{item.env_name}</Option>
                    );
                  })}
              </Select>
            }
          </Form.Item>
          <Form.Item
            label="项目名称"
            name="project"
            rules={[{ required: true, message: '请选择项目' }]}
          >
            {
              <Select
                style={{ width: 314 }}
                onFocus={this.handleProjectListVisible}
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
            label={`已选 ${caseNumber} 例`}
            name="cassNumber"
            rules={[{ required: false }]}
          >
            <TreeNode caseList={caseList} caseNumber={this.caseNumber} />
          </Form.Item>
          {/* <Form.Item
            label = '邮件列表'
            name = 'emailList'
            rules = {[ {required: false} ]}
          >
            <Select
              mode = "multiple"
              showArrow
              tagRender = { tagRender }
              defaultValue = {['gold', 'cyan']}
              style = {{ width: '100%' }}
              options = { options }
            />
          </Form.Item> */}
        </Form>
      </Modal>
    );
  }
}

export default connect(({ taskList, envList, projectList, testCase }) => ({
  taskList,
  envList,
  projectList,
  testCase,
}))(AddModal);
