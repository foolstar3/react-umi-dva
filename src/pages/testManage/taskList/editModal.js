import React from 'react';
import {
  message,
  Switch,
  Collapse,
  Select,
  Form,
  Input,
  Modal,
  Tooltip,
} from 'antd';
import { connect } from 'umi';
import TreeNode_Edit from './treeNode_edit';
import { QuestionCircleTwoTone } from '@ant-design/icons';
const { Option } = Select;
class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempEditValue: 0,
      caseNumber: 0,
      moduleList: [],
      treeData: [],
      caseArray: [],
      currentPage: 1,
      checked: true,
      Minutes: 1,
      Hours: 1,
      Day_of_month: 1,
      Month: 1,
      Day_of_week: 1,
      checked_projectListId: 0,
      chosensCase: 0,
    };
  }
  UNSAFE_componentWillMount() {
    this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        caseNumber: nextProps.caseNumber,
        caseArray: nextProps.caseArray,
        checked: nextProps.tempValue.enabled,
      });
    }
  }
  formRef = React.createRef();

  getModuleList = (payload) => {
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res, rescount) => {
        this.getTreeNode(res);
      },
    });
  };

  getTreeNode = (moduleListChange) => {
    const moduleList = moduleListChange;
    const treeData = [];
    moduleList &&
      moduleList.forEach((moduleItem) => {
        const children = [];
        this.props.dispatch({
          type: 'testCase/getCaseList',
          payload: {
            page: 'None',
            project: moduleItem.project,
            module: moduleItem.id,
          },
          callback: (caseList) => {
            caseList &&
              caseList.forEach((caseItem) => {
                caseItem.module_name === moduleItem.module_name &&
                  children.push({
                    title: caseItem.name,
                    key: caseItem.id,
                  });
              });
            treeData.push({
              title: moduleItem.module_name,
              key: moduleItem.module_name,
              children: children,
            });
            this.setState(
              {
                treeData: treeData,
              },
              () => {
                this.setState({
                  chosensCase: this.chosenCaseNumber(),
                });
              },
            );
          },
        });
      });
  };

  editSubmit = () => {
    const tempEditValue = this.state.tempEditValue;
    if (tempEditValue != 0) {
      const editTaskValue = JSON.stringify(tempEditValue);
      const editTask = JSON.parse(editTaskValue);
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
      const args = [
        {
          case_list: {
            case: this.state.caseArray,
          },
          env: editTask.env,
          report_name: editTask.name,
          description: this.state.tempEditValue.description,
          receivers: [''],
        },
      ];
      const json_args = JSON.stringify(args);
      const requestData = {
        name: editTask?.name,
        args: json_args,
        description: editTask?.description,
        enabled: editTask?.enabled,
        email_list: editTask?.emailList || [],
        project: editTask?.project,
        crontab: {
          minute: this.state.Minutes == null ? 1 : this.state.Minutes,
          hour: this.state.Hours == null ? 1 : this.state.Hours,
          day_of_week:
            this.state.Day_of_week == null ? 1 : this.state.Day_of_week,
          day_of_month:
            this.state.Day_of_month == null ? 1 : this.state.Day_of_month,
          month_of_year: this.state.Month == null ? 1 : this.state.Month,
        },
      };
      if (editTask.name && editTask.env && editTask.project) {
        if (this.state.caseNumber !== 0) {
          this.props.dispatch({
            type: 'taskList/editSubmit',
            payload: {
              ...requestData,
              id: this.props.tempValue.id,
            },
            callback: (res) => {
              this.props.childrenPageChange();
              message.success(res.message);
            },
          });
          this.props.showEditModal(false);
        } else {
          message.warn('请选择至少一个用例');
        }
      } else {
        message.warn('请输入必填字段！');
      }
    } else {
      const tempValue = this.props.tempValue;
      const projectList = this.props.projectList.projectList;
      for (let i = 0; i < projectList.length; i++) {
        if (
          tempValue.task_extend.project &&
          projectList[i].project_name === tempValue.task_extend.project
        ) {
          tempValue.task_extend.project = projectList[i].id;
        }
      }
      const env = JSON.parse(tempValue.args);
      const args = [
        {
          case_list: {
            case: this.state.caseArray,
          },
          env: env[0].env,
          report_name: tempValue.name,
          description: tempValue.description,
          receivers: [''],
        },
      ];
      const json_args = JSON.stringify(args);
      const requestData = {
        name: tempValue?.name,
        args: json_args,
        description: tempValue?.description,
        enabled: tempValue?.enabled,
        email_list: tempValue?.task_extend?.email_List || [],
        project: tempValue?.task_extend?.project,
        crontab: {
          minute: this.state.Minutes == null ? 1 : this.state.Minutes,
          hour: this.state.Hours == null ? 1 : this.state.Hours,
          day_of_week:
            this.state.Day_of_week == null ? 1 : this.state.Day_of_week,
          day_of_month:
            this.state.Day_of_month == null ? 1 : this.state.Day_of_month,
          month_of_year: this.state.Month == null ? 1 : this.state.Month,
        },
      };
      if (this.state.caseNumber !== 0) {
        this.props.dispatch({
          type: 'taskList/editSubmit',
          payload: {
            ...requestData,
            id: this.props.tempValue.id,
          },
          callback: (res) => {
            this.props.childrenPageChange();
            message.success(res.message);
          },
        });
        this.props.showEditModal(false);
      } else {
        message.warn('请选择至少一个用例');
      }
    }
  };

  editCancel = () => {
    this.props.showEditModal(false);
  };

  handleEditValueChange = (singleValueChange, ValueChange) => {
    this.setState({
      tempEditValue: ValueChange,
    });
  };

  handleProjectChange = (project) => {
    const projectList = this.props.projectList.projectList;
    for (let i = 0; i < projectList.length; i++) {
      if (projectList && projectList[i].project_name === project) {
        const payload = { page: 'None', project: projectList[i].id };
        this.setState({
          checked_projectListId: projectList[i].id,
        });
        this.getModuleList(payload);
      }
    }
    this.setState({
      caseNumber: 0,
    });
  };

  caseNumber = (caseArray, checkedNumber) => {
    this.setState({
      caseNumber: checkedNumber,
      caseArray: caseArray,
      chosensCase: checkedNumber,
    });
  };

  onEditSwitchChange = (checked, record) => {
    this.setState({
      checked: checked,
    });
  };

  handlecrontab_M = (number) => {
    this.setState({
      Minutes: number.target.value,
    });
  };
  handlecrontab_H = (number) => {
    this.setState({
      Hours: number.target.value,
    });
  };
  handlecrontab_DM = (number) => {
    this.setState({
      Day_of_month: number.target.value,
    });
  };
  handlecrontab_Mon = (number) => {
    this.setState({
      Month: number.target.value,
    });
  };
  handlecrontab_DW = (number) => {
    this.setState({
      Day_of_week: number.target.value,
    });
  };
  chosenCaseNumber = () => {
    let chosens = 0;
    const { caseArray, treeData } = this.state;
    caseArray.forEach((key) => {
      treeData.forEach((i) => {
        i.children.find((childNode) => {
          if (childNode.key === key) {
            chosens++;
          }
        });
      });
    });
    return chosens;
  };
  render() {
    const { editVisible, tempValue, envName } = this.props;
    const envList = this.props?.envList?.envList || [];
    const projectList = this.props?.projectList?.projectList || [];
    const { caseNumber, checked } = this.state;
    const treeData = [...this.state.treeData];
    const crontab_time = this.props.crontab_time;
    const crontab = crontab_time.split(' ');
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
            width={1200}
          >
            <Form
              name="basic"
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 25 }}
              initialValues={{ remember: true }}
              onValuesChange={this.handleEditValueChange}
              ref={this.formRef}
            >
              <Form.Item
                label="任务名称"
                name="name"
                rules={[{ required: true, message: '请输入任务名称' }]}
                initialValue={tempValue.name}
                key="name"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="简要描述"
                name="description"
                initialValue={tempValue.description}
                key="description"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="定时状态"
                name="enabled"
                valuePropName="checked"
                initialValue={tempValue.enabled}
              >
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  onChange={(checked, record) => {
                    this.onEditSwitchChange(checked, record);
                  }}
                />
              </Form.Item>
              {checked && (
                <Form.Item
                  label="定时计划"
                  name="crontab"
                  rules={[{ required: true }]}
                  key="crontab"
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
                      onChange={(num) => this.handlecrontab_M(num)}
                      style={{ width: 205 }}
                      addonAfter="m"
                      defaultValue={crontab[0]}
                    />
                    <Input
                      onChange={(num) => this.handlecrontab_H(num)}
                      style={{ width: 205 }}
                      addonAfter="h"
                      defaultValue={crontab[1]}
                    />
                    <Input
                      onChange={(num) => this.handlecrontab_DM(num)}
                      style={{ width: 205 }}
                      addonAfter="dM"
                      defaultValue={crontab[2]}
                    />
                    <Input
                      onChange={(num) => this.handlecrontab_Mon(num)}
                      style={{ width: 205 }}
                      addonAfter="MY"
                      defaultValue={crontab[3]}
                    />
                    <Input
                      onChange={(num) => this.handlecrontab_DW(num)}
                      style={{ width: 205 }}
                      addonAfter="d"
                      defaultValue={crontab[4]}
                    />
                  </div>
                </Form.Item>
              )}
              <Form.Item
                label="运行环境"
                name="env"
                rules={[{ required: true, message: '请选择运行环境' }]}
                initialValue={envName}
                key="env"
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
                  >
                    {envList &&
                      Array.isArray(envList) &&
                      envList.length &&
                      envList.map((item) => {
                        return (
                          <Option value={item.env_name} key={item.env_name}>
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
                initialValue={tempValue.task_extend.project}
                key="project"
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
                    onSelect={this.handleProjectChange}
                  >
                    {projectList &&
                      Array.isArray(projectList) &&
                      projectList.length &&
                      projectList.map((item) => {
                        return (
                          <Option
                            value={item.project_name}
                            key={item.project_name}
                          >
                            {item.project_name}
                          </Option>
                        );
                      })}
                  </Select>
                }
              </Form.Item>
              <Form.Item
                label={`已选${this.state.chosensCase}用例`}
                name="cassNumber"
                rules={[{ required: false }]}
                key="cassNumber"
              >
                <TreeNode_Edit
                  treeData={[...treeData]}
                  caseNumber={this.caseNumber}
                  caseArray={this.props.caseArray}
                  checked_projectListId={this.state.checked_projectListId}
                />
              </Form.Item>
              <Form.Item
                label="邮件列表"
                name="emailList"
                initialValue={tempValue.task_extend.email_list}
              >
                <Select
                  mode="tags"
                  placeholder="请输入邮箱"
                  style={{ width: '100%' }}
                  listHeight={256}
                />
              </Form.Item>
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
