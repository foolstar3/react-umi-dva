import React, { useState } from 'react';
import { DateFormat } from '@/utils/format';
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
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const onSearch = () => {
    const { onSearch } = props;
    const payload = form.getFieldsValue(true);
    form.setFieldsValue({
      update_time: payload.update_time,
    });
    // 修改时间格式
    payload.update_time?.map((item, index) => {
      if (index === 0) {
        payload.update_time_before = DateFormat(item._d);
      } else if (index === 1) {
        payload.update_time_after = DateFormat(item._d);
      }
    });
    delete payload.update_time;
    const { project_name, module_name, case_name } = payload;
    payload.project = project_name;
    payload.module = module_name;
    payload.name = case_name;
    form.setFieldsValue({
      project_name: payload.project_name,
      module_name: payload.module_name,
    });
    delete payload.project_name;
    delete payload.module_name;
    onSearch(payload);
  };

  const onProjectChange = (val) => {
    const { onProjectChange } = props;
    onProjectChange(val, false);
  };

  return (
    <Collapse>
      <Panel header="搜索框" key="search">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 13 }} form={form}>
          <Row>
            <Col span={8}>
              <Form.Item label="用例名称" name="case_name">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="项目名称" name="project_name">
                <Select
                  allowClear
                  showSearch
                  onChange={onProjectChange}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {props.projectOptions.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.project_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="模块名称" name="module_name">
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
              <Form.Item label="更新时间" name="update_time">
                <RangePicker />
              </Form.Item>
            </Col>

            <Col span={8}>
              <div className={styles.buttonGroup}>
                <Button
                  // type="primary"
                  icon={<RedoOutlined />}
                  onClick={onReset}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={onSearch}
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
