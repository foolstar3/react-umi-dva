import React, { useState, forwardRef, useImperativeHandle } from 'react';
import EditableTable from '@/components/Editabletable';
import { DataType } from '@/utils/common';
import { Form, Select, Button, message, Input, Row, Col } from 'antd';
import Editor from '@/components/Editor';

import styles from './index.less';

const RequestTab = (props, ref) => {
  const { request, save } = props;
  useImperativeHandle(ref, () => {
    return {
      sendCode() {
        return {
          jsonCode,
          dataType,
        };
      },
    };
  });

  const method = [
    { name: 'GET', value: 'GET', key: 'GET' },
    { name: 'POST', value: 'POST', key: 'POST' },
    { name: 'PUT', value: 'PUT', key: 'PUT' },
    { name: 'DELETE', value: 'DELETE', key: 'DELETE' },
  ];

  const data = [
    { name: 'data', value: 'data', key: 'data' },
    { name: 'json', value: 'json', key: 'json' },
  ];

  const [requestType, setRequestType] = useState({
    url: request.url,
    method: request.method,
  });
  const [dataType, setDataType] = useState(request.json ? 'json' : 'data');
  const [headerData, setHeaderData] = useState(() => {
    const header = [];
    let index = 1;
    if (request.headers) {
      for (const [key, value] of Object.entries(request.headers)) {
        header.push({
          name: key,
          value: value,
          id: index,
          key: index,
          type: DataType(value),
        });
        index++;
      }
    }
    return header;
  });
  const [paramsData, setParamsData] = useState(() => {
    const params = [];
    let index = 1;
    if (request.params) {
      for (const [key, value] of Object.entries(request.params)) {
        params.push({
          name: key,
          value: value,
          id: index,
          key: index,
          type: DataType(value),
        });
        index++;
      }
    }
    return params;
  });
  const [requestData, setData] = useState(() => {
    const data = [];
    let index = 1;
    if (request.data) {
      for (const [key, value] of Object.entries(request.data)) {
        data.push({
          name: key,
          value: value,
          id: index,
          key: index,
          type: DataType(value),
        });
        index++;
      }
    }
    return data;
  });
  // 子组件的jsonCode
  const [jsonCode, setJsonCode] = useState(request.json ?? '');
  const lineAdd = (table) => {
    if (table === 'headers') {
      setHeaderData((prev = []) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          name: '',
          value: '',
        });
        const next = JSON.parse(JSON.stringify(prev));
        return next;
      });
    } else if (table === 'params') {
      setParamsData((prev = []) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          name: '',
          value: '',
        });
        const next = JSON.parse(JSON.stringify(prev));
        return next;
      });
    } else if (table === 'data') {
      setData((prev = []) => {
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
    }
  };

  const lineDelete = (line, table) => {
    if (table === 'headers') {
      setHeaderData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    } else if (table === 'params') {
      setParamsData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    } else if (table === 'data') {
      setData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    }
  };

  const lineSave = (line, table) => {
    if (table === 'headers') {
      setHeaderData((prev) => {
        const index = prev.findIndex((item) => item.key === line.key);
        let next = [];
        // key有重复后的保存
        if (index > -1) {
          prev[index].name = line.name;
          prev[index].value = line.value;
          next = prev;
        }
        save(next, table);
        return next;
      });
    } else if (table === 'params') {
      setParamsData((prev) => {
        const index = prev.findIndex((item) => item.key === line.key);
        let next = [];
        // key有重复后的保存
        if (index > -1) {
          prev[index].name = line.name;
          prev[index].value = line.value;
          next = prev;
        }
        save(next, table);
        return next;
      });
    } else if (table === 'data') {
      setData((prev) => {
        const index = prev.findIndex((item) => item.key === line.key);
        let next = [];
        // key有重复后的保存
        if (index > -1) {
          prev[index].name = line.name;
          prev[index].value = line.value;
          prev[index].type = line.type;
          next = prev;
        }
        save(next, table);
        return next;
      });
    }
  };

  const headerTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: 'header名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
    {
      title: 'header值',
      dataIndex: 'value',
      editable: true,
      align: 'center',
    },
  ];

  const paramsTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: 'params名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
    {
      title: 'params值',
      dataIndex: 'value',
      editable: true,
      align: 'center',
    },
  ];

  const dataTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: 'data名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      editable: true,
      align: 'center',
    },
    {
      title: 'data值',
      dataIndex: 'value',
      editable: true,
      align: 'center',
    },
  ];

  const getDataCode = (val) => {
    // setJsonData(val)
    setJsonCode(val);
  };

  const [form] = Form.useForm();

  const requestTypeChange = (val, type) => {
    if (type === 'url') {
      setRequestType((prev = {}) => {
        const next = {
          ...prev,
          url: val,
        };
        save(next, 'request');
        return next;
      });
    } else if (type === 'method') {
      setRequestType((prev = {}) => {
        const next = {
          ...prev,
          method: val,
        };
        save(next, 'request');
        return next;
      });
    }
  };
  return (
    <>
      <div className={styles.top}>
        <Form initialValues={requestType}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="URL"
                name="url"
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 22 }}
              >
                <Input
                  onChange={(e) => requestTypeChange(e.target.value, 'url')}
                />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="请求方法"
                name="method"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                <Select onChange={(val) => requestTypeChange(val, 'method')}>
                  {method.map((item) => (
                    <Select.Option key={item.key} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="数据格式"
                name="data"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                initialValue={dataType}
              >
                <Select onChange={(val) => setDataType(val)}>
                  {data.map((item) => (
                    <Select.Option key={item.key} value={item.value}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className={styles.headerContent}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('headers')}>
            添加headers
          </Button>
        </div>
        <EditableTable
          form={form}
          dataSource={headerData}
          columns={headerTableColumns}
          lineDelete={(record) => lineDelete(record, 'headers')}
          lineSave={(record) => lineSave(record, 'headers')}
        />
      </div>
      <div className={styles.paramsContent}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('params')}>
            添加params
          </Button>
        </div>
        <EditableTable
          form={form}
          dataSource={paramsData}
          columns={paramsTableColumns}
          lineDelete={(record) => lineDelete(record, 'params')}
          lineSave={(record) => lineSave(record, 'params')}
        />
      </div>
      <div className={styles.dataContent}>
        {dataType === 'json' && (
          <div className={styles.editor}>
            <Editor
              getEditorContent={getDataCode}
              content={jsonCode}
              ref={ref}
            />
          </div>
        )}
        {dataType === 'data' && (
          <>
            <div className={styles.topBtn}>
              <Button type="primary" onClick={() => lineAdd('data')}>
                添加data
              </Button>
            </div>
            <EditableTable
              form={form}
              dataSource={requestData}
              columns={dataTableColumns}
              lineDelete={(record) => lineDelete(record, 'data')}
              lineSave={(record) => lineSave(record, 'data')}
            />
          </>
        )}
      </div>
    </>
  );
};

export default forwardRef(RequestTab);
