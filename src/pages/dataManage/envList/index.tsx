import React, { Component } from 'react';
import {
  Space,
  Button,
  Card,
  Table,
  Modal,
  Switch,
  Form,
  Input,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import Editor from '@/components/Editor';

import './index.less';
import { connect } from 'umi';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

@connect(({ envList }) => ({
  envList: envList.envList,
}))
export default class EnvList extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      // 新增对话框显隐
      addModalVisiable: false,
      // 编辑对话框显隐
      editModalVisiable: false,
      // 环境信息对话框显隐
      envInfoModalVisiable: false,
      // 当前选中的环境
      currentEnvInfo: {},
      // 新增环境列表数据
      addEnvListData: {},
      // 编辑环境列表数据
      editEnvListData: {},
      // table加载中
      tableLoading: true,
      // table列配置
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          key: 'id',
          width: 70,
          align: 'center',
        },
        {
          title: '环境名称',
          dataIndex: 'env_name',
          key: 'env_name',
          width: 120,
          align: 'center',
        },
        {
          title: '环境地址',
          dataIndex: 'base_url',
          key: 'base_url',
          // width: 200,
          align: 'center',
        },
        {
          title: '简要描述',
          dataIndex: 'description',
          key: 'description',
          textWrap: 'word-break',
          ellipsis: true,
          // width: 100,
          align: 'center',
        },
        {
          title: '状态',
          dataIndex: 'is_valid',
          key: 'is_valid',
          width: 100,
          align: 'center',
          render: (text, record, index) => {
            return (
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                defaultChecked={text}
                onChange={(checked) => {
                  this.onSwitchChange(checked, text, record);
                }}
                key={index}
              />
            );
          },
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
          width: 200,
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          render: (text, record) => (
            <div className="actionColumn">
              <Button
                type="primary"
                icon={<FileSearchOutlined />}
                onClick={() => {
                  this.showEnvInfoModal(record);
                }}
                size="small"
                shape="round"
              >
                环境信息
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  this.showEditModal(text, record);
                }}
                size="small"
                shape="round"
              >
                编辑
              </Button>
              <Popconfirm
                title="确定删除？"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => this.handleDeleteOk(text)}
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
        },
      ],
      editorCode: '',
      total: 0,
    };
  }

  UNSAFE_componentWillMount() {
    this.getEnvList({ page: 1 });
  }
  /* ============table功能============== */

  // 监听table选中的列发生变化的函数
  onSelectChange = (selectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 获取table数据的函数
  getEnvList = (payload) => {
    this.setState({ tableLoading: true });
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/getEnvList',
      payload,
      callback: () => {
        const { envList } = this.props;
        this.setState({
          tableLoading: false,
          total: envList.count,
        });
      },
    });
  };

  /* ============switch状态功能============== */

  // 监听switch状态变化
  onSwitchChange = (checked, text, record) => {
    this.toggleSwitch(record);
  };

  // 调用接口切换switch状态
  toggleSwitch = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/toggleSwitch',
      payload: record,
      callback: (res) => {
        /*todo
        判断是否成功返回数据
        成功则提示切换状态成功
        失败则提示切换状态失败 */
        console.log(res);
      },
    });
  };

  /* ============新增按钮及对话框功能============== */

  // 控制新增对话框显隐
  showAddEnvModal = () => {
    this.setState({
      addModalVisiable: true,
    });
  };

  // 取消新增
  handleAddCancel = () => {
    this.setState({
      addModalVisiable: false,
    });
  };

  // 确认新增
  handleAddOk = () => {
    /*todo
    获取form表单内容 */
    const { addEnvListData } = this.state;
    // 包装参数
    const payload = {
      ...addEnvListData,
      is_valid: addEnvListData.is_valid == false ? false : true,
    };
    console.log(payload);
    // 发送请求
    this.addEnvListData(payload);
    this.setState({
      addModalVisiable: false,
    });
  };

  handleAddFormValueChange = (av) => {
    console.log(av);
    // 获取新增文件的数据
    this.setState(() => ({
      addEnvListData: av,
    }));
  };

  // 添加新环境的函数
  addEnvListData = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/addEnvList',
      payload,
      callback: (res) => {
        // if (res) {
        //   // 添加成功
        // }
        this.getEnvList({ page: 1 });
        // console.log(res);
      },
    });
  };

  /* ==============删除对话框功能===================*/

  // 删除环境的函数
  deleteEnvListData = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/deleteEnvList',
      payload,
      callback: (res) => {
        // console.log(res);
        this.getEnvList({ page: 1 });
      },
    });
  };

  // 弹出删除对话框
  showDeleteModal = (text, record) => {
    this.setState({
      deleteModalVisiable: true,
      currentEnvInfo: record,
    });
  };

  // 取消删除操作
  handleDeleteCancel = () => {
    this.setState({
      deleteModalVisiable: false,
    });
  };

  // 确定删除
  handleDeleteOk = (record) => {
    this.deleteEnvListData({ id: record.id });
    this.setState({
      deleteModalVisiable: false,
    });
  };

  /* ==============编辑对话框功能===================*/
  // 编辑环境的函数
  updateEnv = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/updateEnv',
      payload,
      callback: (res) => {
        // console.log(res);
        this.getEnvList({ page: 1 });
      },
    });
  };

  // 弹出编辑对话框
  showEditModal = (text, record) => {
    console.log(record);
    this.setState({
      editModalVisiable: true,
      currentEnvInfo: record,
    });
  };

  // 编辑对话框内容变化
  handleEditFormValueChange = (av) => {
    // 获取新增文件的数据
    this.setState(() => ({
      editEnvListData: av,
    }));
  };

  // 确认编辑
  handleEditOk = () => {
    // console.log('handleEditOk');
    // console.log(this.state.editEnvListData);
    const { editEnvListData, currentEnvInfo } = this.state;
    // 包装请求数据
    const payload = {
      ...editEnvListData,
      id: currentEnvInfo.id,
    };
    // console.log(payload);
    this.updateEnv(payload);
    this.setState({
      editModalVisiable: false,
    });
  };

  // 取消编辑
  handleEditCancel = () => {
    console.log('handleEditCancel');
    this.setState({
      editModalVisiable: false,
    });
  };

  /** ============环境信息对话框=========== */
  // 弹出环境信息对话框
  showEnvInfoModal = (record) => {
    console.log(record);
    this.setState({
      envInfoModalVisiable: true,
      currentEnvInfo: record,
      editorCode: record.env_vars,
    });
  };

  handleEnvInfoOk = () => {
    this.setState({
      envInfoModalVisiable: false,
    });
  };

  handleEnvInfoCancel = () => {
    this.setState({
      envInfoModalVisiable: false,
    });
  };

  // 获取编辑器内容
  editorCodeChange = (value) => {
    // console.log(value);
    this.setState({
      editorCode: value,
    });
  };

  render() {
    const {
      selectedRowKeys,
      columns,
      addModalVisiable,
      currentEnvInfo,
      editModalVisiable,
      envInfoModalVisiable,
      tableLoading,
      editorCode,
      total,
    } = this.state;
    const { envList } = this.props;
    if (envList.results !== undefined) {
      // 为envList数组中的每个元素添加一个key属性
      envList.results.map((item) => {
        item.key = item.id;
      });
    }
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      onChange: (page) => {
        this.getEnvList({ page });
      },
      total: total,
      showTotal: () => `共 ${total} 条`,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <>
        <Card bordered={false}>
          <div className="btn-postion">
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={this.showAddEnvModal}
            >
              新增
            </Button>
          </div>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            dataSource={envList.results}
            loading={tableLoading}
            pagination={paginationProps}
            bordered
          />
        </Card>
        {/* 新增对话框 */}
        <Modal
          title="新增"
          visible={addModalVisiable}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          okText="确定"
        >
          <Form
            {...formItemLayout}
            onValuesChange={(cv, av) => {
              this.handleAddFormValueChange(av);
            }}
          >
            <Form.Item
              name="env_name"
              label="环境名称"
              rules={[{ required: true, message: '请输入环境名称!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="base_url"
              label="环境地址"
              rules={[{ required: true, message: '请输入环境地址!' }]}
            >
              <Input placeholder="http://127.0.0.1:8000/" />
            </Form.Item>

            <Form.Item name="description" label="简要描述">
              <Input />
            </Form.Item>

            <Form.Item name="is_valid" label="状态">
              <Switch
                checkedChildren="启用"
                unCheckedChildren="禁用"
                defaultChecked
              />
            </Form.Item>
          </Form>
          {/* {this.renderAddForm()} */}
        </Modal>
        {/* 编辑对话框 */}
        {editModalVisiable && (
          <Modal
            title="编辑"
            visible={editModalVisiable}
            onOk={() => {
              this.handleEditOk();
            }}
            onCancel={this.handleEditCancel}
            // width={1200}
          >
            <Form
              {...formItemLayout}
              onValuesChange={(cv, av) => {
                this.handleEditFormValueChange(av);
              }}
              initialValues={currentEnvInfo}
            >
              <Form.Item
                name="env_name"
                label="环境名称"
                rules={[{ required: true, message: '请输入环境名称!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="base_url"
                label="环境地址"
                rules={[{ required: true, message: '请输入环境地址!' }]}
              >
                <Input placeholder="http://127.0.0.1:8000/" />
              </Form.Item>

              <Form.Item name="description" label="简要描述">
                <Input />
              </Form.Item>

              <Form.Item name="is_valid" label="状态">
                <Switch
                  checkedChildren="启用"
                  unCheckedChildren="禁用"
                  defaultChecked={currentEnvInfo.is_valid}
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
        {/* 环境信息编辑框 */}
        {envInfoModalVisiable && (
          <Modal
            title="环境信息"
            visible={envInfoModalVisiable}
            onOk={this.handleEnvInfoOk}
            onCancel={this.handleEnvInfoCancel}
            width={1200}
          >
            <Editor
              content={editorCode}
              getEditorContent={(value) => this.editorCodeChange(value)}
            />
          </Modal>
        )}
      </>
    );
  }
}
