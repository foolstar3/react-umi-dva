import React, { useState, useEffect } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message } from 'antd';
import { DataType } from '@/utils/common';
import styles from './index.less';

const ExtractTab = ({ extract, validate, save }) => {
  useEffect(() => {
    setExtractData(() => {
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
  }, [extract]);

  useEffect(() => {
    setValidateData(() => {
      const validArr = [];
      validate.map((item, index) => {
        const el = {};
        el.id = index + 1;
        el.key = index + 1;
        for (const [key, value] of Object.entries(item)) {
          el.comparator = key;
          el.check = value[0];
          el.expected = value[1];
          el.type = value[2] ?? DataType(value[1]);
        }
        validArr.push(el);
      });
      return validArr;
    });
  }, [validate]);

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
        el.type = value[2] ?? DataType(value[1]);
      }
      validArr.push(el);
    });
    return validArr;
  });

  const lineAdd = (table) => {
    if (table === 'extract') {
      setExtractData((prev) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          name: '',
          path: '',
        });
        const next = JSON.parse(JSON.stringify(prev));
        return next;
      });
    } else if (table === 'validate') {
      setValidateData((prev) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          check: '',
          comparator: '',
          type: '',
          expected: '',
        });
        const next = JSON.parse(JSON.stringify(prev));
        return next;
      });
    }
  };

  const lineDelete = (line, table) => {
    if (table === 'extract') {
      setExtractData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, 'extract');
        return next;
      });
    } else if (table === 'validate') {
      setValidateData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, 'validate');
        return next;
      });
    }
  };

  const lineSave = (line, table) => {
    if (table === 'extract') {
      const index = extractData.findIndex((item) => item.key === line.key);
      let next = JSON.parse(JSON.stringify(extractData));
      // key有重复后的保存
      if (index > -1) {
        next[index].name = line.name;
        next[index].path = line.path;
      }
      save(next, table);
    } else if (table === 'validate') {
      const index = validateData.findIndex((item) => item.key === line.key);
      let next = JSON.parse(JSON.stringify(validateData));
      // key有重复后的保存
      if (index > -1) {
        next[index].check = line.check;
        next[index].comparator = line.comparator;
        next[index].type = line.type;
        if (line.type === 'String') {
          next[index].expected =
            typeof line.expected === 'string'
              ? line.expected
              : JSON.stringify(line.expected);
        } else {
          next[index].expected = JSON.parse(line.expected);
        }
      }
      save(next, table);
    }
  };

  const extractTableColumns = [
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
      title: '变量名',
      dataIndex: 'check',
      editable: true,
      align: 'center',
    },
    {
      title: '运算符',
      dataIndex: 'comparator',
      editable: true,
      align: 'center',
      width: 400,
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      editable: true,
      align: 'center',
      width: 200,
    },
    {
      title: '期望值',
      dataIndex: 'expected',
      editable: true,
      align: 'center',
      render: (text) => (
        <span>{typeof text === 'boolean' ? JSON.stringify(text) : text}</span>
      ),
    },
  ];
  const [extractForm] = Form.useForm();
  const [validateForm] = Form.useForm();

  return (
    <>
      <div className={styles.extractContent}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('extract')}>
            添加extract
          </Button>
        </div>
        <EditableTable
          form={extractForm}
          dataSource={extractData}
          columns={extractTableColumns}
          lineDelete={(record) => lineDelete(record, 'extract')}
          lineSave={(record) => lineSave(record, 'extract')}
        />
      </div>
      <div className={styles.validateContent}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('validate')}>
            添加validate
          </Button>
        </div>
        <EditableTable
          form={validateForm}
          dataSource={validateData}
          columns={validateTableColumns}
          lineDelete={(record) => lineDelete(record, 'validate')}
          lineSave={(record) => lineSave(record, 'validate')}
        />
      </div>
    </>
  );
};

export default ExtractTab;
