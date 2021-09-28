import React, { Component } from 'react';
import { connect } from 'umi';
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
    total: 0,
    showDetailTabs: false,
    currentCase: {},
  };

  componentDidMount() {
    this.getCaseList({ page: 1 });
    this.getProjectList({ page: 'None' });
    this.getModuleList({ page: 'None' });
    this.getEnvList({ page: 'None', is_valid: true });
  }
  /**
   *
   * 发送请求函数
   *
   */
  getCaseList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/getCaseList',
      payload,
      callback: () => {
        const { caseList } = this.props;
        this.setState({
          total: caseList.count,
        });
      },
    });
  };

  getProjectList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectList/getProjectList',
      payload,
      callback: (res) => {},
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
        this.getCaseList({ page: 1 });
      },
    });
  };

  getFuncs = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/getFuncs',
      payload,
      callback: () => {},
    });
  };

  getCalls = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/getCalls',
      payload,
    });
  };

  removeCalls = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/removeCalls',
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

    this.getCaseList(payload);
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
    // 获取函数hooks
    this.getFuncs({ project_id: record.project });
    Object.keys(record).length ? this.getCalls(record.id) : this.removeCalls();
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
    const { selectedRowKeys, total } = this.state;
    const { caseList, projectData, moduleData, tableLoading } = this.props;

    const actionColumn = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 240,
      align: 'center',
      render: (text, record) => (
        <div key={record.id} className={styles.actionColumn}>
          <Popconfirm
            okText="Yes"
            cancelText="No"
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
            okText="Yes"
            cancelText="No"
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
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: (selectedRowKeys) => this.onSelectChange(selectedRowKeys),
    // };
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

    return (
      <>
        <SearchBox
          projectOptions={projectData}
          moduleOptions={moduleData}
          onSearch={this.onSearch}
          onProjectChange={this.onProjectChange}
        />
        <div className="ant-btn-add">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => this.showCaseDetail({})}
            size="small"
            shape="round"
          >
            新增
          </Button>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            size="small"
            shape="round"
          >
            运行
          </Button>
        </div>
        <div className={styles.tableWrapper}>
          <Table
            // rowSelection={rowSelection}
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
    const { projectData, moduleData, caseList, envList, funcs } = this.props;

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
              funcs={funcs}
            />
          ) : (
            this.renderCaseListTable()
          )}
        </Card>
      </>
    );
  }
}

export default connect(
  ({ testCase, projectList, moduleList, envList, loading }) => ({
    caseList: testCase.caseList,
    envList: envList.envList,
    projectData: projectList.projectList,
    moduleData: moduleList.moduleList,
    funcs: testCase.funcsName,
    tableLoading: loading.effects['testCase/getCaseList'],
  }),
)(CaseList);
