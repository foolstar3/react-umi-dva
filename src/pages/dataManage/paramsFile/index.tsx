import React, { Component } from 'react';
import { Card, Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'umi';
// 表格的表头数据配置
const columns = [
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
        <Button type="primary" icon={<EditOutlined />}>
          编辑
        </Button>
        <Button type="primary" icon={<DeleteOutlined />} danger>
          删除
        </Button>
      </Space>
    ),
  },
];

const data = [
  {
    index: '1',
    project_name: 'John Brown',
    file_name: 32,
    upload_staff: 'New York No. 1 Lake Park',
    create_time: new Date().toLocaleString(),
    update_time: new Date().toLocaleString(),
  },
];
@connect(({ paramsFile }) => ({
  paramsFileData: paramsFile.paramsFileList,
}))
export default class ParamsFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paramsFileData: [],
    };
    const { dispatch } = this.props;
    // console.log(dispatch);
    dispatch({
      type: 'paramsFile/getParamsFileListData',
    });
  }
  componentDidUpdate() {
    console.log(this.props.paramsFileData);
  }
  render() {
    return (
      <Card bordered={false}>
        <Table columns={columns} dataSource={data} />
      </Card>
    );
  }
}
