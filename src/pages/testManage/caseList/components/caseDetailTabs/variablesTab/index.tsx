import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Table, Button, Form, Select, Input } from 'antd';
import { DataType } from '@/utils/common';

import styles from './index.less';

const VariablesTab = ({ variables }) => {
  const [form] = Form.useForm();
  const variablesData = [];
  if (variables && Object.keys(variables).length !== 0) {
    let index = 1;
    for (const [key, value] of Object.entries(variables)) {
      variablesData.push({
        name: key,
        value: value,
        type: DataType(value),
        id: index,
        key: index,
      });
      index++;
    }
  }

  const columns: any = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '变量名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      editable: true,
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      editable: true,
    },
    {
      title: '变量值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      textWrap: 'word-break',
      ellipsis: true,
      editable: true,
    },
  ];

  return (
    <>
      <div className={styles.topBtn}>
        <Button type="primary">添加变量</Button>
      </div>
      <EditableTable form={form} dataSource={variablesData} columns={columns} />
    </>
  );
};

export default VariablesTab;
