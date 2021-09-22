import React from 'react';
import { Switch, Card, Table, Button, Popconfirm } from 'antd';
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
import '/src/styles/global.less';
//获取接口参数
class TaskList extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: {},
      tableLoading: false,
      total: 0,
      projectList: [],
      currentPage: 1,
    };
  }

  UNSAFE_componentWillMount() {
    this.getTaskList({ page: 1 });
    this.getProjectList({ page: 'None' });
  }

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
  getProjectList = (payload: any) => {
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
        this.getTaskList({ page: 1 });
      },
    });
  };

  onPageChange = (page: any) => {
    this.getTaskList({ page });
    this.setState({
      currentPage: page,
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

  handleAddTask = (childModalState: any) => {
    this.setState({
      addVisible: childModalState,
    });
  };

  handleEditModal = (childModalState: any) => {
    this.setState({
      editVisible: childModalState,
    });
  };

  showEditModal = (record: any) => {
    const strRecord = JSON.stringify(record);
    const recordTempValue = JSON.parse(strRecord);
    const projectListId = recordTempValue?.task_extend?.project;

    // const record_args = JSON.parse(record.args)
    // const envListId = record_args.env
    // console.log('envListId',envListId)
    this.state.projectList.map((projectItem) => {
      if (projectItem.id == projectListId) {
        recordTempValue.task_extend.project = projectItem.project_name;
        this.setState({
          editVisible: true,
          tempValue: recordTempValue,
        });
      }
    });
    // this.props.envList?.envList?.map((envItem)=>{
    //   if(envItem.id == envListId){
    //     recordTempValue.env = envItem.env_name
    //     this.setState({
    //       tempValue: recordTempValue,
    //     })
    //   }
    // })
  };

  handleDelete = (record: any) => {
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

  render() {
    const { tableLoading, total, currentPage } = this.state;
    const { taskList } = this.props?.taskList;
    taskList &&
      taskList.map((item) => {
        item.key = item.id;
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
    const columns: any = [
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
        title: '定时状态',
        dataIndex: 'enabled',
        key: 'enabled',
        width: 150,
        align: 'center',
        render: (text, record, index) => {
          return (
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked={text}
              onChange={(checked) => {
                this.onSwitchChange(checked, text, record);
              }}
              key={index}
            />
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
        width: 250,
        align: 'center',
      },
      {
        title: '更新时间',
        dataIndex: 'date_changed',
        key: 'date_changed',
        align: 'center',
      },
      {
        title: '相关操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        width: '120px',
        render: (_: any, record: any) => {
          return (
            <div className="action_button">
              <Popconfirm title="确认运行？" okText="Yes" cancelText="No">
                <Button
                  className="button_run"
                  type="primary"
                  icon={<PlayCircleOutlined />}
                  shape="round"
                  size="small"
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
          <SearchModal getTaskList={this.getTaskList} />
          <div className="ant-btn-add">
            <Button
              type="primary"
              onClick={this.handleAddTask}
              icon={<PlusCircleOutlined />}
              shape="round"
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
        />
      </div>
    );
  }
}

export default connect(({ taskList, userList, projectList }) => ({
  taskList,
  userList,
  projectList,
}))(TaskList);
