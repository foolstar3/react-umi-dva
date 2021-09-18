import React from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import AddModal from './addModal';
import EditModal from './editModal';
import SearchModal from './Search';
//获取接口参数
class GlobalVarList extends React.Component<any, any> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: '',
      tableLoading: true,
      total: 0,
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.getGlobalVarList({ page: 1 });
  }

  getGlobalVarList = (payload: any) => {
    this.props.dispatch({
      type: 'globalVarList/getGlobalVarList',
      payload,
      callback: (res) => {
        this.setState({
          tableLoading: false,
          total: res.count,
        });
      },
    });
  };
  onPageChange = (page: any) => {
    this.getGlobalVarList({ page });
    this.setState({
      currentPage: page,
    });
  };
  childrenPageChange = () => {
    this.getGlobalVarList({ page: 1 });
    this.setState({
      currentPage: 1,
    });
  };
  handleTotalNumber = () => {
    const total = this.state.total;
    this.setState({
      total: total + 1,
    });
  };

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  handleAddGlobalVar = (childModalState: any) => {
    this.setState({
      addVisible: childModalState,
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
      type: 'globalVarList/deleteGlobalVarList',
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
    const { globalVarList } = this.props?.globalVarList;
    globalVarList.map((item) => {
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
    const columns = [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '参数名称',
        dataIndex: 'var_name',
        key: 'var_name',
        align: 'center',
      },
      {
        title: '参数值',
        dataIndex: 'var_value',
        key: 'test_user',
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
        title: '相关操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        render: (_: any, record: any) => {
          return (
            <div>
              <Space size="small">
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
              </Space>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card>
          <SearchModal getGlobalVarList={this.getGlobalVarList} />
          <div className="ant-btn-add">
            <Button
              type="primary"
              onClick={this.handleAddGlobalVar}
              icon={<PlusCircleOutlined />}
              shape="round"
            >
              添加全局
            </Button>
          </div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={[...globalVarList]}
            loading={tableLoading}
            pagination={paginationProps}
            bordered
          />
        </Card>

        <AddModal
          showAddModal={this.handleAddGlobalVar}
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

export default connect(({ globalVarList }) => ({
  globalVarList,
}))(GlobalVarList);
