import React from 'react';
import {
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
} from '@ant-design/icons';
import { connect } from 'umi';
import './index.less';
import '/src/styles/global.less';
import SearchModal from './Search';
import AddModal from './addModal';
import EditModal from './editModal';

//获取接口参数
class ModuleList extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.showAddModal = this.showAddModal.bind(this);
    this.handleAddModule = this.handleAddModule.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.handleTotalNumber = this.handleTotalNumber.bind(this);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: '',
      tableLoading: true,
      total: 0,
    };
  }

  componentDidMount() {
    this.setState({
      tableLoading: true,
    });
    this.props.dispatch({
      type: 'moduleList/getModuleList',
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
  handleAddModule(childModalState: any) {
    this.setState({
      addVisible: childModalState,
    });
  }
  //页码数增加
  handleTotalNumber() {
    const total = this.state.total;
    this.setState({
      total: total + 1,
    });
  }

  /* =======================编辑按钮及模态框功能=========================== */
  //编辑的地方弹出模态框
  showEditModal(record: any) {
    this.setState({
      editVisible: true,
      tempValue: record,
    });
  }
  //子模块--模态框传值
  handleEditModal(childModalState: any) {
    this.setState({
      editVisible: childModalState,
    });
  }

  /* =======================删除按钮及模态框功能=========================== */
  //模块列表删除按钮
  handleDelete(record: any) {
    this.props.dispatch({
      type: 'moduleList/deleteModuleList',
      payload: {
        id: record.id,
      },
      callback: () => {
        this.props.dispatch({
          type: 'moduleList/getModuleList',
          payload: {
            page: 1,
          },
        });
      },
    });
  }

  render() {
    const { tableLoading, total } = this.state;
    const { editVisible, moduleList } = this.props.moduleList;
    moduleList.map((item) => {
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
        title: '模块名称',
        dataIndex: 'module_name',
        key: 'module_name',
        align: 'center',
      },
      {
        title: '项目名称',
        dataIndex: 'project_name',
        key: 'project_name',
        align: 'center',
      },
      {
        title: '测试数',
        dataIndex: 'testcase_count',
        key: 'testcase_count',
        align: 'center',
      },
      {
        title: '测试人员',
        dataIndex: 'test_user_name',
        key: 'test_user_name',
        align: 'center',
      },
      {
        title: '简要描述',
        dataIndex: 'description',
        key: 'description',
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
        title: '操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        width: '150px',
        render: (_: any, record: any) => {
          return (
            <div className="action_button">
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
              onClick={this.handleAddModule}
              icon={<PlusCircleOutlined />}
              shape="round"
            >
              新增
            </Button>
          </div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={[...moduleList]}
            loading={tableLoading}
            pagination={paginationProps}
            bordered
          />
        </Card>

        <AddModal
          showAddModal={this.handleAddModule}
          addVisible={this.state.addVisible}
          handleTotalNumber={this.handleTotalNumber}
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

export default connect(({ moduleList }) => ({
  moduleList,
}))(ModuleList);
