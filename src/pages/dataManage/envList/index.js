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
  message,
  Select,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  FileSearchOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import Editor from '@/components/Editor';
import SearchBox from './searchBox';
import { DateFormat } from '@/utils/common';

import './index.less';
import { connect } from 'umi';
import { Row } from 'antd/lib/grid';

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

class EnvList extends Component {
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
          title: '项目名称',
          dataIndex: 'project_name',
          key: 'project_name',
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
          title: '环境状态',
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
                checked={text}
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
          render: (text) => {
            const time = DateFormat(text);
            return <span>{time}</span>;
          },
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          key: 'update_time',
          width: 200,
          align: 'center',
          render: (text) => {
            const time = DateFormat(text);
            return <span>{time}</span>;
          },
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
                okText="Yes"
                cancelText="No"
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
      currentPage: 1,
      searchWords: {},
    };
  }
  formRef = React.createRef();

  validate = (formValues) => {
    console.log(formValues);
    if (
      Object.keys(formValues).indexOf('env_name') === -1 ||
      formValues.env_name === '' ||
      formValues.env_name === undefined
    ) {
      message.info('环境名称不能为空');
      return false;
    }
    if (
      Object.keys(formValues).indexOf('base_url') === -1 ||
      formValues.base_url === '' ||
      formValues.base_url === undefined
    ) {
      message.info('环境地址不能为空');
      return false;
    }
    if (
      Object.keys(formValues).indexOf('project') === -1 ||
      formValues.project === '' ||
      formValues.project === undefined
    ) {
      message.info('项目名称不能为空');
      return false;
    }
    return true;
  };
  componentDidMount() {
    this.getEnvList({ page: 1 });
    this.getProjectList({ page: 'None' });
  }

  //获取项目名称列表
  getProjectList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'projectList/getProjectList',
      payload,
      callback: () => {},
    });
  };

  onSearch = (payload) => {
    this.getEnvList({ page: 1, ...payload });
    this.setState({
      currentPage: 1,
      searchWords: payload,
    });
  };

  onReset = () => {
    this.setState({
      searchWords: {},
    });
  };
  /* ============table功能============== */

  // 监听table选中的列发生变化的函数
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  // 获取table数据的函数
  getEnvList = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'envList/getEnvList',
      payload,
      callback: (res) => {
        this.setState({
          total: res.count,
        });
      },
    });
  };

  /* ============switch状态功能============== */

  // 监听switch状态变化
  onSwitchChange = (checked, text, record) => {
    this.toggleSwitch({ ...record, is_valid: checked });
  };

  // 调用接口切换switch状态
  toggleSwitch = (record) => {
    const { dispatch } = this.props;
    const { currentPage } = this.state;
    dispatch({
      type: 'envList/toggleSwitch',
      payload: record,
      callback: (res) => {
        /*todo
        判断是否成功返回数据
        成功则提示切换状态成功
        失败则提示切换状态失败 */
        if (res.code && res.code === 'U000000') {
          this.getEnvList({ page: currentPage });
          message.success(res.message);
        } else {
          message.error(res.message);
        }
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
    if (this.validate(payload)) {
      // 发送请求
      this.addEnvListData(payload);
      this.setState({
        addModalVisiable: false,
      });
    }
  };

  handleAddFormValueChange = (av) => {
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
        if (res.code && res.code !== 'U000400') {
          // 添加成功
          this.formRef.current.resetFields();
          message.success(res.message);
          this.getEnvList({ page: 1 });
          this.setState({
            currentPage: 1,
          });
        } else {
          message.error(res.message);
        }
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
        this.getEnvList({ page: 1 });
        this.setState({
          currentPage: 1,
        });
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
        message.success(res.message);
        this.getEnvList({ page: 1 });
        this.setState({
          currentPage: 1,
        });
      },
    });
  };

  // 弹出编辑对话框
  showEditModal = (text, record) => {
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
    const { editEnvListData, currentEnvInfo } = this.state;
    // 包装请求数据
    const payload = {
      ...editEnvListData,
      id: currentEnvInfo.id,
    };
    if (this.validate(payload)) {
      this.updateEnv(payload);
      this.setState({
        editModalVisiable: false,
      });
    }
  };

  // 取消编辑
  handleEditCancel = () => {
    this.setState({
      editModalVisiable: false,
    });
  };

  /** ============环境信息对话框=========== */
  // 弹出环境信息对话框
  showEnvInfoModal = (record) => {
    this.setState({
      envInfoModalVisiable: true,
      currentEnvInfo: record,
      editorCode: record.env_vars,
      envInfoInitCode: record.env_vars,
    });
  };

  handleEnvInfoOk = () => {
    const { editorCode, currentEnvInfo } = this.state;
    const payload = {
      ...currentEnvInfo,
      env_vars: editorCode,
    };
    this.updateEnv(payload);
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
      total,
      currentPage,
      envInfoInitCode,
    } = this.state;
    const { envList, tableLoading, projectList } = this.props;
    if (envList !== undefined && envList.length) {
      // 为envList数组中的每个元素添加一个key属性
      envList.map((item) => {
        item.key = item.id;
      });
    }
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      current: currentPage,
      onChange: (page) => {
        this.setState({
          currentPage: page,
        });
        this.getEnvList({ page, ...this.state.searchWords });
      },
      total: total,
      showTotal: () => `共 ${total} 条`,
    };
    // const rowSelection = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChange,
    // };
    return (
      <>
        {!envInfoModalVisiable && (
          <Card bordered={false}>
            <SearchBox
              projectOptions={projectList}
              onSearch={this.onSearch}
              onReset={this.onReset}
            />
            <div className="ant-btn-add">
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={this.showAddEnvModal}
                shape="round"
                size="small"
              >
                新增
              </Button>
            </div>
            <Table
              columns={columns}
              // rowSelection={rowSelection}
              dataSource={envList}
              loading={tableLoading}
              pagination={paginationProps}
              bordered
            />
          </Card>
        )}
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
            ref={this.formRef}
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

            <Form.Item
              name="project"
              label="项目名称"
              rules={[{ required: true, message: '请选择项目名称!' }]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {projectList.length &&
                  projectList.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.project_name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item name="is_valid" label="状态" valuePropName="checked">
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

              <Form.Item
                name="project"
                label="项目名称"
                rules={[{ required: true, message: '请选择项目名称!' }]}
              >
                <Select>
                  {projectList.length &&
                    projectList.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.project_name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item name="is_valid" label="状态" valuePropName="checked">
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
          <Card bordered={false}>
            <Editor
              content={envInfoInitCode}
              getEditorContent={this.editorCodeChange}
            />
            <div className="debug_button">
              <Row>
                <Button onClick={this.handleEnvInfoCancel}>取消</Button>
                <Button
                  onClick={this.handleEnvInfoOk}
                  shape="round"
                  type="primary"
                >
                  确认
                </Button>
              </Row>
            </div>
          </Card>
        )}
      </>
    );
  }
}

export default connect(({ envList, loading, projectList }) => ({
  envList: envList.envList,
  projectList: projectList.projectList,
  tableLoading: loading.effects['envList/getEnvList'],
}))(EnvList);
