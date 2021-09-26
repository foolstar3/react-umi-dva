import React from 'react';
import {
  InputNumber,
  Switch,
  Select,
  Form,
  Input,
  Modal,
  FormInstance,
} from 'antd';
import { connect } from 'umi';
import TreeNode_Add from './treeNode_add';
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
      treeData_moduleList: [],
      caseArray: [],
      checked: false,
      Minutes: 1,
      Hours: 1,
      Day_of_month: 1,
      Month: 1,
      Day_of_week: 1,
      checked_projectListId: 0,
    };
  }

  formRef = React.createRef<FormInstance>();

  UNSAFE_componentWillMount() {
    this.getEnvList();
    this.getCaseList({ page: 'None' });
  }
  getEnvList = () => {
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload: {
        page: 'None',
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
    const moduleList = moduleListChange;
    const treeData_moduleList = [];
    moduleList &&
      moduleList.forEach((moduleItem) => {
        treeData_moduleList.push({
          title: moduleItem.module_name,
          key: moduleItem.id,
        });
      });
    this.setState({
      treeData_moduleList: treeData_moduleList,
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
    const args = [
      {
        case_list: {
          case: this.state.caseArray,
        },
        env: addTask.env,
        report_name: addTask.name,
        description: this.state.tempAddValue.description,
        receivers: [''],
      },
    ];
    const json_args = JSON.stringify(args);
    const requestData = {
      name: addTask.name,
      args: json_args,
      description: addTask.description,
      enabled: this.state.checked,
      email_list: addTask.emailList || [],
      project: addTask.project,
      crontab: {
        minute: this.state.Minutes,
        hour: this.state.Hours,
        day_of_week: this.state.Day_of_week,
        day_of_month: this.state.Day_of_month,
        month_of_year: this.state.Month,
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
    this.setState({
      caseNumber: 0,
      treeData: [],
      checked: false,
    });
    this.onReset();
  };

  handleAddValueChange = (singleValueChange, ValueChange) => {
    console.log('ValueChange', ValueChange);
    this.setState({
      tempAddValue: ValueChange,
    });
  };

  handleProjectChange = (project: any) => {
    const projectList = this.props.projectList.projectList;
    for (let i = 0; i < projectList.length; i++) {
      if (project && projectList[i].project_name === project) {
        const payload = { page: 'None', project: projectList[i].id };
        this.setState({
          checked_projectListId: projectList[i].id,
        });
        this.getModuleList(payload);
      }
    }
  };

  handleCancel = () => {
    this.props.showAddModal(false);
    this.onReset();
    this.setState({
      caseNumber: 0,
      treeData: [],
      checked: false,
    });
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
  onSwitchChange = (checked) => {
    this.setState({
      checked: checked,
    });
  };
  handlecrontab_M = (number: any) => {
    this.setState({
      Minutes: number,
    });
  };
  handlecrontab_H = (number: any) => {
    this.setState({
      Hours: number,
    });
  };
  handlecrontab_DM = (number: any) => {
    this.setState({
      Day_of_month: number,
    });
  };
  handlecrontab_Mon = (number: any) => {
    this.setState({
      Month: number,
    });
  };
  handlecrontab_DW = (number: any) => {
    this.setState({
      Day_of_week: number,
    });
  };

  render() {
    const { caseNumber, checked } = this.state;
    const addVisible = this.props.addVisible;
    const envList = this.props?.envList?.envList || [];
    const projectList = this.props?.projectList?.projectList || [];
    const treeData_moduleList = [...this.state.treeData_moduleList];
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
              defaultChecked={false}
              onChange={(checked) => {
                this.onSwitchChange(checked);
              }}
            />
          </Form.Item>
          {checked && (
            <Form.Item
              label="定时计划"
              name="crontab"
              rules={[{ required: true }]}
              id="basic_taskList_crontab"
            >
              <InputNumber
                min={0}
                max={59}
                defaultValue={1}
                bordered
                onChange={(num) => this.handlecrontab_M(num)}
                style={{ width: '100px' }}
                formatter={(value) => `${value} M`}
                parser={(value) => value?.replace(' M', '')}
              />
              <InputNumber
                min={0}
                max={23}
                defaultValue={1}
                bordered
                onChange={(num) => this.handlecrontab_H(num)}
                style={{ width: '100px' }}
                formatter={(value) => `${value} H`}
                parser={(value) => value?.replace(' H', '')}
              />
              <InputNumber
                min={1}
                max={31}
                defaultValue={1}
                bordered
                onChange={(num) => this.handlecrontab_DM(num)}
                style={{ width: '100px' }}
                formatter={(value) => `${value} dM`}
                parser={(value) => value?.replace(' dM', '')}
              />
              <InputNumber
                min={1}
                max={12}
                defaultValue={1}
                bordered
                onChange={(num) => this.handlecrontab_Mon(num)}
                style={{ width: '100px' }}
                formatter={(value) => `${value} MY`}
                parser={(value) => value?.replace(' MY', '')}
              />
              <InputNumber
                min={0}
                max={6}
                defaultValue={1}
                bordered
                onChange={(num) => this.handlecrontab_DW(num)}
                style={{ width: '100px' }}
                formatter={(value) => `${value} d`}
                parser={(value) => value?.replace(' d', '')}
              />
              {/* <Popover content={content}>
                {<QuestionCircleOutlined style={{color:'orange'}}/>}
              </Popover> */}
            </Form.Item>
          )}
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
                      <Option value={item.project_name} key={item.project_name}>
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
            <TreeNode_Add
              treeData_moduleList={[...treeData_moduleList]}
              caseNumber={this.caseNumber}
              checked_projectListId={this.state.checked_projectListId}
            />
          </Form.Item>

          <Form.Item
            label="邮件列表"
            name="emailList"
            rules={[{ required: true }]}
          >
            <Select
              mode="tags"
              placeholder="请输入邮箱"
              style={{ width: '100%' }}
            />
          </Form.Item>
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
