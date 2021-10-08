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
          el.type = DataType(value[1]);
        }
        validArr.push(el);
      });
      return validArr;
    });
  }, [extract, validate]);
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
        el.type = DataType(value[1]);
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
      setExtractData((prev) => {
        const index = prev.findIndex((item) => item.key === line.key);
        let next = [];
        // key有重复后的保存
        if (index > -1) {
          prev[index].name = line.name;
          prev[index].path = line.path;
          next = prev;
        }
        save(next, 'extract');
        return next;
      });
    } else if (table === 'validate') {
      setValidateData((prev) => {
        const index = prev.findIndex((item) => item.key === line.key);
        let next = [];
        // key有重复后的保存
        if (index > -1) {
          prev[index].check = line.check;
          prev[index].comparator = line.comparator;
          prev[index].type = line.type;
          prev[index].expected = line.expected;
          next = prev;
        }
        save(next, 'validate');
        return next;
      });
    }
  };

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
          <Button type="primary" onClick={() => lineAdd('extract')}>
            添加extract
          </Button>
        </div>
        <EditableTable
          form={form}
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
          form={form}
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
