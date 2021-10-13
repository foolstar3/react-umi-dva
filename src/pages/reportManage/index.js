import React, { Component } from 'react';
import { Table, Button, Card, message, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import config from './config';
import { connect, history } from 'umi';
import styles from './index.less';

@connect(({ report }) => ({
  reportList: report.reportList,
}))
class ViewReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReport: {},
      tableLoading: true,
      total: 0,
    };
  }

  componentDidMount() {
    this.getReportList({ page: 1 });
  }

  /**
   * 请求后端接口函数
   */
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
    this.getReportList({ page: 1 });
  };

  /**
   *待开发功能
   */
  showDetail = (record) => {
    this.getReportDetail({ task_id: record.task_id });
  };

  render() {
    const { currentReport, tableLoading, total } = this.state;
    const { reportList } = this.props;

    const actionConfig = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 180,
      align: 'center',
      render: (text, record) => (
        <div key={record.id} className={styles.actionColumn}>
          <Button
            type="primary"
            icon={<ProfileOutlined />}
            onClick={() => this.showDetail(record)}
            size="small"
            shape="round"
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
      onChange: (page) => this.getReportList({ page }),
      total: total,
      showTotal: () => `共 ${total} 条`,
    };

    if (Object.keys(reportList).length !== 0) {
      return (
        <>
          <Card>
            <Table
              columns={columnsConfig}
              dataSource={reportList.results}
              pagination={paginationProps}
              loading={tableLoading}
              bordered
            ></Table>
          </Card>
        </>
      );
    }
    return null;
  }
}

export default ViewReport;
