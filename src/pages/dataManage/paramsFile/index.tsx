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
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { connect } from 'umi';
import { FormInstance } from 'antd/lib/form';
import { addFile } from '@/services/getParmsFile';
import Editor from '@/pages/examples/editor';
import './index.less';
const { Option } = Select;

@connect(({ paramsFile }) => ({
  paramsFileData: paramsFile.paramsFileList,
  paramsFileCode: paramsFile.paramsFileCode,
}))
export default class ParamsFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 参数文件表格源数据
      paramsFileData: [],
      // 编辑对话框显隐
      editModalVisiable: false,
      // 添加对话框显隐
      addModalVisiable: false,
      // 参数文件表格列配置
      columns: [
        {
          title: '#',
          dataIndex: 'index',
          key: 'index',
        },
        {
          title: '项目名称',
          dataIndex: 'project_name',
          key: 'project_name',
        },
        {
          title: '文件名称',
          dataIndex: 'file_name',
          key: 'file_name',
        },
        {
          title: '上传人员',
          dataIndex: 'upload_staff',
          key: 'upload_staff',
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
          render: (text, record) => (
            <Space size="middle">
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
      // 新增文件数据
      addFileData: {
        project_name: '',
        uploadFile: [],
      },
      currentEditParamsFile: {},
    };

    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileListData',
      callback: (res) => {
        // console.log(res);
      },
    });
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
  }

  // 处理编辑函数
  handleEdit = (text, record) => {
    // console.log(text);
    this.setState(() => ({
      currentEditParamsFile: text,
      editModalVisiable: true,
    }));
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileCode',
      payload: text,
    });
    // console.log(this.state.currentEditParamsFile);
  };

  // 处理删除函数
  handleDelete = (text) => {
    console.log(text, 'text');
    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/deleteFile',
      payload: text.key,
    });
  };

  // 处理编辑对话框显隐函数
  handleEditOk = () => {
    this.setState({
      editModalVisiable: false,
    });
  };

  handleEditCancel = () => {
    this.setState({
      editModalVisiable: false,
    });
  };

  handleAddOk = () => {
    console.log(this.state.addFileData);
    // 将新增的文件数据发送给后端
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'paramsFile/addFile',
    //   payload: this.state.addFileData
    // })
    addFile(this.state.addFileData).then((res) => {
      alert(res);
    });
    this.setState({
      addModalVisiable: false,
    });
    // 更新后重新获取table中的数据
    dispatch({
      type: 'paramsFile/getParamsFileListData',
      callback: (res) => {
        // console.log(res);
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

  onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 文件上传
  normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleAddFormValueChange = (av) => {
    console.log(av);
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
    return (
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
          name="project_name"
          label="项目名称"
          rules={[{ required: true, message: '请输入项目名称!' }]}
        >
          <Select
            placeholder="请选择"
            // onChange={this.handle}
            allowClear
          >
            {this.props.paramsFileData.map((item) => {
              return (
                <Option value={item.project_name} key={item.index}>
                  {item.project_name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="uploadFile"
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
    );
  };
  componentDidMount() {}
  render() {
    const { columns, editModalVisiable, addModalVisiable } = this.state;
    const { paramsFileData, paramsFileCode } = this.props;
    // console.log(this.props.paramsFileCode);
    return (
      <>
        <Card bordered={false}>
          <Table columns={columns} dataSource={paramsFileData} />
          <div className="btn-postion">
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={this.handleAddFile}
            >
              新增
            </Button>
          </div>
        </Card>
        <Modal
          title="编辑"
          visible={editModalVisiable}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          width={1200}
        >
          {/* <Editor content={paramsFileCode} /> */}
          {/* {this.renderEditForm(this.state.currentEditParamsFile)} */}
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
