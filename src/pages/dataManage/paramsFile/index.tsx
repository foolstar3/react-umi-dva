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
} from 'antd';
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Editor from '@/components/Editor';
import { connect } from 'umi';
import { FormInstance } from 'antd/lib/form';
// import Editor from '@/pages/examples/editor';
import './index.less';
const { Option } = Select;

// 新增项目对话框form布局配置
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const uploadConfig = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};
class ParamsFile extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      // 参数文件表格源数据
      paramsFileData: [],
      // 编辑对话框显隐
      editModalVisiable: false,
      // 添加对话框显隐
      addModalVisiable: false,
      // table加载中
      tableLoading: true,
      // 参数文件表格列配置
      columns: [
        {
          title: '#',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: '项目名称',
          dataIndex: 'project_name',
          key: 'project_name',
        },
        {
          title: '文件名称',
          dataIndex: 'file',
          key: 'file',
        },
        {
          title: '上传人员',
          dataIndex: 'author',
          key: 'author',
        },
        {
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
        },
        {
          title: '更新时间',
          dataIndex: 'update_time',
          key: 'update_time',
        },
        {
          title: '操作',
          key: 'action',
          width: 210,
          render: (text, record) => (
            <div className="actionColumn">
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

  componentWillMount() {
    this.getParamsFileList({ page: 1 });
  }

  getParamsFileList = (payload) => {
    this.setState({
      tableLoading: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileListData',
      payload,
      callback: (res) => {
        // console.log(res);
        const { paramsFileData } = this.props;
        // console.log(paramsFileData);
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
      editModalVisiable: true,
      editorCode: paramsFileCode.content,
    }));
    // console.log(this.state.currentEditParamsFile);
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
  };

  // 发起删除请求
  deleteParamsFile = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/deleteFile',
      payload,
    });
  };

  // 处理编辑对话框显隐函数
  handleEditOk = () => {
    const { editorCode, currentEditParamsFile } = this.state;
    const payload = {
      content: editorCode,
      id: currentEditParamsFile.id,
    };
    this.updateParamsFileCode(payload);
    this.setState({
      editModalVisiable: false,
    });
  };

  updateParamsFileCode = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/updateParamsFileCode',
      payload,
    });
  };

  handleEditCancel = () => {
    this.setState({
      editModalVisiable: false,
    });
  };

  handleAddOk = () => {
    // 将新增的文件数据发送给后端
    this.addFile();
    this.setState({
      addModalVisiable: false,
    });
    // 更新后重新获取table中的数据
    this.getParamsFileList({ page: 1 });
  };

  addFile = () => {
    const { dispatch } = this.props;
    const { addFileData } = this.state;
    dispatch({
      type: 'paramsFile/addFile',
      payload: addFileData,
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

  onFinish = (values: any) => {
    // console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };
  // 文件上传
  normFile = (e: any) => {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleAddFormValueChange = (av) => {
    // console.log(av);
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
  // 渲染编辑文件表单
  renderEditForm = (data) => {
    // console.log(data);
    return (
      <Form
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        onValuesChange={() => {
          console.log('change');
        }}
        initialValues={data}
      >
        <Form.Item
          label="项目名称"
          name="project_name"
          rules={[{ required: true, message: '请输入项目名称！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="文件名称"
          name="file_name"
          rules={[{ required: true, message: '请输入文件名称！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="上传人员"
          name="upload_staff"
          rules={[{ required: true, message: '请输入上传人员！' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };
  formRef = React.createRef<FormInstance>();
  // 渲染新增项目表单
  renderAddForm = () => {
    const { paramsFileData } = this.props;
    const { addModalVisiable } = this.state;
    return (
      addModalVisiable && (
        <Form
          {...this.layout}
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
              // onChange={this.handle}
              allowClear
            >
              {paramsFileData.results.map((item) => {
                return (
                  <Option value={item.project_name} key={item.index}>
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
            rules={[{ required: true }]}
          >
            <Upload {...this.uploadConfig}>
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
    } = this.state;
    const { paramsFileData, paramsFileCode } = this.props;
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      onChange: (page) => this.getParamsFileList({ page }),
      total: total,
      showTotal: () => `共 ${total} 条`,
    };
    return (
      <>
        <Card bordered={false}>
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
          />
        </Card>
        <Modal
          title="编辑"
          visible={editModalVisiable}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          width={1200}
        >
          <Editor
            content={paramsFileCode.content}
            getEditorContent={this.getEditorContent}
          />
        </Modal>
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

export default connect(({ paramsFile }) => ({
  paramsFileData: paramsFile.paramsFileList,
  paramsFileCode: paramsFile.paramsFileCode,
}))(ParamsFile);
