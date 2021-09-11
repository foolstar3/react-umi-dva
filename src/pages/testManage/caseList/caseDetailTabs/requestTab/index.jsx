import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message, Input, Row, Col } from 'antd';

import styles from './index.less';

const RequestTab = ({ request }) => {
  console.log(request);
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
  const [headerData, setHeaderData] = useState(() => {
    const header = [];
    let index = 1;
    for (const [key, value] of Object.entries(request.headers)) {
      // console.log(`${key}: ${value}`);
      header.push({
        name: key,
        value: value,
        id: index,
        key: index,
      });
      index++;
    }
    return header;
  });
  const [paramsData, setParamsData] = useState(() => {
    const params = [];
    let index = 1;
    for (const [key, value] of Object.entries(request.params)) {
      // console.log(`${key}: ${value}`);
      params.push({
        name: key,
        value: value,
        id: index,
        key: index,
      });
      index++;
    }
    return params;
  });
  const [requestdata, setData] = useState(() => {
    const data = [];
    let index = 1;
    if (request.data) {
      for (const [key, value] of Object.entries(request.data)) {
        // console.log(`${key}: ${value}`);
        data.push({
          name: key,
          value: value,
          id: index,
          key: index,
        });
        index++;
      }
    }
    return data;
  });
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
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.top}>
        <Form initialValues={request}>
          <Row>
            <Col span={12}>
              <Form.Item
                label="URL"
                name="url"
                labelCol={{ span: 1 }}
                wrapperCol={{ span: 22 }}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="请求方法"
                name="method"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                // onChange={onProjectNameChange}
                >
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
              >
                <Select
                // onChange={onProjectNameChange}
                >
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
          <Button type="primary">添加headers</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={headerData}
          columns={headerTableColumns}
        />
      </div>
      <div className={styles.paramsContent}>
        <div className={styles.topBtn}>
          <Button type="primary">添加params</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={paramsData}
          columns={paramsTableColumns}
        />
      </div>
      <div className={styles.dataContent}>
        <div className={styles.topBtn}>
          <Button type="primary">添加data</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={requestdata}
          columns={dataTableColumns}
        />
      </div>
    </>
  );
};

export default RequestTab;
