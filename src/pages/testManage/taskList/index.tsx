import React from 'react';
import {
  Switch,
  Card,
  Select,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Space,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';
import SearchModal from './Search';
import AddModal from './addModal';
import EditModal from './editModal';
import { FormListContext } from '@ant-design/pro-form/lib/components/List';
//获取接口参数
class TaskList extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: '',
      tableLoading: true,
      total: 0,
    };
    this.getTaskList();
  }

  getTaskList() {
    this.setState({
      tableLoading: true,
    });
    this.props.dispatch({
      type: 'taskList/getTaskList',
      payload: {
        page: 1,
      },
      callback: (res) => {
        this.setState({
          tableLoading: false,
          total: res.results.length,
        });
      },
    });
  }

  /* =======================新增按钮及模态框功能=========================== */

  //主页”添加“按钮
  showAddModal() {
    this.setState({
      addVisible: true,
    });
  }

  //模态框中的添加，子组件回传
  handleAddTask(childModalState: any) {
    this.setState({
      addVisible: childModalState,
    });
  }

  /* =======================编辑按钮及模态框功能=========================== */
  //编辑的地方弹出模态框
  handleEditModal(childModalState: any) {
    this.setState({
      editVisible: childModalState,
    });
  }
  //子模块--模态框传值
  showEditModal(record: any) {
    this.setState({
      editVisible: true,
      tempValue: record,
    });
  }

  /* =======================删除按钮及模态框功能=========================== */
  //任务列表删除按钮
  handleDelete(record: any) {
    this.props.dispatch({
      type: 'taskList/deleteTaskList',
      payload: {
        id: record.id,
      },
      callback: (res) => {
        ///还需要调用获取列表
      },
    });
  }

  render() {
    const { tableLoading, total } = this.state;
    const { editVisible, taskList } = this.props.taskList;
    taskList.map((item) => {
      item.key = item.id;
    });
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      total: total,

      showTotal: () => `共${total}条`,
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
        title: '创建人',
        dataIndex: 'author',
        key: 'author',
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
              // onChange={(checked) => {
              //   this.onSwitchChange(checked, text, record);
              // }}
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
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
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
            <div>
              <Space size="small">
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
                  title="Are you 确定？"
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
              </Space>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card>
          <SearchModal />
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
        />
        <EditModal
          showEditModal={this.handleEditModal}
          editVisible={this.state.editVisible}
          tempValue={this.state.tempValue}
        />
      </div>
    );
  }
}

export default connect(({ taskList }) => ({
  taskList,
}))(TaskList);
