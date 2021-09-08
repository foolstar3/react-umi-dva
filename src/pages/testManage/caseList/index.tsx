import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Button, Popconfirm } from 'antd';
import {
  PlayCircleOutlined,
  EditOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
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

  UNSAFE_componentWillMount() {
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

  deleteCase = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/deleteCase',
      payload,
      callback: () => {
        console.log('deleteOk');
        this.getCaseList({ page: 1 });
      },
    });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  onSearch = (payload) => {
    payload = {
      ...payload,
      page: 1,
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/getCaseList',
      payload,
      callback: () => {
        console.log('search');
      },
    });
    this.getCaseList({ page: 1 });
  };

  handleDeleteOk = (record) => {
    this.deleteCase(record.id);
  };

  copyCase = (record) => {};

  onProjectSearch = (payload) => {
    console.log(payload);
  };

  onModuleSearch = (payload) => {
    console.log(payload);
  };

  onProjectChange = (payload) => {
    console.log(payload);
  };

  render() {
    const { tableLoading, selectedRowKeys, total } = this.state;
    const { caseList } = this.props;
    const projectOptions = [];
    const moduleOptions = [];
    caseList.results?.map((item) => {
      item.key = item.id;
      projectOptions.push(item.project_name);
      moduleOptions.push(item.module_name);
    });
    const actionColumn = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 240,
      render: (text, record) => (
        <div key={record.id} className={styles.actionColumn}>
          <Popconfirm
            title="确定运行?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            // onConfirm={() => this.handleDeleteOk(record)}
          >
            <Button
              type="primary"
              title="运行"
              size="small"
              shape="round"
              className={styles.buttonRun}
            >
              <PlayCircleOutlined />
            </Button>
          </Popconfirm>
          <Button type="primary" title="编辑" size="small" shape="round">
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            title="复制"
            size="small"
            shape="round"
            onClick={this.copyCase}
          >
            <CopyOutlined />
          </Button>
          <Popconfirm
            title="确定删除?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => this.handleDeleteOk(record)}
          >
            <Button
              type="primary"
              title="删除"
              danger
              size="small"
              shape="round"
            >
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
          <SearchBox
            projectOptions={projectOptions}
            moduleOptions={moduleOptions}
            onSearch={this.onSearch}
            onProjectSearch={this.onProjectSearch}
            onProjectChange={this.onProjectChange}
            onModuleSearch={this.onModuleSearch}
          />
          <div className={styles.btnPosition}>
            <Button type="primary" icon={<PlusCircleOutlined />}>
              新增
            </Button>
            <Button type="primary" icon={<PlayCircleOutlined />}>
              运行
            </Button>
          </div>
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
