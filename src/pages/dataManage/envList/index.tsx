import React, { Component } from 'react';
import { getEnvList } from '@/services/dataManage/envList';

const columns = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '环境名称',
    dataIndex: 'env_name',
    key: 'env_name',
  },
  {
    title: '环境地址',
    dataIndex: 'env_address',
    key: 'env_address',
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
];
export default function () {
  getEnvList({ page: 1 }).then((res) => {
    console.log(res);
  });
  return <>环境列表</>;
}
