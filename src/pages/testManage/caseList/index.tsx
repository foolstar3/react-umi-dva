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
import SearchBox from './components/searchBox';
import CaseDetailTabs from './components/caseDetailTabs';
import styles from './index.less';
import tableColumns from './config';

class CaseList extends Component<any, any> {
  state = {
    selectedRowKeys: [],
    tableLoading: false,
    total: 0,
    showDetailTabs: false,
    currentCase: {},
  };

  UNSAFE_componentWillMount() {
    this.getCaseList({ page: 1 });
    this.getProjectList({ page: 'None' });
    this.getModuleList({ page: 'None' });
    this.getEnvList({ page: 'None' });
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

  getProjectList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectList/getProjectList',
      payload,
      callback: (res) => {
        // console.log(res);
      },
    });
  };

  getModuleList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'moduleList/getModuleList',
      payload,
      callback: (res) => {},
    });
  };

  getEnvList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/getEnvList',
      payload,
      callback: () => {
        // const { envList } = props;
      },
    });
  };

  deleteCase = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/deleteCase',
      payload,
      callback: () => {
        // console.log('deleteOk');
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
        // console.log('search');
      },
    });
    this.getCaseList({ page: 1 });
  };

  handleDeleteOk = (record) => {
    this.deleteCase(record.id);
  };

  copyCase = (record) => {};

  onProjectChange = (payload, flag = true) => {
    this.getModuleList({ page: 'None', project: payload });
    flag ? this.getCaseList({ page: 'None', project: payload }) : '';
  };

  onModuleChange = (module, project) => {
    this.getCaseList({ page: 'None', project, module });
  };
  showCaseDetail = (record) => {
    const { caseList } = this.props;
    caseList.result?.filter((item) =>
      record
        ? item.project === record.project && item.module === record.module
        : false,
    );

    this.setState({
      showDetailTabs: true,
      currentCase: record,
    });
  };

  hideCaseDetail = () => {
    this.setState(
      {
        showDetailTabs: false,
      },
      () => {
        this.getCaseList({ page: 1 });
      },
    );
  };

  renderCaseListTable = () => {
    const { tableLoading, selectedRowKeys, total } = this.state;
    const { caseList, projectData, moduleData } = this.props;

    const actionColumn = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 240,
      align: 'center',
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
          <Button
            type="primary"
            title="编辑"
            size="small"
            shape="round"
            onClick={() => this.showCaseDetail(record)}
          >
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
    const tableConfig: any = [...tableColumns, actionColumn];
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

    caseList.results?.map((item) => {
      item.key = item.id;
    });
    // console.log(projectData);
    return (
      <>
        <SearchBox
          projectOptions={projectData}
          moduleOptions={moduleData}
          onSearch={this.onSearch}
          onProjectChange={this.onProjectChange}
        />
        <div className={styles.btnPosition}>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => this.showCaseDetail({})}
          >
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
            dataSource={caseList.results || []}
            pagination={paginationProps}
            bordered
          />
        </div>
      </>
    );
  };

  render() {
    const { showDetailTabs, currentCase } = this.state;
    const { projectData, moduleData, caseList, envList } = this.props;

    return (
      <>
        <Card>
          {showDetailTabs ? (
            <CaseDetailTabs
              caseDetail={currentCase}
              projectData={projectData}
              moduleData={moduleData}
              hideCaseDetail={this.hideCaseDetail}
              onProjectChange={this.onProjectChange}
              onModuleChange={this.onModuleChange}
              caseList={caseList}
              envList={envList}
            />
          ) : (
            this.renderCaseListTable()
          )}
        </Card>
      </>
    );
  }
}

export default connect(({ testCase, projectList, moduleList, envList }) => ({
  caseList: testCase.caseList,
  envList: envList.envList,
  projectData: projectList.projectList,
  moduleData: moduleList.moduleList,
}))(CaseList);
