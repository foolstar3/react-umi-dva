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
//获取接口参数
class TaskList extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.handleCreateTask = this.handleCreateTask.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'taskList/getTaskList',
      payload: {
        page: 1,
      },
    });
  }

  //添加模态框，提交时传过来的子组件——模态框的返回值
  showAddModal(childModalState: any) {
    console.log('childModalState', childModalState);
    this.setState({
      addVisible: childModalState,
    });
  }

  handleCreateTask() {
    this.setState({
      addVisible: true,
    });
  }

  //编辑的地方弹出模态框
  handleEditModal(record: any) {
    console.log('record', record);
    this.setState({
      editVisible: true,
      tempValue: record,
    });
  }
  //子模块--模态框传值
  showEditModal(childModalState: any) {
    this.setState({
      editVisible: childModalState,
    });
  }

  //任务列表删除按钮
  handleDelete(value: any) {
    // const module_list = [...this.props.moduleList.list]
    // const moduleList = module_list.filter((item)=>item.module_name!==value.module_name)
    // this.props.dispatch({
    //   type: 'moduleList/deleteModuleList',
    //   payload: {
    //     list:moduleList
    //   }
    // })
  }

  render() {
    const { editVisible, list } = this.props.taskList;
    const columns = [
      {
        title: '#',
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
                  onClick={() => this.handleEditModal(record)}
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
        <SearchModal />
        <Card>
          <div className="ant-btn-add">
            <Button
              type="primary"
              onClick={this.handleCreateTask}
              icon={<PlusCircleOutlined />}
              shape="round"
            >
              添加任务
            </Button>
          </div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={[...list]}
            bordered
          />
        </Card>

        <AddModal
          showAddModal={this.showAddModal}
          addVisible={this.state.addVisible}
        />
        <EditModal
          editModal={this.showEditModal}
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
