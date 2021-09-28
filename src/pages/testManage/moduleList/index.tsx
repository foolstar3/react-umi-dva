import React from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
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
import { DateFormat } from '@/utils/common';
import AddModal from './addModal';
import EditModal from './editModal';

class ModuleList extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: '',
      tableLoading: true,
      total: 0,
      currentPage: 1,
      module_name: '',
      test_user: '',
      description: '',
      project: '',
      update_time_after: '',
      update_time_before: '',
    };
  }

  componentDidMount() {
    this.setState({
      tableLoading: true,
    });
    this.getModuleList({ page: 1 });
  }

  getModuleList = (payload) => {
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res, resCount) => {
        this.setState({
          tableLoading: false,
          total: resCount,
        });
      },
    });
  };

  onPageChange = (page: any) => {
    const payload = {
      page: page,
      module_name: this.state.module_name,
      test_user: this.state.test_user,
      description: this.state.description,
      project: this.state.project,
      update_time_after: this.state.update_time_after,
      update_time_before: this.state.update_time_before,
    };
    this.getModuleList(payload);
    this.setState({
      currentPage: page,
    });
  };
  childrenPageChange = () => {
    this.getModuleList({ page: 1 });
    this.setState({
      currentPage: 1,
    });
  };
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  handleAddModule = (childModalState: any) => {
    this.setState({
      addVisible: childModalState,
    });
  };

  handleTotalNumber = () => {
    const total = this.state.total;
    this.setState({
      total: total + 1,
    });
  };

  showEditModal = (record: any) => {
    this.setState({
      editVisible: true,
      tempValue: record,
    });
  };

  handleEditModal = (childModalState: any) => {
    this.setState({
      editVisible: childModalState,
    });
  };

  handleDelete = (record: any) => {
    this.props.dispatch({
      type: 'moduleList/deleteModuleList',
      payload: {
        id: record.id,
      },
      callback: () => {
        this.childrenPageChange();
      },
    });
  };
  handleChildrenSearch = (payload: any) => {
    this.setState({
      module_name: payload.module_name,
      test_user: payload.test_user,
      description: payload.description,
      project: payload.project,
      update_time_after: payload.update_time_after,
      update_time_before: payload.update_time_before,
    });
  };

  render() {
    const { tableLoading, total, currentPage } = this.state;
    const { moduleList } = this.props.moduleList;
    moduleList &&
      moduleList.map((item) => {
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
        render: (text) => {
          const time = DateFormat(text);
          return <span>{time}</span>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        align: 'center',
        render: (text) => {
          const time = DateFormat(text);
          return <span>{time}</span>;
        },
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
          <SearchModal
            getModuleList={this.getModuleList}
            handleChildrenSearch={this.handleChildrenSearch}
          />
          <div className="ant-btn-add">
            <Button
              type="primary"
              onClick={this.handleAddModule}
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
          childrenPageChange={this.childrenPageChange}
        />
        <EditModal
          showEditModal={this.handleEditModal}
          editVisible={this.state.editVisible}
          tempValue={this.state.tempValue}
          childrenPageChange={this.childrenPageChange}
        />
      </div>
    );
  }
}

export default connect(({ moduleList }) => ({
  moduleList,
}))(ModuleList);
