import React, { Component } from 'react';
import { Space, Button, Card, Table, Modal, Switch, Form, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import Editor from '@/pages/examples/editor';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

@connect(({ envList }) => ({
  envList: envList.envList,
}))
export default class EnvList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      // 新增对话框显隐
      addModalVisiable: false,
      // 删除对话框显隐
      deleteModalVisiable: false,
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
      // table列配置
      columns: [
        {
          title: '#',
          dataIndex: 'id',
          key: 'id',
          width: 50,
        },
        {
          title: '环境名称',
          dataIndex: 'env_name',
          key: 'env_name',
          width: 100,
        },
        {
          title: '环境地址',
          dataIndex: 'base_url',
          key: 'base_url',
          width: 200,
        },
        {
          title: '简要描述',
          dataIndex: 'description',
          key: 'description',
          textWrap: 'word-break',
          ellipsis: true,
          width: 100,
        },
        {
          title: '状态',
          dataIndex: 'is_valid',
          key: 'is_valid',
          width: 150,
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
        },
        {
          title: '操作',
          key: 'action',
          width: 300,
          render: (text, record) => (
            <Space size="middle">
              <Button
                type="primary"
                icon={<FileSearchOutlined />}
                onClick={() => {
                  this.showEnvInfoModal(text, record);
                }}
              >
                环境信息
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  this.showEditModal(text, record);
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                  this.showDeleteModal(text, record);
                }}
              >
                删除
              </Button>
            </Space>
          ),
        },
      ],
    };
    this.getEnvList();
  }

  /* ============table功能============== */

  // 监听table选中的列发生变化的函数
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  // 获取table数据的函数
  getEnvList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/getEnvList',
      payload,
    });
  };

  /* ============switch状态功能============== */

  // 监听switch状态变化
  onSwitchChange = (checked, text, record) => {
    this.toggleSwitch(record);
    console.log(checked);
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
        console.log(res);
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
        console.log(res);
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
    console.log(av);
    // 获取新增文件的数据
    this.setState(() => ({
      editEnvListData: av,
    }));
  };

  // 确认编辑
  handleEditOk = () => {
    console.log('handleEditOk');
    console.log(this.state.editEnvListData);
    const { editEnvListData, currentEnvInfo } = this.state;
    // 包装请求数据
    const payload = {
      ...editEnvListData,
      id: currentEnvInfo.id,
    };
    console.log(payload);
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
  showEnvInfoModal = () => {
    this.setState({
      envInfoModalVisiable: true,
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
  render() {
    const {
      selectedRowKeys,
      columns,
      addModalVisiable,
      deleteModalVisiable,
      currentEnvInfo,
      editModalVisiable,
      envInfoModalVisiable,
    } = this.state;
    const { envList } = this.props;
    // 为envList数组中的每个元素添加一个key属性
    envList.map((item) => {
      // console.log(item);
      item.key = item.id;
    });
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <>
        <Card bordered={false}>
          <Table
            columns={columns}
            rowSelection={rowSelection}
            dataSource={envList}
          />
          <div className="btn-postion">
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={this.showAddEnvModal}
            >
              新增
            </Button>
          </div>
        </Card>
        {/* 新增对话框 */}
        <Modal
          title="新增"
          visible={addModalVisiable}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
          okText="修改"
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
        {/* 删除对话框 */}
        <Modal
          title="删除"
          visible={deleteModalVisiable}
          onOk={() => {
            this.handleDeleteOk(currentEnvInfo);
          }}
          onCancel={this.handleDeleteCancel}
        >
          <div>确定删除{currentEnvInfo.env_name}?</div>
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
                  checked={currentEnvInfo.is_valid}
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
        {/* 环境信息编辑框 */}
        <Modal
          title="环境信息"
          visible={envInfoModalVisiable}
          onOk={this.handleEnvInfoOk}
          onCancel={this.handleEnvInfoCancel}
          width={1200}
        >
          {/* <Editor /> */}
          {/* {this.renderEditForm(this.state.currentEditParamsFile)} */}
        </Modal>
      </>
    );
  }
}
