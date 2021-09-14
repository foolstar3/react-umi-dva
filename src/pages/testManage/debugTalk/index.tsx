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
import EditTextModal from './debugTalkEditor';

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
    //模态框显隐控制按钮
    this.showEditModal = this.showEditModal.bind(this);
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

  showPythonModal(record: any) {
    this.setState({
      editVisible: true,
      debugTalkId: record.id,
      debugTalkContent: record.debugtalk,
    });
    console.log('this.state', this.state);
  }

  showEditModal(childPythonState: any) {
    this.setState({
      editVisible: childPythonState,
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
              <EditTextModal
                debugTalkContent={this.state.debugTalkContent}
                debugTalkId={this.state.debugTalkId}
              />
              <div className="debug_button">
                <Row>
                  <Button>取消</Button>
                  <Button shape="round" type="primary">
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
