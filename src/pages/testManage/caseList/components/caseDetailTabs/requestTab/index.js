import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useRef,
} from 'react';
import EditableTable from '@/components/Editabletable';
import { DataType } from '@/utils/common';
import {
  Form,
  Select,
  Button,
  message,
  Input,
  Row,
  Col,
  Switch,
  Radio,
} from 'antd';
import Editor from '@/components/Editor';

import styles from './index.less';

const { TextArea } = Input;
const uploadPath = 'static/upload/1/';
const RequestTab = (props, ref) => {
  const { request, save, upload } = props;
  useEffect(() => {
    setHeaderData(() => {
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
  }, [request.headers]);

  useEffect(() => {
    setParamsData(() => {
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
  }, [request.params]);

  useEffect(() => {
    setData(() => {
      const data = [];
      let index = 1;
      if (request.data && typeof request.data === 'object') {
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
  }, [request.data]);

  useEffect(() => {
    setUploadData(() => {
      const data = [];
      let index = 1;
      if (request.upload) {
        for (const [key, value] of Object.entries(request.upload)) {
          data.push({
            name: key,
            value: typeof value === 'string' ? value : value[0],
            id: index,
            key: index,
            type: DataType(typeof value === 'string' ? value : value[0]),
            file:
              typeof value === 'string'
                ? value.indexOf(uploadPath) !== -1
                  ? true
                  : false
                : value[1],
          });
          index++;
        }
      }
      return data;
    });
  }, [request.upload]);

  useImperativeHandle(ref, () => {
    return {
      sendCode() {
        return {
          jsonCode,
          dataType,
          isText,
          text: isText ? textArea.current.resizableTextArea.props.value : '',
        };
      },
    };
  });

  const textArea = useRef(null);
  const uploadTable = useRef(null);

  const method = [
    { name: 'GET', value: 'GET', key: 'GET' },
    { name: 'POST', value: 'POST', key: 'POST' },
    { name: 'PUT', value: 'PUT', key: 'PUT' },
    { name: 'DELETE', value: 'DELETE', key: 'DELETE' },
  ];

  const data = [
    { name: 'data', value: 'data', key: 'data' },
    { name: 'json', value: 'json', key: 'json' },
    { name: 'upload', value: 'upload', key: 'upload' },
  ];

  const [requestType, setRequestType] = useState({
    url: request.url,
    method: request.method,
  });
  const [dataType, setDataType] = useState(
    request.json ? 'json' : request.upload ? 'upload' : 'data',
  );

  const [isText, setIsText] = useState(
    request.data && typeof request.data === 'string',
  );
  const [text, setText] = useState(() => {
    if (request.data && typeof request.data === 'string') {
      return request.data;
    }
    return;
  });
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
  const [uploadData, setUploadData] = useState(() => {
    const data = [];
    let index = 1;
    if (request.upload) {
      for (const [key, value] of Object.entries(request.upload)) {
        data.push({
          name: key,
          value: value,
          id: index,
          key: index,
          type: DataType(value),
          file: value.indexOf(uploadPath) !== -1,
        });
        index++;
      }
    }
    return data;
  });
  // 子组件的jsonCode
  const [initJsonCode, setInitJsonCode] = useState(
    request.json ? JSON.stringify(request.json, null, '\t') : '',
  );
  const [jsonCode, setJsonCode] = useState(
    request.json ? JSON.stringify(request.json) : '',
  );

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
    } else if (table === 'upload') {
      setUploadData((prev = []) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          name: '',
          value: '',
          type: '',
          file: false,
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
    } else if (table === 'upload') {
      setUploadData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    }
  };

  const lineSave = (line, table) => {
    if (table === 'headers') {
      const index = headerData.findIndex((item) => item.key === line.key);
      let next = JSON.parse(JSON.stringify(headerData));
      // key有重复后的保存
      if (index > -1) {
        next[index].name = line.name;
        next[index].value = line.value;
      }
      save(next, table);
    } else if (table === 'params') {
      const index = paramsData.findIndex((item) => item.key === line.key);
      let next = JSON.parse(JSON.stringify(paramsData));
      // key有重复后的保存
      if (index > -1) {
        next[index].name = line.name;
        next[index].value = line.value;
      }
      save(next, table);
    } else if (table === 'data') {
      const index = requestData.findIndex((item) => item.key === line.key);
      let next = JSON.parse(JSON.stringify(requestData));
      // key有重复后的保存
      if (index > -1) {
        next[index].name = line.name;
        next[index].value = line.value;
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
    } else if (table === 'upload') {
      const index = uploadData.findIndex((item) => item.key === line.key);
      uploadData.findIndex((item) => {
        return item.key === line.key;
      });
      let next = JSON.parse(JSON.stringify(uploadData));
      // key有重复后的保存
      if (index > -1) {
        next[index].name = line.name;
        next[index].value = line.value;
        next[index].type = line.type;
        next[index].file = uploadData[index].file;
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
    }
  };

  const formatJSON = () => {
    try {
      JSON.parse(jsonCode);
      if (JSON.stringify(JSON.parse(jsonCode), null, '\t') === initJsonCode) {
        // 当内容只做了空格、换行操作，实际json没有变化时
        // 先清空然后设置
        setInitJsonCode('');
        setTimeout(() => {
          setInitJsonCode(JSON.stringify(JSON.parse(jsonCode), null, '\t'));
        });
      } else {
        setInitJsonCode(JSON.stringify(JSON.parse(jsonCode), null, '\t'));
      }
    } catch (e) {
      message.info('JSON格式有误');
    }
  };

  const headerTableColumns = [
    {
      title: 'header名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
      width: '25%',
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
      title: 'params名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
      width: '25%',
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
      title: 'data名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
      width: '25%',
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      editable: true,
      align: 'center',
      width: 200,
    },
    {
      title: 'data值',
      dataIndex: 'value',
      editable: true,
      align: 'center',
      render: (text) => (
        <span>{typeof text === 'boolean' ? JSON.stringify(text) : text}</span>
      ),
    },
  ];

  const uploadTableColumns = [
    {
      title: 'data名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
      width: '25%',
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      editable: true,
      align: 'center',
      width: '15%',
    },
    {
      title: 'data值',
      dataIndex: 'value',
      editable: true,
      align: 'center',
      width: '30%',
      render: (text) => (
        <span>{typeof text === 'boolean' ? JSON.stringify(text) : text}</span>
      ),
    },
    {
      title: '切换类型',
      key: 'switch',
      align: 'center',
      render: (_, record) => {
        return (
          <Switch
            checkedChildren="文件"
            unCheckedChildren="变量"
            onChange={(val) => typeOnChange(val, record)}
            defaultChecked={
              JSON.stringify(record.value).indexOf(uploadPath) !== -1
            }
          />
        );
      },
    },
  ];

  const typeOnChange = (value, record) => {
    uploadTable.current.tableEdit(record);
    record.file = value;
    const next = uploadData.map((item) => {
      if (item.key === record.key) {
        item.file = value;
        item.value = '';
        item.type = value ? 'String' : record.type;
        // item.type = 'String'
      }
      return item;
    });
    setUploadData(next);
  };

  const getDataCode = (val) => {
    setJsonCode(val);
  };

  const [headerForm] = Form.useForm();
  const [paramsForm] = Form.useForm();
  const [dataForm] = Form.useForm();
  const [uploadForm] = Form.useForm();

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

  const textChange = (e) => {
    setIsText(() => {
      if (e.target.value === 'text') {
        return true;
      }
      save([], 'data');
      return false;
    });
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
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 20 }}
                rules={[{ required: true, message: '请输入url' }]}
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
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: true, message: '请选择请求方法' }]}
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
          form={headerForm}
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
          form={paramsForm}
          dataSource={paramsData}
          columns={paramsTableColumns}
          lineDelete={(record) => lineDelete(record, 'params')}
          lineSave={(record) => lineSave(record, 'params')}
        />
      </div>
      <div className={styles.dataContent}>
        {dataType === 'json' && (
          <div className={styles.editor}>
            <div className={styles.topBtn}>
              <Button type="primary" onClick={formatJSON}>
                格式化JSON
              </Button>
            </div>
            <Editor
              getEditorContent={getDataCode}
              content={initJsonCode}
              height={'300px'}
              mode="json"
            />
          </div>
        )}
        {dataType === 'data' && (
          <>
            <Radio.Group
              defaultValue={isText ? 'text' : 'dict'}
              onChange={textChange}
            >
              <Radio value="dict">dict</Radio>
              <Radio value="text">text</Radio>
            </Radio.Group>
            {isText ? (
              <TextArea
                className={styles.textArea}
                ref={textArea}
                rows={4}
                defaultValue={text}
              ></TextArea>
            ) : (
              <>
                <div className={styles.topBtn}>
                  <Button type="primary" onClick={() => lineAdd('data')}>
                    添加data
                  </Button>
                </div>
                <EditableTable
                  form={dataForm}
                  dataSource={requestData}
                  columns={dataTableColumns}
                  lineDelete={(record) => lineDelete(record, 'data')}
                  lineSave={(record) => lineSave(record, 'data')}
                />
              </>
            )}
          </>
        )}
        {dataType === 'upload' && (
          <>
            <div className={styles.topBtn}>
              <Button type="primary" onClick={() => lineAdd('upload')}>
                添加upload
              </Button>
            </div>
            <EditableTable
              form={uploadForm}
              upload={upload}
              dataSource={uploadData}
              columns={uploadTableColumns}
              lineDelete={(record) => lineDelete(record, 'upload')}
              lineSave={(record) => lineSave(record, 'upload')}
              ref={uploadTable}
            />
          </>
        )}
      </div>
    </>
  );
};

export default forwardRef(RequestTab);
