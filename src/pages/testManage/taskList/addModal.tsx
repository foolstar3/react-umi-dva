import React from 'react';
import {
  Tag,
  Collapse,
  Switch,
  Select,
  Form,
  Input,
  Modal,
  FormInstance,
  Row,
} from 'antd';
import { connect } from 'umi';
import TreeNode from './treeNode';
import './index.less';
const { Option } = Select;
class AddModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tempAddValue: '',
      caseNumber: 0,
      moduleList: [],
      caseList: [],
      treeData: [],
      caseArray: [],
      projectList: [],
    };
  }

  formRef = React.createRef<FormInstance>();

  UNSAFE_componentWillMount() {
    this.getProjectList();
    this.getEnvList();
    this.getCaseList({ page: 'None' });
  }

  getProjectList = () => {
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
  };

  getModuleList = (payload: any) => {
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res, rescount) => {
        this.getTreeNode(res);
      },
    });
  };
  getEnvList = () => {
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload: {
        page: 'None',
      },
    });
  };
  getCaseList = (payload: any) => {
    this.props.dispatch({
      type: 'testCase/getCaseList',
      payload,
      callback: (res) => {
        this.setState({
          caseList: res,
        });
      },
    });
  };

  getTreeNode = (moduleListChange: any) => {
    console.log('moduleListChange', moduleListChange);
    const caseList = this.props.testCase.caseList;
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
  };

  handleSubmit = () => {
    const addTask = this.state.tempAddValue;
    const projectList = this.props.projectList.projectList;
    const envList = this.props.envList.envList;
    for (let i = 0; i < projectList.length; i++) {
      if (addTask.project && projectList[i].project_name === addTask.project) {
        addTask.project = projectList[i].id;
      }
    }
    for (let i = 0; i < envList.length; i++) {
      if (addTask.env && envList[i].env_name === addTask.env) {
        addTask.env = envList[i].id;
      }
    }

    const requestData = {
      name: addTask.name,
      args: `[{\"case_list\":{\"case\":\[${this.state.caseArray}]\,\"env\":${addTask.env},\"report_name\":\"aaa\",\"description\":\"aaaaa\",\"receivers\":[\"\"]}]`,
      description: addTask.description,
      enabled: addTask.enabled == false ? false : true,
      email_list: ['111'],
      project: addTask.project,
      crontab: {
        minute: addTask?.crontab?.charAt(0) || '',
        hour: addTask?.crontab?.charAt(1) || '',
        day_of_week: addTask?.crontab?.charAt(2) || '',
        day_of_month: addTask?.crontab?.charAt(3) || '',
        month_of_year: addTask?.crontab?.charAt(4) || '',
      },
    };

    addTask.name &&
      addTask.env &&
      addTask.project &&
      this.props.dispatch({
        type: 'taskList/addTaskList',
        payload: {
          ...requestData,
        },
        callback: () => {
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

  handleProjectChange = (project: any) => {
    const projectList = this.state.projectList;
    for (let i = 0; i < projectList.length; i++) {
      if (project && projectList[i].project_name === project) {
        const payload = { page: 'None', project: projectList[i].id };
        this.getModuleList(payload);
      }
    }
  };

  handleCancel = () => {
    this.props.showAddModal(false);
    this.onReset();
  };

  caseNumber = (caseArray: any, checkedNumber: any) => {
    this.setState({
      caseNumber: checkedNumber,
      caseArray: caseArray,
    });
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  render() {
    const caseNumber = this.state.caseNumber;
    const addVisible = this.props.addVisible;
    const envList = this.props?.envList?.envList || [];
    const projectList = this.props?.projectList?.projectList || [];
    const treeData = [...this.state.treeData];

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
          initialValues={{ remember: false }}
          onValuesChange={this.handleAddValueChange}
          ref={this.formRef}
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
          <Form.Item label="状态" name="enabled" valuePropName="checked">
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked
            />
          </Form.Item>
          <Form.Item
            label="定时计划"
            name="crontab"
            rules={[{ required: true }]}
            id="basic_taskList_crontab"
          >
            <Input addonAfter="计划 (m/h/d/dM/MY)" />
          </Form.Item>
          <Form.Item
            label="运行环境"
            name="env"
            rules={[{ required: true, message: '请选择运行环境' }]}
          >
            {
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ width: 314 }}
              >
                {envList &&
                  Array.isArray(envList) &&
                  envList.length &&
                  envList.map((item) => {
                    return (
                      <Option value={item.env_name} key={item.id}>
                        {item.env_name}
                      </Option>
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
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={this.handleProjectChange}
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
            <TreeNode treeData={[...treeData]} caseNumber={this.caseNumber} />
          </Form.Item>
          {/* TO DO
          <Form.Item
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

export default connect(
  ({ taskList, envList, projectList, testCase, moduleList }) => ({
    taskList,
    envList,
    projectList,
    testCase,
    moduleList,
  }),
)(AddModal);
