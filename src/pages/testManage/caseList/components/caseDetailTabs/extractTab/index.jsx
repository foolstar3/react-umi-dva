import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message } from 'antd';
import { DataType } from '@/utils/common';
import styles from './index.less';

const ExtractTab = ({ extract, validate }) => {
  // console.log(extract, validate);
  const [extractData, setExtractData] = useState(() => {
    const extractArr = [];
    let index = 1;
    for (const [key, value] of Object.entries(extract)) {
      extractArr.push({
        name: key,
        path: value,
        id: index,
        key: index,
      });
      index++;
    }
    return extractArr;
  });

  const [validateData, setValidateData] = useState(() => {
    const validArr = [];
    validate.map((item, index) => {
      const el = {};
      el.id = index + 1;
      el.key = index + 1;
      for (const [key, value] of Object.entries(item)) {
        el.comparator = key;
        el.check = value[0];
        el.expected = value[1];
        // const type = Object.prototype.toString.call(value[1]);
        // if(type.substring(8, type.length - 1) == 'Number') {
        //   el.type = value[1]%1 == 0 ? 'Int': 'Float'
        // } else {
        //   el.type = type.substring(8, type.length - 1);
        // }
        el.type = DataType(value[1]);
      }
      validArr.push(el);
    });
    return validArr;
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
