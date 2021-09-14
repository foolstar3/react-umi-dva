import React from 'react';
import {
  Row,
  Card,
  Select,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Space,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';
import Editor from '@/components/Editor';

class DebugTalkList extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      editVisible: false,
      //debugTalk的内容值
      debugTalkContent: '',
      //操作的那一项debugTalk
      debugTalkId: '',
      tableLoading: true,
      total: 0,
    };
    //显示代码输入框
    this.showPythonModal = this.showPythonModal.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.showEditModalCancel = this.showEditModalCancel.bind(this);
    this.getEditorContent = this.getEditorContent.bind(this);
  }

  componentDidMount() {
    this.setState({
      tableLoading: true,
    });
    this.props.dispatch({
      type: 'debugTalkList/getDebugTalkList',
      payload: {
        page: 1,
      },
      callback: (res) => {
        this.setState({
          tableLoading: false,
          total: res.results.length,
        });
      },
    });
  }

  editSubmit() {
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
        this.props.dispatch({
          type: 'debugTalkList/getDebugTalkList',
          payload: {
            page: 1,
          },
        });
      },
    });
    this.showEditModalCancel();
  }

  showPythonModal(record: any) {
    this.setState({
      editVisible: true,
      debugTalkId: record.id,
    });
  }

  getEditorContent(editContent: any) {
    this.setState({
      debugTalkContent: editContent,
    });
  }
  showEditModalCancel() {
    this.setState({
      editVisible: false,
    });
  }

  render() {
    const { tableLoading, total, editVisible } = this.state;
    const { debugTalkList } = this.props.debugTalkList;
    debugTalkList.map((item) => {
      item.key = item.id;
    });
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      total: total,
      showTotal: () => `共 ${total} 条`,
    };

    const columns: any = [
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
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        width: '300px',
      },
      {
        title: '更新时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
        width: '300px',
      },
      {
        title: '操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        width: '100px',
        render: (text: any, record: any) => {
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
                // content={debugTalkContent}
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
