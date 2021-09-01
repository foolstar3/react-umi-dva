import React from 'react';
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
  return (
    <Collapse>
      <Panel header="搜索框" key="search">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 13 }}>
          <Row>
            <Col span={8}>
              <Form.Item label="用例名称" name="case_name">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="项目名称" name="project_name">
                <Select></Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="模块名称" name="module_name">
                <Select></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Form.Item label="测试人员" name="case_name">
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="创建时间" name="create_time">
                <RangePicker />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="更新时间" name="update_time">
                <RangePicker />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div className={styles.buttonGroup}>
          <Button type="primary" icon={<RedoOutlined />}>
            重置
          </Button>
          <Button type="primary" icon={<SearchOutlined />}>
            搜索
          </Button>
        </div>
      </Panel>
    </Collapse>
  );
};

export default SearchBox;
