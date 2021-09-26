import React, { Component } from 'react';
import {
  Card,
  Table,
  Space,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  Upload,
  Popconfirm,
  message,
  Row,
} from 'antd';
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Editor from '@/components/Editor';
import { DateFormat } from '@/utils/common';
import { connect } from 'umi';
import { FormInstance } from 'antd/lib/form';
import './index.less';
const { Option } = Select;

// 新增项目对话框form布局配置
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

class ParamsFile extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      // 参数文件表格源数据
      paramsFileData: [],
      // 编辑对话框显隐
      editModalVisiable: false,
      // 添加对话框显隐
      addModalVisiable: false,
      // table加载中
      tableLoading: true,
      currentPage: 1,
      // 参数文件表格列配置
      columns: [
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
          title: '文件名称',
          dataIndex: 'file',
          key: 'file',
          align: 'center',
        },
        {
          title: '上传人员',
          dataIndex: 'author',
          key: 'author',
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
          title: '更新时间',
          dataIndex: 'update_time',
          key: 'update_time',
          align: 'center',
          render: (text) => {
            const time = DateFormat(text);
            return <span>{time}</span>;
          },
        },
        {
          title: '操作',
          key: 'action',
          width: 210,
          align: 'center',
          render: (text, record) => (
            <div key={record.id} className="actionColumn">
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
                title="确定删除?"
                onConfirm={() => this.confirmDelete(text)}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
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
      // 新增文件数据
      addFileData: {
        project: '',
        file: [],
      },
      currentEditParamsFile: {},
      editorCode: '',
      total: 0,
    };
  }

  componentDidMount() {
    this.getParamsFileList({ page: 1 });
    this.getProjectList({ page: 1 });
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

  getParamsFileList = (payload) => {
    this.setState({
      tableLoading: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileListData',
      payload,
      callback: (res) => {
        const { paramsFileData } = this.props;
        this.setState({
          tableLoading: false,
          total: paramsFileData.count,
        });
      },
    });
  };

  // 处理编辑函数
  showEditModal = (text, record) => {
    this.getParamsFileCode(text);
    const { paramsFileCode } = this.props;

    this.setState(() => ({
      currentEditParamsFile: text,
      editorCode: paramsFileCode.content,
      editModalVisiable: true,
    }));
  };

  getParamsFileCode = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileCode',
      payload: payload.id,
    });
  };
  // 处理删除函数
  confirmDelete = (text) => {
    this.deleteParamsFile(text);
    this.getParamsFileList({ page: 1 });
  };

  // 发起删除请求
  deleteParamsFile = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/deleteFile',
      payload,
      callback: () => {
        this.getParamsFileList({ page: 1 });
      },
    });
  };

  // 处理编辑对话框显隐函数
  handleEditOk = () => {
    const { editorCode, currentEditParamsFile } = this.state;
    const { paramsFileCode } = this.props;
    paramsFileCode.content = '';
    const payload = {
      content: editorCode,
      id: currentEditParamsFile.id,
    };
    this.updateParamsFileCode(payload);
    this.getParamsFileList({ page: 1 });
    this.setState({
      editModalVisiable: false,
      currentPage: 1,
    });
  };

  updateParamsFileCode = (payload) => {
    const { dispatch } = this.props;
    console.log(payload, dispatch);
    dispatch({
      type: 'paramsFile/updateParamsFileCode',
      payload,
      callback: (res) => {
        if (Object.keys(res).indexOf('status') !== -1) {
          message.error('更新失败');
        } else {
          message.success('编辑成功');
        }
      },
    });
  };

  handleEditCancel = () => {
    const { paramsFileCode } = this.props;
    paramsFileCode.content = '';
    this.setState({
      editModalVisiable: false,
    });
  };

  handleAddOk = () => {
    // 将新增的文件数据发送给后端
    this.addFile();
  };

  onPageChange = (page) => {
    this.getParamsFileList({ page });
    this.setState({
      currentPage: page,
    });
  };

  addFile = () => {
    const { dispatch } = this.props;
    const { addFileData, fileList } = this.state;
    const { project } = addFileData;
    // 上传文件必须先转换成FormData格式
    const formData = new FormData();
    if (!fileList.length) return message.error('请添加文件！');
    fileList.forEach((file) => {
      formData.append('file', file);
    });
    formData.append('project', project);
    dispatch({
      type: 'paramsFile/addFile',
      payload: formData,
      callback: (res) => {
        if (res.data) {
          message.success('添加成功');
          this.getParamsFileList({ page: 1 });
          this.setState({
            addModalVisiable: false,
          });
        } else if (res.status == 400) {
          message.error('项目下有同名文件,添加失败');
        }
      },
    });
  };

  handleAddCancel = () => {
    this.setState({
      addModalVisiable: false,
    });
  };

  handleAddFile = () => {
    this.setState({
      addModalVisiable: true,
    });
  };

  onFinish = (values: any) => {};

  onFinishFailed = (errorInfo: any) => {};
  // 文件上传
  normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleAddFormValueChange = (av) => {
    // 获取新增文件的数据
    this.setState(() => ({
      addFileData: av,
    }));
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  onFill = () => {
    this.formRef.current!.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  formRef = React.createRef<FormInstance>();
  // 渲染新增项目表单
  renderAddForm = () => {
    const { projectData } = this.props;
    const { addModalVisiable, fileList } = this.state;
    const uploadConfig = {
      // action: `${process.env.qcFrontUrl}/paramsfile/`,
      accept: '.csv',
      listType: 'text',
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 20) {
          message.error('文件大小不得超过20M！');
          return Upload.LIST_IGNORE;
        }
        if (file.name.split('.')[file.name.split('.').length - 1] != 'csv') {
          message.error('文件类型只能是CSV类型');
          return Upload.LIST_IGNORE;
        }
        this.setState((state) => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      addModalVisiable && (
        <Form
          {...layout}
          ref={this.formRef}
          name="control-ref"
          onValuesChange={(cv, av) => {
            this.handleAddFormValueChange(av);
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="project"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称!' }]}
          >
            <Select
              placeholder="请选择"
              allowClear
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {projectData.map((item) => {
                return (
                  <Option value={item.id} key={item.id}>
                    {item.project_name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="上传文件"
            valuePropName="fileList"
            getValueFromEvent={this.normFile}
            rules={[{ required: true, message: '请选择上传的文件!' }]}
          >
            <Upload {...uploadConfig}>
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>
        </Form>
      )
    );
  };

  getEditorContent = (value) => {
    this.setState({
      editorCode: value,
    });
  };

  render() {
    const {
      columns,
      editModalVisiable,
      addModalVisiable,
      tableLoading,
      total,
      currentPage,
    } = this.state;
    const { paramsFileData, paramsFileCode } = this.props;
    paramsFileData.results?.map((item) => {
      item.key = item.id;
    });
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      current: currentPage,
      onChange: (page) => this.onPageChange(page),
      total: total,
      showTotal: () => `共 ${total} 条`,
    };
    return (
      <>
        <Card bordered={false}>
          {!editModalVisiable && (
            <div>
              <div className="btn-postion">
                <Button
                  type="primary"
                  icon={<PlusCircleOutlined />}
                  onClick={this.handleAddFile}
                >
                  新增
                </Button>
              </div>
              <Table
                columns={columns}
                dataSource={paramsFileData.results}
                loading={tableLoading}
                pagination={paginationProps}
                bordered
              />
            </div>
          )}
          {editModalVisiable && (
            <div>
              <Editor
                content={paramsFileCode.content}
                getEditorContent={this.getEditorContent}
              />
              <div className="debug_button">
                <Row>
                  <Button onClick={this.handleEditCancel}>取消</Button>
                  <Button
                    onClick={this.handleEditOk}
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
        <Modal
          title="新增项目"
          visible={addModalVisiable}
          onOk={this.handleAddOk}
          onCancel={this.handleAddCancel}
        >
          {this.renderAddForm()}
        </Modal>
      </>
    );
  }
}

export default connect(({ paramsFile, projectList }) => ({
  paramsFileData: paramsFile.paramsFileList,
  paramsFileCode: paramsFile.paramsFileCode,
  projectData: projectList.projectList,
}))(ParamsFile);
