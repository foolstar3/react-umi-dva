import React from 'react';
import { Tag, Switch, Collapse, Select, Form, Input, Modal } from 'antd';
import { connect } from 'umi';
import TreeNode from './treeNode';
import { FormInstance } from '@ant-design/pro-form';
const { Panel } = Collapse;
const { Option } = Select;
class EditModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.editSubmit = this.editSubmit.bind(this);
    this.editCancel = this.editCancel.bind(this);
    this.handleEditValueChange = this.handleEditValueChange.bind(this);
    this.handleProjectChange = this.handleProjectChange.bind(this);
    this.caseNumber = this.caseNumber.bind(this);
    this.getProjectList = this.getProjectList.bind(this);
    this.getEnvList = this.getEnvList.bind(this);
    this.getModuleList = this.getModuleList.bind(this);
    this.getCaseList = this.getCaseList.bind(this);
    this.getTaskList = this.getTaskList.bind(this);
    this.getTreeNode = this.getTreeNode.bind(this);
    this.state = {
      tempEditValue: '',
      caseNumber: 0,
      moduleList: [],
      caseList: [],
      treeData: [],
      caseArray: [],
      projectList: [],
    };
  }
  formRef = React.createRef<FormInstance>();

  componentDidMount() {
    this.getProjectList();
    this.getEnvList();
    this.getCaseList({ payload: { page: 'None' } });
    this.getTaskList();
  }

  getProjectList() {
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 'None',
      },
      callback: (res) => {
        this.setState({
          projectList: res,
        });
      },
    });
  }
  getModuleList(payload: any) {
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res) => {
        this.getTreeNode(res);
      },
    });
  }
  getEnvList() {
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload: {
        page: 'None',
      },
    });
  }
  getCaseList(payload: any) {
    this.props.dispatch({
      type: 'testCase/getCaseList',
      payload,
      callback: (res) => {
        this.setState({
          caseList: res.results,
        });
      },
    });
  }
  getTaskList() {
    this.props.dispatch({
      type: 'taskList/getTaskList',
      payload: {
        page: 1,
      },
    });
  }

  getTreeNode(moduleListChange: any) {
    const caseList = this.props.testCase.caseList.results;
    const moduleList = moduleListChange;
    const treeData = [];
    moduleList &&
      moduleList.forEach((moduleItem) => {
        const children = [];
        caseList.forEach((caseItem) => {
          caseItem.module_name === moduleItem.module_name &&
            children.push({
              title: caseItem.name,
              key: caseItem.id,
            });
        });
        treeData.push({
          title: moduleItem.module_name,
          key: moduleItem.create_time,
          children: children,
        });
      });
    this.setState({
      treeData: treeData,
    });
  }
  //在模态框中点击提交按钮
  editSubmit() {
    const editTask = this.state.tempEditValue;
    if (editTask.enabled == undefined) {
      editTask.enabled = true;
    }
    const projectList = this.props.projectList.projectList;
    const envList = this.props.envList.envList;
    for (let i = 0; i < projectList.length; i++) {
      if (
        editTask.project &&
        projectList[i].project_name === editTask.project
      ) {
        editTask.project = projectList[i].id;
      }
    }
    for (let i = 0; i < envList.length; i++) {
      if (editTask.env && envList[i].env_name === editTask.env) {
        editTask.env = envList[i].id;
      }
    }

    //数据处理逻辑与转换
    const requestData = {
      name: editTask.name,
      args: `[{\"case_list\":{\"case\":\[${this.state.caseArray}]\,\"env\":${editTask.env},\"report_name\":\"aaa\",\"description\":\"aaaaa\",\"receivers\":[\"\"]}]`,
      description: editTask.description,
      enabled: editTask.enabled,
      email_list: ['111'],
      project: editTask.project,
      crontab: {
        minute: editTask.crontab.charAt(0),
        hour: editTask.crontab.charAt(1),
        day_of_week: editTask.crontab.charAt(2),
        day_of_month: editTask.crontab.charAt(3),
        month_of_year: editTask.crontab.charAt(4),
      },
    };
    this.props.dispatch({
      type: 'taskList/editSubmit',
      payload: {
        ...requestData,
        id: this.props.tempValue.id,
      },
      callback: () => {
        this.getTaskList();
      },
    });
    this.onReset();
    this.props.showEditModal(false);
  }

  //修改项目的返回键
  editCancel = () => {
    this.props.showEditModal(false);
    this.onReset();
  };

  handleEditValueChange(singleValueChange, ValueChange) {
    this.setState({
      tempEditValue: ValueChange,
    });
  }

  //模块数据
  handleProjectChange(project: any) {
    const projectList = this.state.projectList;
    //筛选外层数据，放入treedate外层
    for (let i = 0; i < projectList.length; i++) {
      if (project && projectList[i].project_name === project) {
        const payload = { page: 'None', project: projectList[i].id };
        this.getModuleList(payload);
      }
    }
  }

  //选择用例个数传参
  caseNumber(caseArray: any, checkedNumber: any) {
    this.setState({
      caseNumber: checkedNumber,
      caseArray: caseArray,
    });
  }
  onReset() {
    this.formRef.current!.resetFields();
  }

  render() {
    const { editVisible, tempValue } = this.props;
    const envList = this.props?.envList?.envList || [];
    const projectList = this.props?.projectList?.projectList || [];
    const treeData = [...this.state.treeData];
    const caseNumber = this.state.caseNumber;

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
      <div>
        {editVisible && (
          <Modal
            visible={editVisible}
            title="修改任务信息"
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
              initialValues={{ remember: true }}
              onValuesChange={this.handleEditValueChange}
              ref={this.formRef}
            >
              <Form.Item
                label="任务名称"
                name="name"
                rules={[{ required: true, message: '请输入任务名称' }]}
                initialValue={tempValue.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="简要描述"
                name="description"
                initialValue={tempValue.description}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="状态"
                name="enabled"
                rules={[{ required: true }]}
              >
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={tempValue.enabled}
                  // onChange={(checked) => {
                  //   this.onSwitchChange(checked, text, record);
                  // }}
                />
              </Form.Item>
              <Form.Item
                label="定时计划"
                name="crontab"
                rules={[{ required: true }]}
                initialValue={tempValue.crontab_time}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="运行环境"
                name="env"
                rules={[{ required: true, message: '请选择运行环境' }]}
                initialValue={tempValue.env}
              >
                {
                  <Select
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    style={{ width: 314 }}
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
                initialValue={tempValue.task_extend.project}
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
                    onSelect={this.handleProjectChange}
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
                label={`已选${caseNumber}用例`}
                name="cassNumber"
                rules={[{ required: false }]}
              >
                <TreeNode
                  treeData={[...treeData]}
                  caseNumber={this.caseNumber}
                />
              </Form.Item>
              {/* <Form.Item
                label="邮件列表"
                name="emailList"
                rules={[{ required: false }]}
              >
                <Select
                  mode="multiple"
                  showArrow
                  tagRender={tagRender}
                  defaultValue={['gold', 'cyan']}
                  style={{ width: '100%' }}
                  options={options}
                />
              </Form.Item> */}
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(
  ({ taskList, envList, projectList, testCase, moduleList }) => ({
    taskList,
    envList,
    projectList,
    testCase,
    moduleList,
  }),
)(EditModal);
