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

const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const SearchBox = (props) => {
  const { projectOptions, userOptions } = props;
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onSearch = () => {
    const { onSearch } = props;
    const payload = form.getFieldsValue(true);
    form.setFieldsValue({
      update_time: payload.update_time,
      project_name: payload.project_name,
      author: payload.author,
    });
    // 修改时间格式
    payload.update_time?.map((item, index) => {
      if (index === 0) {
        payload.update_time_after = item.format('YYYY-MM-DD');
      } else if (index === 1) {
        payload.update_time_before = item.format('YYYY-MM-DD');
      }
    });
    delete payload.update_time;
    const { project_name } = payload;
    payload.project = project_name;
    delete payload.project_name;
    onSearch(payload);
  };

  return (
    <Collapse>
      <Panel header="搜索框" key="search">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }} form={form}>
          <Row>
            <Col span={6}>
              <Form.Item label="上传人员" name="author">
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
                  {userOptions.length &&
                    userOptions.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.username}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
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
              <Form.Item label="更新时间" name="update_time">
                <RangePicker />
              </Form.Item>
            </Col>

            <Col span={4}>
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
