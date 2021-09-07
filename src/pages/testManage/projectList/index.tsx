import React from 'react';
import {
  Col,
  Row,
  Card,
  Select,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Space,
  Popconfirm,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import '/src/styles/global.less';
import editTextModal from '../debugTalk/editTextModal';

//获取接口参数

class ProjectList extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    //模态框中的提交按钮
    this.handleSubmit = this.handleSubmit.bind(this);
    //项目列表的删除按钮
    this.handleDelete = this.handleDelete.bind(this);
    //模态框中的取消按钮
    this.handleCancel = this.handleCancel.bind(this);
    //显示添加按钮
    this.showAddModal = this.showAddModal.bind(this);
    //项目增加的改变监听
    this.handleAddValueChange = this.handleAddValueChange.bind(this);
    //显示编辑按钮
    this.showEditModal = this.showEditModal.bind(this);
    //项目编辑的改变监听
    this.handleEditValueChange = this.handleEditValueChange.bind(this);
    //编辑提交按钮
    this.editSubmit = this.editSubmit.bind(this);
    //编辑取消按钮
    this.editCancel = this.editCancel.bind(this);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempAddValue: '',
      //人工重新编辑的表单的值
      tempEditValue: '',
      //选择按钮的那一项的原始值
      currentValue: '',
      tableLoading: true,
      //总条数
      total: 0,
    };
  }

  //获取列表
  componentDidMount() {
    this.setState({
      tableLoading: true,
    });
    this.props.dispatch({
      type: 'projectList/getProjectList',
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
  /* =======================新增按钮及模态框功能=========================== */

  //添加项目，打开模态框
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  //添加项目模态框的返回键
  handleCancel = () => {
    this.setState({
      addVisible: false,
    });
  };

  //添加项目中监听所有值的变化
  handleAddValueChange(singleValueChange, ValueChange) {
    console.log('ValueChange', ValueChange);
    this.setState({
      tempAddValue: ValueChange,
    });
  }

  //在添加项目的模态框中点击提交按钮
  handleSubmit() {
    const addProject = this.state.tempAddValue;
    this.setState({
      addVisible: false,
    });
    this.props.dispatch({
      type: 'projectList/addProjectList',
      payload: {
        ...addProject,
      },
      callback: () => {
        this.props.dispatch({
          type: 'projectList/getProjectList',
          payload: {
            page: 1,
          },
        });
      },
    });
  }

  /* =======================编辑功能=========================== */

  //编辑的地方弹出模态框
  showEditModal(_, record) {
    this.setState({
      editVisible: true,
      currentValue: record,
    });
  }

  //修改项目模态框的返回键
  editCancel() {
    this.setState({
      editVisible: false,
    });
  }

  //编辑内容的变化监听
  handleEditValueChange(singleValueChange, ValueChange) {
    this.setState({
      tempEditValue: ValueChange,
    });
  }

  //项目列表单每一项的编辑提交
  editSubmit(value: any) {
    const { tempEditValue, currentValue } = this.state;
    this.setState({
      editVisible: false,
    });
    this.props.dispatch({
      type: 'projectList/editProjectList',
      payload: {
        ...tempEditValue,
        id: currentValue.id,
      },
      callback: () => {
        this.props.dispatch({
          type: 'projectList/getProjectList',
          payload: {
            page: 1,
          },
        });
      },
    });
  }

  /*=============================删除功能==================================*/

  //项目表单每一项中的删除按钮
  handleDelete(record: any) {
    this.props.dispatch({
      type: 'projectList/deleteProjectList',
      payload: {
        id: record.id,
      },
      callback: () => {
        this.props.dispatch({
          type: 'projectList/getProjectList',
          payload: {
            page: 1,
          },
        });
      },
    });
  }

  render() {
    const { projectList } = this.props.projectList;
    //为数组中每一个元素增加一个key值，防止报错
    projectList.map((item) => {
      item.key = item.id;
    });
    const { addVisible, editVisible, currentValue, tableLoading, total } =
      this.state;
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      total: total,
      showTotal: () => `共${total}条`,
    };

    const columns: any = [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '项目名称',
        dataIndex: 'project_name',
        key: 'project_name',
        align: 'center',
      },
      {
        title: '模块数',
        dataIndex: 'module_count',
        key: 'modelNum',
        align: 'center',
      },
      {
        title: '测试数',
        dataIndex: 'testcase_count',
        key: 'testcase_count',
        align: 'center',
      },
      {
        title: '负责人',
        dataIndex: 'leader',
        key: 'leader',
        align: 'center',
      },
      {
        title: '测试人员',
        dataIndex: 'test_user',
        key: 'test_user',
        align: 'center',
      },
      {
        title: '开发人员',
        dataIndex: 'dev_user',
        key: 'dev_user',
        align: 'center',
      },
      {
        title: '简要描述',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'relateAction',
        key: 'relateAction',
        align: 'center',
        width: '100px',
        render: (text, record: any) => {
          return (
            <div className="action_button">
              <Button
                type="primary"
                onClick={() => this.showEditModal(text, record)}
                icon={<EditOutlined />}
                shape="round"
                size="small"
              >
                编辑
              </Button>
              <Popconfirm
                title="Are you 确定？"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => this.handleDelete(record)}
              >
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  shape="round"
                  size="small"
                >
                  删除
                </Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Card>
          <div className="ant-btn-add">
            <Button
              type="primary"
              onClick={this.showAddModal}
              icon={<PlusCircleOutlined />}
              shape="round"
            >
              新增
            </Button>
          </div>
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={[...projectList]}
            loading={tableLoading}
            pagination={paginationProps}
            bordered
          />
        </Card>

        <Modal
          visible={addVisible}
          title="项目信息"
          closable={true}
          maskClosable={false}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          okText="确认"
          okButtonProps={{ shape: 'round' }}
          cancelButtonProps={{ shape: 'round' }}
        >
          <Form
            name="basic_projectList"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
            onValuesChange={this.handleAddValueChange}
          >
            <Form.Item
              label="项目名称"
              name="project_name"
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="负责人"
              name="leader"
              rules={[{ required: true, message: '请输入负责人名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="简要描述"
              name="description"
              rules={[{ required: false }]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Form>
        </Modal>

        {/* 这里仔细看下 */}

        {editVisible && (
          <Modal
            visible={editVisible}
            title="修改项目信息"
            closable={true}
            maskClosable={false}
            onOk={this.editSubmit}
            onCancel={this.editCancel}
            okText="确认"
            okButtonProps={{ shape: 'round' }}
            cancelButtonProps={{ shape: 'round' }}
          >
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onValuesChange={this.handleEditValueChange}
            >
              <Form.Item
                label="项目名称"
                name="project_name"
                rules={[{ required: true, message: '请输入项目名称' }]}
                initialValue={currentValue.project_name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="负责人"
                name="leader"
                rules={[{ required: true, message: '请输入负责人名称' }]}
                initialValue={currentValue.leader}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="简要描述"
                name="description"
                rules={[{ required: false }]}
                initialValue={currentValue.description}
              >
                <TextArea rows={3} />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </div>
    );
  }
}

export default connect(({ projectList }) => ({
  projectList,
}))(ProjectList);
