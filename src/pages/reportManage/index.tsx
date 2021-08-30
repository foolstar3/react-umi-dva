import React, { Component } from 'react';
import { Table, Button, Card, message } from 'antd';
import { DeleteOutlined, ProfileOutlined } from '@ant-design/icons';
import DeleteModal from '@/components/DeleteModal';
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
      deleteModalVisiable: false,
      currentReport: {},
      tableLoading: true,
    };
    this.getReportList({ page: 1 });
  }
  /**
   * 请求后端接口函数
   */
  getReportList = (payload: any) => {
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
        });
      },
    });
  };

  deleteReport = (payload: any) => {
    const { dispatch } = this.props;
    console.log(payload);
    // !!!!!dispatch失败
    dispatch({
      type: 'report/deleteReport',
      payload,
      callback: () => {
        console.log('deleteReport');
      },
    });
  };

  /**
   * 删除功能
   */

  // 展示删除弹窗
  showDeleteModal = (record: any) => {
    this.setState({
      deleteModalVisiable: true,
      currentReport: record,
    });
  };

  handleDeleteOk = (record: any) => {
    this.deleteReport(record.id);
    this.setState({
      deleteModalVisiable: false,
    });
  };

  handleDeleteCancel = () => {
    this.setState({
      deleteModalVisiable: false,
    });
  };

  /**
   *待开发功能
   */
  showDetailModal = () => {
    message.info('功能开发中');
  };

  render() {
    const { deleteModalVisiable, currentReport, tableLoading } = this.state;
    const { reportList } = this.props;

    const actionConfig = {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: '240px',
      render: (text, record) => (
        <>
          <Button
            type="primary"
            icon={<ProfileOutlined />}
            onClick={this.showDetailModal}
          >
            {' '}
            详情
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => {
              this.showDeleteModal(record);
            }}
            danger
          >
            删除
          </Button>
        </>
      ),
    };
    const columnsConfig = [...config, actionConfig];
    const paginationProps = {
      showQuickJumper: true,
      total: reportList.count,
    };

    // console.log(currentReport);
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
          <DeleteModal
            isModalVisible={deleteModalVisiable}
            onOk={() => this.handleDeleteOk(currentReport)}
            onCancel={this.handleDeleteCancel}
          />
        </>
      );
    }
    return null;
  }
}

export default ViewReport;
