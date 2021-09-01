import React, { Component } from 'react';
import { Table, Button, Card, message, Popconfirm } from 'antd';
import {
  DeleteOutlined,
  ProfileOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import config from './config';
import { connect } from 'dva';

const myconnect: Function = connect;
@myconnect(({ report }) => ({
  reportList: report.reportList,
}))
class ViewReport extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentReport: {},
      tableLoading: true,
      total: 0,
    };
    this.getReportList({ page: 1 });
  }

  /**
   * 请求后端接口函数
   */
  getReportList = (payload: any) => {
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

  deleteReport = (payload: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/deleteReport',
      payload,
      callback: () => {
        console.log('deleteReport');
        /**
         * todo
         * 删除成功
         * 删除失败
         */
      },
    });
  };

  /**
   * 删除功能
   */

  handleDeleteOk = (record: any) => {
    // console.log(record);
    this.deleteReport(record.id);
  };

  /**
   *待开发功能
   */
  showDetailModal = () => {
    message.info('功能开发中');
  };

  render() {
    const { currentReport, tableLoading, total } = this.state;
    const { reportList } = this.props;

    const actionConfig = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '240px',
      render: (text, record) => (
        <div key={record.id}>
          <Button
            type="primary"
            icon={<ProfileOutlined />}
            onClick={this.showDetailModal}
          >
            {' '}
            详情
          </Button>
          <Popconfirm
            title="确定删除?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => this.handleDeleteOk(record)}
          >
            <Button type="primary" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    };
    const columnsConfig = [...config, actionConfig];
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
            ></Table>
          </Card>
        </>
      );
    }
    return null;
  }
}

export default ViewReport;
