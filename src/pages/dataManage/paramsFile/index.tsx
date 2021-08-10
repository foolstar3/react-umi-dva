import React, { Component } from 'react';
import { Card, Table, Space, Button, Modal, Form, Input, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import { FormInstance } from 'antd/lib/form';

@connect(({ paramsFile }) => ({
  paramsFileData: paramsFile.paramsFileList,
}))
export default class ParamsFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 参数文件表格源数据
      paramsFileData: [],
      // 编辑对话框显隐
      editModalVisiable: false,
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
          title: 'Action',
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
                onClick={this.handleDelete}
              >
                删除
              </Button>
            </Space>
          ),
        },
      ],
      currentEditParamsFile: {},
    };
    // 将函数的this绑定到class组件上
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    const { dispatch } = this.props;
    dispatch({
      type: 'paramsFile/getParamsFileListData',
      callback: (res) => {
        // console.log(res);
      },
    });
  }
  // 处理编辑函数
  handleEdit = (text, record) => {
    // console.log(text);
    this.setState(() => ({
      currentEditParamsFile: text,
      editModalVisiable: true,
    }));
    // console.log(this.state.currentEditParamsFile);
  };
  handleDelete = () => {
    console.log('handleDelete');
  };
  handleOk = () => {
    this.setState({
      editModalVisiable: false,
    });
  };

  handleCancel = () => {
    this.setState({
      editModalVisiable: false,
    });
  };
  onFinish = (values: any) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  renderEditForm = (data) => {
    // const form = React.createRef()
    console.log(this.form);
    console.log(data);
    // if(this.form.current) {
    //   this.form.setFieldsValue({
    //     project_name: data.project_name,
    //   })
    // }

    return (
      <Form
        ref="form"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
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
  componentDidMount() {
    // const {paramsFileData} = this.props
    // console.log(this.refs);
    // this.form = this.refs.form
    // this.renderEditForm(this.state.currentEditParamsFile)
    // console.log(this.form);
    // this.form?.current.setFieldsValue({
    //   project_name: data.project_name,
    // })
  }
  render() {
    return (
      <>
        <Card bordered={false}>
          <Table
            columns={this.state.columns}
            dataSource={this.props.paramsFileData}
          />
        </Card>
        <Modal
          title="编辑"
          visible={this.state.editModalVisiable}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.renderEditForm(this.state.currentEditParamsFile)}
        </Modal>
      </>
    );
  }
}
