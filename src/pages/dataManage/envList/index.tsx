import React, { Component } from 'react';
// import { getEnvList } from '@/services/dataManage/envList';
import { Space, Button, Card, Table, Modal, Switch, Form, Input } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';

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
      // 新增环境列表数据
      addEnvListData: {},
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
                  this.handleEdit(text, record);
                }}
              >
                环境信息
              </Button>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  this.handleEdit(text, record);
                }}
              >
                编辑
              </Button>
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                  this.handleDelete(text, record);
                }}
              >
                删除
              </Button>
            </Space>
          ),
        },
      ],
    };
    this.getEnvList({ page: 1 });
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
  render() {
    const { selectedRowKeys, columns, addModalVisiable } = this.state;
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
        {/* <Modal
          title="编辑"
          visible={this.state.editModalVisiable}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={1200}
        >
        </Modal> */}
        <Modal
          title="新增"
          visible={addModalVisiable}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
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
      </>
    );
  }
}
