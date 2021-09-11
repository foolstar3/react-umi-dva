import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message } from 'antd';

import styles from './index.less';

const ExtractTab = ({ extract, validate }) => {
  console.log(extract, validate);
  const [extractData, setExtractData] = useState(() => {
    extract.map((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        item.name = key;
        item.path = value;
        item.id = index + 1;
        item.key = index + 1;
      }
    });
    return extract;
  });

  const [validateData, setValidateData] = useState(() => {
    // const validArr = []
    validate.map((item, index) => {
      item.id = index + 1;
      item.key = index + 1;
      const type = Object.prototype.toString.call(item.expected);
      item.type = type.substring(7, type.length - 1);
    });
    return validate;
  });

  const extractTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '提取名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
    {
      title: '提取路径',
      dataIndex: 'path',
      editable: true,
      align: 'center',
    },
  ];

  const validateTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: 'Check',
      dataIndex: 'check',
      editable: true,
      align: 'center',
    },
    {
      title: 'Comparator',
      dataIndex: 'comparator',
      editable: true,
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      editable: true,
      align: 'center',
    },
    {
      title: 'Expected',
      dataIndex: 'expected',
      editable: true,
      align: 'center',
    },
  ];
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.extractContent}>
        <div className={styles.topBtn}>
          <Button type="primary">添加extract</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={extractData}
          columns={extractTableColumns}
        />
      </div>
      <div className={styles.validateContent}>
        <div className={styles.topBtn}>
          <Button type="primary">添加validate</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={validateData}
          columns={validateTableColumns}
        />
      </div>
    </>
  );
};

export default ExtractTab;
