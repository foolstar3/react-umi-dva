import React from 'react';
import { Row, Card, Table, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import './index.less';
import { DateFormat } from '@/utils/common';
import Editor from '@/components/Editor';

class DebugTalkList extends React.Component {
  constructor(props) {
    super(props);
    this.hasPermission = JSON.parse(
      localStorage.getItem('qc_permissions'),
    ).debugTalk.length;
    this.state = {
      editVisible: false,
      debugTalkContent: '',
      debugTalkId: '',
      tableLoading: true,
      total: 0,
      debugTalkValue: '',
      currentPage: 1,
    };
  }

  componentDidMount() {
    this.setState({
      tableLoading: true,
    });
    this.getDebugTalkList({ page: 1 });
  }

  getDebugTalkList = (payload) => {
    this.props.dispatch({
      type: 'debugTalkList/getDebugTalkList',
      payload,
      callback: (res) => {
        this.setState({
          tableLoading: false,
          total: res.count,
        });
      },
    });
  };
  onPageChange = (page) => {
    this.getDebugTalkList({ page });
    this.setState({
      currentPage: page,
    });
  };
  editSubmit = () => {
    const { debugTalkId, debugTalkContent } = this.state;
    this.setState({
      editVisible: false,
    });
    this.props.dispatch({
      type: 'debugTalkList/editSubmit',
      payload: {
        id: debugTalkId,
        debugtalk: debugTalkContent,
      },
      callback: () => {
        this.getDebugTalkList({ page: 1 });
        this.setState({
          currentPage: 1,
        });
      },
    });
    this.showEditModalCancel();
  };

  showPythonModal = (record) => {
    this.setState({
      editVisible: true,
      debugTalkId: record.id,
      debugTalkValue: record.debugtalk,
    });
  };

  getEditorContent = (editContent) => {
    this.setState({
      debugTalkContent: editContent,
    });
  };
  showEditModalCancel = () => {
    this.setState({
      editVisible: false,
    });
  };

  render() {
    const { tableLoading, total, editVisible, currentPage } = this.state;
    const { debugTalkList } = this.props?.debugTalkList;
    debugTalkList &&
      debugTalkList.map((item) => {
        item.key = item.id;
      });
    const paginationProps = {
      current: currentPage,
      showSizeChanger: false,
      showQuickJumper: true,
      pagesize: 10,
      onChange: (page) => {
        this.onPageChange(page);
      },
      total: total,
      showTotal: () => `共 ${total} 条`,
    };

    const columns = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: '80px',
      },
      {
        title: '项目名称',
        dataIndex: 'project_name',
        key: 'project_name',
        align: 'center',
      },
      {
        title: 'Debugtalk',
        dataIndex: 'debugtalk',
        key: 'Debugtalk',
        align: 'center',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        width: '300px',
        render: (text) => {
          const time = DateFormat(text);
          return <span>{time}</span>;
        },
      },
      {
        title: '更新时间',
        dataIndex: 'update_time',
        key: 'update_time',
        align: 'center',
        width: '300px',
        render: (text) => {
          const time = DateFormat(text);
          return <span>{time}</span>;
        },
      },
      {
        title: '操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        width: '100px',
        render: (text, record) => {
          return (
            <div>
              <Space size="middle">
                <Button
                  type="primary"
                  onClick={() => this.showPythonModal(record)}
                  icon={<EditOutlined />}
                  shape="round"
                  size="small"
                >
                  编辑
                </Button>
              </Space>
            </div>
          );
        },
      },
    ];
    this.hasPermission ? '' : columns.pop();
    return (
      <div>
        <Card>
          {!editVisible && (
            <Table
              className="components-table-demo-nested"
              columns={columns}
              dataSource={[...debugTalkList]}
              loading={tableLoading}
              pagination={paginationProps}
              bordered
            />
          )}

          {editVisible && (
            <div>
              <Editor
                content={this.state.debugTalkValue}
                getEditorContent={this.getEditorContent}
              />
              <div className="debug_button">
                <Row>
                  <Button onClick={this.showEditModalCancel}>取消</Button>
                  <Button
                    onClick={this.editSubmit}
                    shape="round"
                    type="primary"
                  >
                    确认
                  </Button>
                </Row>
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

export default connect(({ debugTalkList }) => ({
  debugTalkList,
}))(DebugTalkList);
