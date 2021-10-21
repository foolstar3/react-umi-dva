import React from 'react';
import { message, Switch, Card, Table, Button, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import './index.less';
import SearchModal from './Search';
import AddModal from './addModal';
import EditModal from './editModal';
import { DateFormat } from '@/utils/common';
import '/src/styles/global.less';
//获取接口参数
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.hasPermission = JSON.parse(
      localStorage.getItem('qc_permissions'),
    ).task.length;
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: {},
      tableLoading: false,
      total: 0,
      projectList: [],
      currentPage: 1,
      envName: '',
      name: '',
      update_time_after: '',
      update_time_before: '',
      description: '',
      enabled: '',
      caseNumber: '',
      projectId: 0,
      caseArray: [],
      project: '',
      crontab_time: '',
    };
  }

  UNSAFE_componentWillMount() {
    this.getProjectList({ page: 'None' });
    this.getTaskList({ page: 1 });
  }
  onRef = (ref) => {
    this.EditModal = ref;
  };

  getTaskList = (payload) => {
    this.setState({
      tableLoading: true,
    });
    this.props.dispatch({
      type: 'taskList/getTaskList',
      payload,
      callback: (res, taskCount) => {
        this.setState({
          tableLoading: false,
          total: taskCount,
        });
      },
    });
  };
  getProjectList = (payload) => {
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload,
      callback: (res, rescount) => {
        this.setState({
          projectList: res,
        });
      },
    });
  };

  onSwitchChange = (checked, text, record) => {
    const changeStatus = {
      enabled: checked,
    };
    this.props.dispatch({
      type: 'taskList/onSwitchTask',
      payload: {
        id: record.id,
        ...changeStatus,
      },
      callback: (res) => {
        message.success(res.message);
        this.getTaskList({ page: this.state.currentPage });
      },
    });
  };

  onPageChange = (page) => {
    const payload = {
      page: page,
      project: this.state.project,
      name: this.state.name,
      update_time_after: this.state.update_time_after,
      update_time_before: this.state.update_time_before,
      description: this.state.description,
      enabled: this.state.enabled,
    };
    this.getTaskList(payload);
    this.setState({
      currentPage: page,
    });
  };
  onResetPage = () => {
    this.setState({
      currentPage: 1,
    });
  };
  handleSearchChildren = (payload) => {
    this.setState({
      name: payload.name,
      project: payload.project,
      update_time_after: payload.update_time_after,
      update_time_before: payload.update_time_before,
      description: payload.description,
      enabled: payload.enabled,
    });
  };
  childrenPageChange = () => {
    this.getTaskList({ page: 1 });
    this.setState({
      currentPage: 1,
    });
  };
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  handleAddTask = (childModalState) => {
    this.setState({
      addVisible: childModalState,
    });
  };

  handleEditModal = (childModalState) => {
    this.setState({
      editVisible: childModalState,
    });
  };

  showEditModal = (record) => {
    this.setState({
      crontab_time: record.crontab_time,
    });
    const strRecord = JSON.stringify(record);
    const recordTempValue = JSON.parse(strRecord);
    const projectListId = recordTempValue?.task_extend?.project;
    const record_args = JSON.parse(record.args);
    const envListId = record_args[0].env;
    const caseNumber = record_args[0].case_list?.case?.length;
    this.setState({
      caseNumber: caseNumber,
      caseArray: record_args[0].case_list?.case,
    });
    const envList = this.props?.envList?.envList;
    envList.map((envItem) => {
      if (envListId == envItem.id) {
        this.setState({
          envName: envItem.env_name,
        });
      }
    });
    this.state.projectList.map((projectItem) => {
      if (projectItem.id == projectListId) {
        this.EditModal.handleProjectChange(projectItem.project_name);
        recordTempValue.task_extend.project = projectItem.project_name;
        this.setState({
          editVisible: true,
          tempValue: recordTempValue,
        });
      }
    });
  };

  handleDelete = (record) => {
    this.props.dispatch({
      type: 'taskList/deleteTaskList',
      payload: {
        id: record.id,
      },
      callback: () => {
        this.childrenPageChange();
      },
    });
  };
  handleRunTask = (record) => {
    this.props.dispatch({
      type: 'taskList/runTask',
      payload: {
        task_id: record.id,
      },
      callback: (res) => {
        message.info(res.message);
      },
    });
  };

  render() {
    const { tableLoading, total, currentPage } = this.state;
    const { taskList } = this.props?.taskList;
    taskList &&
      taskList.map((item) => {
        item.key = item.date_changed;
        item.project_name = item.task_extend?.project_name;
      });

    const paginationProps = {
      current: currentPage,
      showSizeChanger: false,
      showQuickJumper: true,
      total: total,
      showTotal: () => `共${total}条`,
      onChange: (page) => {
        this.onPageChange(page);
      },
    };
    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '项目名称',
        dataIndex: 'project_name',
        key: 'project_name',
        align: 'center',
      },
      {
        title: '定时状态',
        dataIndex: 'enabled',
        key: 'enabled',
        width: 150,
        align: 'center',
        render: (text, record, index) => {
          return (
            <div key={`${record.id}${index}${text}`}>
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                defaultChecked={text}
                onChange={(checked) => {
                  this.onSwitchChange(checked, text, record);
                }}
                disabled={!this.hasPermission}
              />
            </div>
          );
        },
      },
      {
        title: 'crontab',
        dataIndex: 'crontab_time',
        key: 'crontab_time',
        align: 'center',
      },
      {
        title: '简要描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '更新时间',
        dataIndex: 'date_changed',
        key: 'date_changed',
        align: 'center',
        render: (text) => {
          const time = DateFormat(text);
          return <span>{time}</span>;
        },
      },
      {
        title: '相关操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        width: '250px',
        render: (_, record) => {
          return (
            <div className="action_button">
              <Popconfirm
                title="确认运行？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => this.handleRunTask(record)}
              >
                <Button
                  className="button_run"
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  shape="round"
                  size="small"
                  style={{ display: this.hasPermission ? 'block' : 'none' }}
                >
                  运行
                </Button>
              </Popconfirm>

              <Button
                type="primary"
                onClick={() => this.showEditModal(record)}
                icon={<EditOutlined />}
                shape="round"
                size="small"
              >
                编辑
              </Button>
              <Popconfirm
                okText="Yes"
                cancelText="No"
                title="确定删除？"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => this.handleDelete(record)}
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  shape="round"
                  size="small"
                  style={{ display: this.hasPermission ? 'block' : 'none' }}
                >
                  删除
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card>
          <SearchModal
            getTaskList={this.getTaskList}
            handleSearchChildren={this.handleSearchChildren}
            onResetPage={this.onResetPage}
          />
          <div
            className="ant-btn-add"
            style={{ visibility: this.hasPermission ? '' : 'hidden' }}
          >
            <Button
              type="primary"
              onClick={this.handleAddTask}
              icon={<PlusCircleOutlined />}
              shape="round"
              size="small"
            >
              新增
            </Button>
          </div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={[...taskList]}
            bordered
            loading={tableLoading}
            pagination={paginationProps}
          />
        </Card>

        <AddModal
          showAddModal={this.handleAddTask}
          addVisible={this.state.addVisible}
          getTaskList={this.getTaskList}
          childrenPageChange={this.childrenPageChange}
        />
        <EditModal
          showEditModal={this.handleEditModal}
          editVisible={this.state.editVisible}
          tempValue={this.state.tempValue}
          onSwitchChange={this.onSwitchChange}
          childrenPageChange={this.childrenPageChange}
          envName={this.state.envName}
          caseNumber={this.state.caseNumber}
          onRef={this.onRef}
          caseArray={this.state.caseArray}
          crontab_time={this.state.crontab_time}
        />
      </div>
    );
  }
}

export default connect(({ taskList, userList, projectList, envList }) => ({
  taskList,
  userList,
  projectList,
  envList,
}))(TaskList);
