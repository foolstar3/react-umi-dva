import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Popconfirm } from 'antd';
import {
  BugOutlined,
  EditOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import SearchBox from './searchBox';
import styles from './index.less';
import tableColumns from './config';

class CaseList extends Component<any, any> {
  state = {
    selectedRowKeys: [],
    tableLoading: false,
    total: 0,
  };

  componentWillMount() {
    this.getCaseList({ page: 1 });
  }
  /**
   *
   * 发送请求函数
   *
   */
  getCaseList = (payload) => {
    this.setState({
      tableLoading: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/getCaseList',
      payload,
      callback: () => {
        const { caseList } = this.props;
        this.setState({
          total: caseList.count,
          tableLoading: false,
        });
      },
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { tableLoading, selectedRowKeys, total } = this.state;
    const { caseList } = this.props;
    caseList.results?.map((item) => {
      item.key = item.id;
    });
    const actionColumn = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 280,
      render: (text, record) => (
        <div key={record.id}>
          <Button type="primary" title="运行">
            <BugOutlined />
          </Button>
          <Button type="primary" title="编辑">
            <EditOutlined />
          </Button>
          <Button type="primary" title="复制">
            <CopyOutlined />
          </Button>
          <Popconfirm
            title="确定删除?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            // onConfirm={() => this.handleDeleteOk(record)}
          >
            <Button type="primary" title="删除" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    };
    const tableConfig = [...tableColumns, actionColumn];
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => this.onSelectChange(selectedRowKeys),
    };
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      onChange: (page) => this.getCaseList({ page }),
      total: total,
      pageSize: 10,
      showTotal: () => `共 ${total} 条`,
    };

    return (
      <>
        <Card>
          <SearchBox />
          <div className={styles.tableWrapper}>
            <Table
              rowSelection={rowSelection}
              columns={tableConfig}
              loading={tableLoading}
              dataSource={caseList.results ?? []}
              pagination={paginationProps}
            />
          </div>
        </Card>
      </>
    );
  }
}

export default connect(({ testCase }) => ({
  caseList: testCase.caseList,
}))(CaseList);
