import React, { Component } from 'react';
import { Table, Button, Card, message, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import SearchBox from './searchBox';
import config from './config';
import { connect, history } from 'umi';
import styles from './index.less';

@connect(({ report, projectList }) => ({
  reportList: report.reportList,
  projectList: projectList.projectList,
}))
class ViewReport extends Component {
  constructor(props) {
    super(props);
    this.hasPermission = JSON.parse(
      localStorage.getItem('qc_permissions'),
    ).report.length;
    this.state = {
      currentReport: {},
      tableLoading: true,
      total: 0,
      currentPage: 1,
      searchWords: {},
    };
  }

  componentDidMount() {
    this.getReportList({ page: 1 });
    this.getProjectList({ page: 'None' });
  }

  /**
   * 请求后端接口函数
   */
  //获取项目名称列表
  getProjectList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectList/getProjectList',
      payload,
      callback: () => {},
    });
  };

  getReportList = (payload) => {
    this.setState({
      tableLoading: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getReportList',
      payload,
      callback: (res) => {
        const { reportList } = this.props;
        reportList.results.map((item) => {
          item.key = item.id;
        });
        this.setState({
          tableLoading: false,
          total: reportList.count,
        });
      },
    });
  };

  deleteReport = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/deleteReport',
      payload,
      callback: () => {
        this.getReportList({ page: 1 });
        /**
         * todo
         * 删除成功
         * 删除失败
         */
      },
    });
  };

  getReportDetail = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getReportDetail',
      payload,
      callback: () => {
        history.push('/reportManage/reportDetail');
      },
      failCB: (res) => {
        message.error(res);
      },
    });
  };
  /**
   * 删除功能
   */

  handleDeleteOk = (record) => {
    this.deleteReport(record.id);
  };

  showDetail = (record) => {
    this.getReportDetail({ task_id: record.task_id });
  };

  onSearch = (payload) => {
    this.getReportList({ page: 1, ...payload });
    this.setState({
      searchWords: payload,
      currentPage: 1,
    });
  };

  onReset = () => {
    this.setState({
      searchWords: {},
    });
  };

  render() {
    const { currentReport, tableLoading, total, currentPage } = this.state;
    const { reportList, projectList } = this.props;

    const actionConfig = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: this.hasPermission ? 180 : 100,
      align: 'center',
      render: (text, record) => (
        <div key={record.id} className={styles.actionColumn}>
          <Button
            type="primary"
            icon={<ProfileOutlined />}
            onClick={() => this.showDetail(record)}
            size="small"
            shape="round"
            disabled={record.result === 'running'}
          >
            {' '}
            详情
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
              icon={<DeleteOutlined />}
              danger
              size="small"
              shape="round"
              style={{ display: this.hasPermission ? 'block' : 'none' }}
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    };
    const columnsConfig = [...config, actionConfig];
    reportList.results?.map((item) => {
      item.key = item.id;
    });
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      current: currentPage,
      onChange: (page) => {
        this.setState({
          currentPage: page,
        });
        this.getReportList({ page, ...this.state.searchWords });
      },
      total: total,
      showTotal: () => `共 ${total} 条`,
    };

    if (Object.keys(reportList).length !== 0) {
      return (
        <>
          <Card>
            <SearchBox
              projectOptions={projectList}
              onSearch={this.onSearch}
              onReset={this.onReset}
            />
            <div className={styles.tableContainer}>
              <Table
                columns={columnsConfig}
                dataSource={reportList.results}
                pagination={paginationProps}
                loading={tableLoading}
                bordered
              />
            </div>
          </Card>
        </>
      );
    }
    return null;
  }
}

export default ViewReport;
