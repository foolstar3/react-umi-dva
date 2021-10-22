import React from 'react';
import {
  message,
  InputNumber,
  Switch,
  Select,
  Form,
  Input,
  Modal,
  Tooltip,
} from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { connect } from 'umi';
import TreeNode_Add from './treeNode_add';
import './index.less';
const { Option } = Select;
class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultEnv: '',
      envList: [],
      tempAddValue: '',
      caseNumber: 0,
      moduleList: [],
      caseList: [],
      treeData_moduleList: [],
      caseArray: [],
      checked: false,
      Minutes: 0,
      Hours: 0,
      Day_of_month: 0,
      Month: 0,
      Day_of_week: 0,
      checked_projectListId: 0,
    };
  }

  formRef = React.createRef();
  getEnvList = (payload) => {
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload,
      callback: (res) => {
        this.setState({
          envList: res,
          defaultEnv: res[0],
        });
      },
    });
  };
  getModuleList = (payload) => {
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res) => {
        this.getTreeNode(res);
      },
    });
  };
  getCaseList = (payload) => {
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

  getTreeNode = (moduleListChange) => {
    const moduleList = moduleListChange;
    const treeData_moduleList = [];
    moduleList &&
      moduleList.forEach((moduleItem) => {
        treeData_moduleList.push({
          title: moduleItem.module_name,
          key: moduleItem.id,
          isLeaf: false,
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
    const { checked, Minutes, Hours, Day_of_week, Day_of_month, Month } =
      this.state;
    if (
      checked &&
      !Minutes &&
      !Hours &&
      !Day_of_week &&
      !Day_of_month &&
      !Month
    ) {
      return message.info('请输入定时状态');
    }
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
    if (addTask.name && addTask.env && addTask.project) {
      if (this.state.caseNumber !== 0) {
        this.props.dispatch({
          type: 'taskList/addTaskList',
          payload: {
            ...requestData,
          },
          callback: (res) => {
            this.props.childrenPageChange();
            message.success(res.message);
          },
        });
        this.props.showAddModal(false);
        this.setState({
          treeData_moduleList: [],
          Minutes: 0,
          Hours: 0,
          Day_of_month: 0,
          Month: 0,
          Day_of_week: 0,
          envList: [],
        });
        this.setState({
          caseNumber: 0,
          treeData: [],
          checked: false,
        });
        this.onReset();
      } else {
        message.warn('请选择至少一个用例');
      }
    } else {
      message.warn('请输入必填字段！');
    }
  };

  handleAddValueChange = (singleValueChange, ValueChange) => {
    this.setState({
      tempAddValue: ValueChange,
    });
  };

  handleProjectChange = (project) => {
    this.formRef.current.resetFields(['env']);
    const projectList = this.props.projectList.projectList;
    for (let i = 0; i < projectList.length; i++) {
      if (project && projectList[i].project_name === project) {
        const payload = { page: 'None', project: projectList[i].id };
        this.setState({
          checked_projectListId: projectList[i].id,
        });
        this.getModuleList(payload);
        this.getEnvList({
          page: 'None',
          project: projectList[i].id,
          is_valid: true,
        });
      }
    }
  };

  handleCancel = () => {
    this.props.showAddModal(false);
    this.onReset();
    this.setState({
      caseNumber: 0,
      treeData_moduleList: [],
      checked: false,
      envList: [],
    });
  };

  caseNumber = (caseArray, checkedNumber) => {
    this.setState({
      caseNumber: checkedNumber,
      caseArray: caseArray,
    });
  };

  onReset = () => {
    this.formRef.current == null
      ? this.formRef.current.resetFields()
      : this.formRef.current.resetFields();
  };
  onSwitchChange = (checked) => {
    this.setState({
      checked: checked,
    });
  };
  handlecrontab_M = (number) => {
    this.setState({
      Minutes: number.target.value ? number.target.value : 0,
    });
  };
  handlecrontab_H = (number) => {
    this.setState({
      Hours: number.target.value ? number.target.value : 0,
    });
  };
  handlecrontab_DM = (number) => {
    this.setState({
      Day_of_month: number.target.value ? number.target.value : 0,
    });
  };
  handlecrontab_Mon = (number) => {
    this.setState({
      Month: number.target.value ? number.target.value : 0,
    });
  };
  handlecrontab_DW = (number) => {
    this.setState({
      Day_of_week: number.target.value ? number.target.value : 0,
    });
  };

  render() {
    const { caseNumber, checked, envList, defaultEnv } = this.state;
    const addVisible = this.props.addVisible;
    const projectList = this.props?.projectList?.projectList || [];
    const treeData_moduleList = [...this.state.treeData_moduleList];
    const text = (
      <div>
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>minute:</span> 0-59,
          minute='*/15' (for every quarter) or minute='1,13,30-45,50-59/2'
        </div>
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>hour:</span> 0-23, hour='*/3'
          (for every three hours) or hour='0,8-17/2'
        </div>
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>day_of_month:</span> 1-31{' '}
        </div>
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>month_of_year:</span> 1-12
        </div>
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>day_of_week:</span> 0-6, Sunday =
          0 and Saturday = 6
        </div>
      </div>
    );

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
        width={1200}
      >
        <Form
          name="basic_taskList"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 25 }}
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
          <Form.Item label="定时状态" name="enabled" valuePropName="checked">
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
              label="定时状态"
              name="basic_taskList_crontab"
              rules={[{ required: true, message: '请输入完整的定时计划' }]}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip
                  title={text}
                  overlayStyle={{ maxWidth: 600 }}
                  placement="topLeft"
                >
                  {<QuestionCircleTwoTone />}
                  &nbsp;&nbsp;&nbsp;
                </Tooltip>
                <Input
                  style={{ width: 205 }}
                  addonAfter="m"
                  onChange={(e) => {
                    this.handlecrontab_M(e);
                  }}
                />
                <Input
                  style={{ width: 205 }}
                  addonAfter="h"
                  onChange={(e) => {
                    this.handlecrontab_H(e);
                  }}
                />
                <Input
                  style={{ width: 205 }}
                  addonAfter="dM"
                  onChange={(e) => {
                    this.handlecrontab_DM(e);
                  }}
                />
                <Input
                  style={{ width: 205 }}
                  addonAfter="MY"
                  onChange={(e) => {
                    this.handlecrontab_Mon(e);
                  }}
                />
                <Input
                  style={{ width: 205 }}
                  addonAfter="d"
                  onChange={(e) => {
                    this.handlecrontab_DW(e);
                  }}
                />
              </div>
            </Form.Item>
          )}
          <Form.Item
            label="项目名称"
            name="project"
            rules={[{ required: true, message: '请选择项目' }]}
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
              >
                {envList &&
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

          <Form.Item label="邮件列表" name="emailList">
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
