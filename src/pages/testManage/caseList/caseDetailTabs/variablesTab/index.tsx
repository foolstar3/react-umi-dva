import React from 'react';
import { Table } from 'antd';

const tableColumns: any = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '变量名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '变量类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: '变量值',
    dataIndex: 'value',
    key: 'value',
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (record) => {},
  },
];
const VariablesTab = ({ variables }) => {
  return <Table columns={tableColumns} dataSource={variables} />;
};

export default VariablesTab;
