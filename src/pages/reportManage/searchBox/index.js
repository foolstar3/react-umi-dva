import React, { useState } from 'react';
import {
  Collapse,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Button,
} from 'antd';
import styles from './index.less';
import { RedoOutlined, SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const result_status = [
  {
    key: '全部',
    value: '',
    children: '全部',
  },
  {
    key: 'pass',
    value: 'pass',
    children: 'pass',
  },
  {
    key: 'failure',
    value: 'failure',
    children: 'failure',
  },
  {
    key: 'running',
    value: 'running',
    children: 'running',
  },
];
const SearchBox = (props) => {
  const { projectOptions } = props;
  const [form] = Form.useForm();
  const onReset = () => {
    const { onReset } = props;
    onReset();
    form.resetFields();
  };
  const onSearch = () => {
    const { onSearch } = props;
    const payload = form.getFieldsValue(true);
    form.setFieldsValue({
      create_time: payload.create_time,
    });
    // 修改时间格式
    payload.create_time?.map((item, index) => {
      if (index === 0) {
        payload.create_time_after = item.format('YYYY-MM-DD');
      } else if (index === 1) {
        payload.create_time_before = item.format('YYYY-MM-DD');
      }
    });
    delete payload.create_time;
    const { project_name } = payload;
    payload.project = project_name;
    form.setFieldsValue({
      project_name: payload.project_name,
    });
    delete payload.project_name;
    onSearch(payload);
  };

  return (
    <Collapse>
      <Panel header="搜索框" key="search">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 13 }} form={form}>
          <Row>
            <Col span={8}>
              <Form.Item label="报告名称" name="report_name">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="项目名称" name="project_name">
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {projectOptions.length &&
                    projectOptions.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.project_name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="运行结果" name="result">
                <Select>
                  {result_status.map((item) => (
                    <Option key={item.key} value={item.value}>
                      {item.children}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            {/* <Col span={8}>
              <Form.Item label="测试人员" name="author">
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.moduleOptions.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.module_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col> */}

            <Col span={8}>
              <Form.Item label="开始时间" name="create_time">
                <RangePicker />
              </Form.Item>
            </Col>

            <Col span={8}>
              <div className={styles.buttonGroup}>
                <Button
                  // type="primary"
                  icon={<RedoOutlined />}
                  onClick={onReset}
                  size="small"
                  shape="round"
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={onSearch}
                  size="small"
                  shape="round"
                >
                  搜索
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default SearchBox;
