import React from 'react';
import {
  message,
  Switch,
  Collapse,
  Select,
  Form,
  Input,
  Modal,
  InputNumber,
} from 'antd';
import { connect } from 'umi';
import TreeNode_Edit from './treeNode_edit';
import { FormInstance } from '@ant-design/pro-form';
const { Panel } = Collapse;
const { Option } = Select;
class EditModal extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      tempEditValue: {},
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
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      caseNumber: nextProps.caseNumber,
      caseArray: nextProps.caseArray,
      checked: nextProps.tempValue.enabled,
    });
  }
  formRef = React.createRef<FormInstance>();

  getModuleList = (payload: any) => {
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res, rescount) => {
        this.getTreeNode(res);
      },
    });
  };

  getTreeNode = (moduleListChange: any) => {
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
          },
        });
        treeData.push({
          title: moduleItem.module_name,
          key: moduleItem.module_name,
          children: children,
        });
      });
    this.setState({
      treeData: treeData,
    });
  };

  editSubmit = () => {
    const tempEditValue = this.state.tempEditValue;
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
      email_list: editTask?.emailList,
      project: editTask?.project,
      crontab: {
        minute: this.state.Minutes,
        hour: this.state.Hours,
        day_of_week: this.state.Day_of_week,
        day_of_month: this.state.Day_of_month,
        month_of_year: this.state.Month,
      },
    };
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
    this.onReset();
    this.props.showEditModal(false);
  };

  editCancel = () => {
    this.props.showEditModal(false);
    this.onReset();
  };

  handleEditValueChange = (singleValueChange, ValueChange) => {
    console.log('ValueChange', ValueChange);
    this.setState({
      tempEditValue: ValueChange,
    });
  };

  handleProjectChange = (project: any) => {
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
  onEditSwitchChange = (checked, record) => {
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
    const { editVisible, tempValue, envName } = this.props;
    const envList = this.props?.envList?.envList || [];
    const projectList = this.props?.projectList?.projectList || [];
    const { caseNumber, checked } = this.state;
    const treeData = [...this.state.treeData];
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
                label="状态"
                name="enabled"
                rules={[{ required: true }]}
                valuePropName="checked"
                key="enabled"
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
                  initialValue={tempValue.crontab_time}
                  key="crontab"
                >
                  <div>
                    <InputNumber
                      min={0}
                      max={59}
                      defaultValue={parseInt(tempValue.crontab_time[0])}
                      bordered
                      onChange={(num) => this.handlecrontab_M(num)}
                      style={{ width: '100px' }}
                      formatter={(value) => `${value} M`}
                      parser={(value) => value?.replace(' M', '')}
                    />
                    <InputNumber
                      min={0}
                      max={23}
                      defaultValue={parseInt(tempValue.crontab_time[2])}
                      bordered
                      onChange={(num) => this.handlecrontab_H(num)}
                      style={{ width: '100px' }}
                      formatter={(value) => `${value} H`}
                      parser={(value) => value?.replace(' H', '')}
                    />
                    <InputNumber
                      min={1}
                      max={31}
                      defaultValue={parseInt(tempValue.crontab_time[4])}
                      bordered
                      onChange={(num) => this.handlecrontab_DM(num)}
                      style={{ width: '100px' }}
                      formatter={(value) => `${value} dM`}
                      parser={(value) => value?.replace(' dM', '')}
                    />
                    <InputNumber
                      min={1}
                      max={12}
                      defaultValue={parseInt(tempValue.crontab_time[6])}
                      bordered
                      onChange={(num) => this.handlecrontab_Mon(num)}
                      style={{ width: '100px' }}
                      formatter={(value) => `${value} MY`}
                      parser={(value) => value?.replace(' MY', '')}
                    />
                    <InputNumber
                      min={0}
                      max={6}
                      defaultValue={parseInt(tempValue.crontab_time[8])}
                      bordered
                      onChange={(num) => this.handlecrontab_DW(num)}
                      style={{ width: '100px' }}
                      formatter={(value) => `${value} d`}
                      parser={(value) => value?.replace(' d', '')}
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
                    style={{ width: 314 }}
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
                label={`已选${caseNumber}用例`}
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
                rules={[{ required: true }]}
                initialValue={tempValue.task_extend.email_list}
              >
                <Select
                  mode="tags"
                  placeholder="请输入邮箱"
                  style={{ width: '100%' }}
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
