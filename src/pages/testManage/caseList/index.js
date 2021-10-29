import React, { Component } from 'react';
import { connect } from 'umi';
import {
  Card,
  Table,
  Button,
  Popconfirm,
  Modal,
  Form,
  Input,
  message,
  Select,
} from 'antd';
import {
  PlayCircleOutlined,
  EditOutlined,
  CopyOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { history } from 'umi';
import SearchBox from './components/searchBox';
import CaseDetailTabs from './components/caseDetailTabs';
import styles from './index.less';
import tableColumns from './config';

const { Option } = Select;
const runType = [
  {
    name: '同步',
    value: 'sync',
  },
  {
    name: '异步',
    value: 'async',
  },
];
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
class CaseList extends Component {
  hasPermission = JSON.parse(localStorage.getItem('qc_permissions')).case
    .length;
  state = {
    selectedRowKeys: [],
    selectedRowsProjects: [],
    total: 0,
    showDetailTabs: false,
    currentCase: {},
    isCopyModalVisible: false,
    currentPage: 1,
    searchWords: {},
    isRunModalVisible: false,
    curRunType: 'sync',
    runCaseId: [],
  };
  runModal = 'single';
  runForm = React.createRef();
  copyForm = React.createRef();

  componentDidMount() {
    this.getCaseList({ page: 1 });
    this.getProjectList({ page: 'None' });
    // this.getEnvList({ page: 'None', is_valid: true });
    history.listen((location) => {
      if (location.pathname === '/testManage/caseList') {
        const { showDetailTabs } = this.state;
        if (showDetailTabs) {
          this.getCaseList({ page: 1 });
        }
        this.setState({ showDetailTabs: false });
      }
    });
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  /**
   *
   * 发送请求函数
   *
   */

  getUpload = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileListData',
      payload,
      callback: () => {},
    });
  };

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
        const { envList } = this.props;
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

  copyCase = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'testCase/copyCase',
      payload,
      callback: (res) => {
        if (res.code === 'U000000') {
          message.success(res.message);
          this.getCaseList({ page: 1 });
        } else {
          message.error(res.message);
        }
        this.setState({
          isCopyModalVisible: false,
        });
      },
    });
  };

  runCase = (payload) => {
    const { dispatch } = this.props;
    message.loading({ content: '用例运行中', duration: 0, key: 'runCase' });
    dispatch({
      type: 'testCase/runCase',
      payload,
      callback: (res) => {
        message.success({
          content: '用例运行完成',
          duration: 1,
          key: 'runCase',
        });
        dispatch({
          type: 'report/update',
          payload: { reportDetail: res },
        });
        history.push('/reportManage/reportDetail');
      },
      failCB: () => {
        message.error({
          content: `用例运行失败`,
          duration: 1,
          key: 'runCase',
        });
      },
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys,
      selectedRowsProjects: selectedRows[0] ? selectedRows[0].project : [],
    });
  };

  onSearch = (payload) => {
    this.setState({ currentPage: 1, searchWords: payload }, () =>
      this.getCaseList({ page: 1, ...this.state.searchWords }),
    );
  };

  onReset = () => {
    this.setState({
      searchWords: {},
    });
  };

  handleDeleteOk = (record) => {
    this.deleteCase(record.id);
  };

  showCopyModal = (record) => {
    this.setState({
      isCopyModalVisible: true,
      currentCase: record,
    });
  };
  cancelCopy = () => {
    this.setState({ isCopyModalVisible: false });
  };
  handleCopyOk = () => {
    const { currentCase } = this.state;
    const payload = {
      name: this.copyForm.current.getFieldsValue().name,
      id: currentCase.id,
    };
    payload.name ? this.copyCase(payload) : message.error('请填写用例名称');
  };
  onProjectChange = (payload, flag = true) => {
    if (payload) {
      this.getModuleList({ page: 'None', project: payload });
    } else {
      const { dispatch } = this.props;
      dispatch({
        type: 'moduleList/updateModuleList',
        payload: { moduleList: {} },
      });
    }
    flag ? this.getCaseList({ page: 'None', project: payload }) : '';
  };

  onModuleChange = (module, project) => {
    this.getCaseList({ page: 'None', project, module });
  };

  showCaseDetail = (record) => {
    if (Object.keys(record).length) {
      this.getCalls(record.id);
      this.getModuleList({ page: 'None', project: record.project });
      this.getUpload({ page: 'None', project: record.project });
      this.getCaseList({
        page: 'None',
        project: record.project,
        module: record.module,
      });
    } else {
      this.removeCalls();
    }
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
        this.getCaseList({ page: this.state.currentPage });
      },
    );
  };

  showRunModal = (record) => {
    // this.runModal = record === '' ? 'multiple' : 'single';
    this.runModal = 'single';
    this.setState({
      curRunType: 'sync',
    });
    if (record !== '') {
      this.setState({
        runCaseId: [record.id],
      });
      this.getEnvList({
        page: 'None',
        project: record.project,
        is_valid: true,
      });
    } else {
      const { selectedRowKeys, selectedRowsProjects } = this.state;
      if (selectedRowKeys.length) {
        // todo 发起请求获取所选用例可用的环境列表
        this.setState({
          runCaseId: selectedRowKeys,
        });
        this.getEnvList({
          page: 'None',
          project: selectedRowsProjects,
          is_valid: true,
        });
      } else {
        return message.info('请选择需要运行的用例');
      }
    }
    this.setState({
      isRunModalVisible: true,
    });
  };

  handleRunOk = () => {
    if (this.runForm.current.getFieldValue('env_name')) {
      const payload = {
        case_list: {
          case: this.state.runCaseId,
        },
        env: this.runForm.current.getFieldValue('env_name'),
        run_type: 'sync',
      };
      this.runCase(payload);
      this.setState({
        isRunModalVisible: false,
      });
    } else {
      message.info('请选择运行环境');
    }
  };

  cancelRun = () => {
    this.setState({
      isRunModalVisible: false,
    });
  };
  runTypeChange = (val) => {
    this.setState({
      curRunType: val,
    });
  };
  renderCaseListTable = () => {
    const { selectedRowKeys, total, searchWords, currentPage } = this.state;
    const { caseList, projectData, moduleData, tableLoading } = this.props;

    const actionColumn = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: this.hasPermission ? 240 : 80,
      align: 'center',
      render: (text, record) => (
        <div key={record.id} className={styles.actionColumn}>
          <Button
            type="primary"
            title="运行"
            size="small"
            shape="round"
            className={styles.buttonRun}
            onClick={() => this.showRunModal(record)}
            style={{ display: this.hasPermission ? '' : 'none' }}
          >
            <PlayCircleOutlined />
          </Button>
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
            onClick={() => this.showCopyModal(record)}
            style={{ display: this.hasPermission ? '' : 'none' }}
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
              style={{ display: this.hasPermission ? '' : 'none' }}
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
      onChange: (selectedRowKeys, selectedRows) =>
        this.onSelectChange(selectedRowKeys, selectedRows),
    };
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      onChange: (page) => {
        this.getCaseList({ page, ...searchWords });
        this.setState({
          currentPage: page,
        });
      },
      total: total,
      pageSize: 10,
      current: currentPage,
      showTotal: () => `共 ${total} 条`,
    };

    if (caseList.results) {
      caseList.results?.map((item) => {
        item.key = item.id;
      });
    }

    return (
      <>
        <SearchBox
          projectOptions={projectData}
          moduleOptions={moduleData}
          onSearch={this.onSearch}
          onReset={this.onReset}
          onProjectChange={this.onProjectChange}
        />
        <div
          className="ant-btn-add"
          style={{ visibility: this.hasPermission ? '' : 'hidden' }}
        >
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
            onClick={() => this.showRunModal('')}
          >
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
  renderRunModal = () => {
    const { isRunModalVisible, curRunType } = this.state;
    const { envList } = this.props;
    return (
      <Modal
        visible={isRunModalVisible}
        title="选择运行环境"
        onOk={this.handleRunOk}
        onCancel={this.cancelRun}
        okButtonProps={{ shape: 'round' }}
        cancelButtonProps={{ shape: 'round' }}
      >
        <Form ref={this.runForm} {...formItemLayout}>
          <Form.Item
            name="env_name"
            label="运行环境"
            rules={[{ required: true, message: '请选择运行环境!' }]}
          >
            <Select>
              {envList.map((item) => (
                <Option value={item.id} key={item.id}>
                  {item.env_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          {this.runModal === 'multiple' && (
            <Form.Item
              name="run_type"
              label="运行方式"
              rules={[{ required: true, message: '请选择运行方式!' }]}
              initialValue={'sync'}
            >
              <Select onChange={(val) => this.runTypeChange(val)}>
                {runType.map((item) => (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}
          {curRunType === 'async' && (
            <>
              <Form.Item name="report_name" label="报告名称">
                <Input placeholder="选填，默认带时间后缀" />
              </Form.Item>

              <Form.Item name="report_desc" label="报告描述">
                <Input placeholder="选填" />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    );
  };
  renderCopyModal = () => {
    const { currentCase, isCopyModalVisible } = this.state;
    return (
      <Modal
        visible={isCopyModalVisible}
        title="输入新的用例名称"
        onOk={this.handleCopyOk}
        onCancel={this.cancelCopy}
        okButtonProps={{ shape: 'round' }}
        cancelButtonProps={{ shape: 'round' }}
      >
        <Form ref={this.copyForm} initialValues={currentCase}>
          <Form.Item
            name="name"
            label="用例名称"
            rules={[{ required: true, message: '请输入用例名称!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  render() {
    const {
      showDetailTabs,
      currentCase,
      isCopyModalVisible,
      isRunModalVisible,
    } = this.state;
    const { projectData, moduleData, caseList, envList, paramsFileList } =
      this.props;

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
              upload={paramsFileList}
            />
          ) : (
            this.renderCaseListTable()
          )}
          {isCopyModalVisible && this.renderCopyModal()}
          {isRunModalVisible && this.renderRunModal()}
        </Card>
      </>
    );
  }
}

export default connect(
  ({
    testCase,
    projectList,
    moduleList,
    envList,
    report,
    loading,
    paramsFile,
  }) => ({
    caseList: testCase.caseList,
    envList: envList.envList,
    projectData: projectList.projectList,
    moduleData: moduleList.moduleList,
    tableLoading: loading.effects['testCase/getCaseList'],
    reportDetail: report.reportDetail,
    paramsFileList: paramsFile.paramsFileList,
  }),
)(CaseList);
