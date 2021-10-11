import React from 'react';
import {
  message,
  Select,
  Card,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Popconfirm,
  FormInstance,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
const { Option } = Select;
import '/src/styles/global.less';
import SearchProject from './search';
import { DateFormat } from '@/utils/common';

class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addVisible: false,
      editVisible: false,
      tempAddValue: '',
      tempEditValue: '',
      tempDisplayEditValue: '',
      currentValue: '',
      tableLoading: true,
      total: 0,
      leaderList: [],
      currentPage: 1,
      project_name: '',
      description: '',
    };
  }

  formRef = React.createRef();

  UNSAFE_componentWillMount() {
    this.props.dispatch({
      type: 'userList/getUserList',
      callback: (res) => {
        this.setState({
          leaderList: res,
        });
      },
    });
    this.setState({
      tableLoading: true,
    });
    this.getProjectList({ page: 1 });
  }

  getProjectList = (payload) => {
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload,
      callback: (res, rescount) => {
        this.setState({
          tableLoading: false,
          total: rescount,
        });
      },
    });
  };
  onPageChange = (page) => {
    const payload = {
      page: page,
      project_name: this.state.project_name,
      description: this.state.description,
    };

    this.getProjectList(payload);
    this.setState({
      currentPage: page,
    });
  };
  handleSearchChildren = (project_name, description) => {
    this.setState({
      project_name: project_name,
      description: description,
    });
  };
  onResetPage = () => {
    this.setState({
      currentPage: 1,
    });
  };

  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };

  handleCancel = () => {
    this.onReset();
    this.setState({
      addVisible: false,
    });
  };
  onReset() {
    this.formRef.current == null
      ? this.formRef.current.resetFields()
      : this.formRef.current.resetFields();
  }

  handleAddValueChange = (singleValueChange, ValueChange) => {
    const leaderList = this.state.leaderList;
    for (let i = 0; i < leaderList.length; i++) {
      if (ValueChange.leader && leaderList[i].username === ValueChange.leader) {
        ValueChange.leader = leaderList[i].id;
      }
    }
    this.setState({
      tempAddValue: ValueChange,
    });
  };

  handleSubmit = () => {
    const addProject = this.state.tempAddValue;
    const total = this.state.total;

    if (addProject.project_name && addProject.leader) {
      this.props.dispatch({
        type: 'projectList/addProjectList',
        payload: {
          ...addProject,
        },
        callback: (res) => {
          this.setState({
            total: total + 1,
            currentPage: 1,
          });
          message.success(res.message);
          this.getProjectList({ page: 1 });
        },
      });
      this.setState({
        addVisible: false,
      });
      this.onReset();
    } else {
      message.warn('请输入必填字段！');
    }
  };

  showEditModal = (_, record) => {
    this.setState({
      editVisible: true,
      currentValue: record,
    });
  };

  editCancel = () => {
    this.setState({
      editVisible: false,
    });
  };

  handleEditValueChange = (singleValueChange, ValueChange) => {
    const leaderList = this.state.leaderList;
    for (let i = 0; i < leaderList.length; i++) {
      if (ValueChange.leader && leaderList[i].username === ValueChange.leader) {
        ValueChange.leader = leaderList[i].id;
      }
    }
    this.setState({
      tempEditValue: ValueChange,
    });
  };

  editSubmit = (value) => {
    const { tempEditValue, currentValue } = this.state;
    const payload = { ...tempEditValue, id: currentValue.id };
    if (tempEditValue.project_name && tempEditValue.leader) {
      this.props.dispatch({
        type: 'projectList/editProjectList',
        payload,
        callback: () => {
          this.getProjectList({ page: 1 });
          this.setState({
            currentPage: 1,
          });
        },
      });
      this.setState({
        editVisible: false,
      });
    } else {
      message.warn('请输入必填字段！');
    }
  };

  handleDelete = (record) => {
    this.props.dispatch({
      type: 'projectList/deleteProjectList',
      payload: {
        id: record.id,
      },
      callback: () => {
        this.getProjectList({ page: 1 });
        this.setState({
          currentPage: 1,
        });
      },
    });
  };

  render() {
    const { projectList } = this.props?.projectList || [];
    projectList.map((projectItem) => {
      projectItem.key = projectItem.id;
    });
    const { leaderList, currentPage } = this.state;
    const { addVisible, editVisible, currentValue, tableLoading, total } =
      this.state;
    const paginationProps = {
      current: currentPage,
      showSizeChanger: false,
      showQuickJumper: true,
      pageSize: 10,
      onChange: (page) => {
        this.onPageChange(page);
      },
      total: total,
      showTotal: () => `共${total}条`,
    };

    const columns = [
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
        dataIndex: 'leader_name',
        key: 'leader_name',
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
                okText="Yes"
                cancelText="No"
                title="确定删除？"
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
          <SearchProject
            getProjectList={this.getProjectList}
            handleSearchChildren={this.handleSearchChildren}
            onResetPage={this.onResetPage}
          />
          <div className="ant-btn-add">
            <Button
              type="primary"
              onClick={this.showAddModal}
              icon={<PlusCircleOutlined />}
              shape="round"
              size="small"
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
          title="新增"
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
            ref={this.formRef}
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
              {
                <Select
                  showSearch
                  allowClear
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  style={{ width: 314 }}
                  // onFocus={this.handleUserNameListVisible}
                >
                  {leaderList.map((item) => {
                    return (
                      <Option value={item.username} key={item.username}>
                        {item.username}
                      </Option>
                    );
                  })}
                </Select>
              }
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

        {editVisible && (
          <Modal
            visible={editVisible}
            title="编辑"
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
                initialValue={currentValue.leader_name}
              >
                {
                  <Select
                    style={{ width: 314 }}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {leaderList &&
                      Array.isArray(leaderList) &&
                      leaderList.length &&
                      leaderList.map((item) => {
                        return (
                          <Option value={item.username}>{item.username}</Option>
                        );
                      })}
                  </Select>
                }
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

export default connect(({ projectList, userList }) => ({
  projectList,
  userList,
}))(ProjectList);
