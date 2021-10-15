import React, { useState, useEffect } from 'react';
import EditableTable from '@/components/Editabletable';
import { Table, Button, Form, Select, Input } from 'antd';
import { DataType } from '@/utils/common';

import styles from './index.less';

const VariablesTab = ({ variables, save }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    setVariablesData(() => {
      if (variables && Object.keys(variables).length !== 0) {
        let index = 1;
        const arr = [];
        for (const [key, value] of Object.entries(variables)) {
          arr.push({
            name: key,
            value: value,
            type: DataType(value),
            id: index,
            key: index,
          });
          index++;
        }
        return arr;
      }
    });
  }, [variables]);
  const [variablesData, setVariablesData] = useState(() => {
    if (variables && Object.keys(variables).length !== 0) {
      let index = 1;
      const arr = [];
      for (const [key, value] of Object.entries(variables)) {
        arr.push({
          name: key,
          value: value,
          type: DataType(value),
          id: index,
          key: index,
        });
        index++;
      }
      return arr;
    }
  });

  const columns = [
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
      render: (text) => (
        <span>{typeof text === 'boolean' ? JSON.stringify(text) : text}</span>
      ),
    },
  ];

  const lineAdd = () => {
    setVariablesData((prev = []) => {
      const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
      prev.push({
        id,
        key: id,
        name: '',
        value: '',
        type: '',
      });
      const next = JSON.parse(JSON.stringify(prev));
      return next;
    });
  };

  const lineDelete = (line, table) => {
    setVariablesData((prev = []) => {
      const next = prev.filter((item) => item.key !== line.key);
      save(next, table);
      return next;
    });
  };

  const lineSave = (line, table) => {
    const index = variablesData.findIndex((item) => item.key === line.key);
    let next = JSON.parse(JSON.stringify(variablesData));
    // key有重复后的保存
    if (index > -1) {
      next[index].name = line.name;
      next[index].type = line.type;
      if (line.type === 'String') {
        next[index].value =
          typeof line.value === 'string'
            ? line.value
            : JSON.stringify(line.value);
      } else {
        next[index].value = JSON.parse(line.value);
      }
    }
    save(next, table);
  };

  return (
    <>
      <div className={styles.topBtn}>
        <Button type="primary" onClick={lineAdd}>
          添加变量
        </Button>
      </div>
      <EditableTable
        form={form}
        dataSource={variablesData}
        columns={columns}
        lineDelete={(record) => lineDelete(record, 'variables')}
        lineSave={(record) => lineSave(record, 'variables')}
      />
    </>
  );
};

export default VariablesTab;
