import {
  Row,
  Col,
  Dropdown,
  Menu,
  DatePicker,
  Collapse,
  Card,
  Select,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Space,
} from 'antd';
import { UserOutlined, EditOutlined, RedoOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import './index.less';
const { Panel } = Collapse;
const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchModel = (props: any) => {
  const [form] = Form.useForm();

  //重置搜索框
  const onReset = () => {
    form.resetFields();
  };
  //  搜索中的启动框

  //进行搜索
  const handleSearch = (value: any) => {
    if (value.Enable_status == '全部') {
      value.Enable_status == '';
    } else if (value.Enable_status == '启用') {
      value.Enable_status == true;
    } else {
      value.Enable_status == false;
    }
    props.dispatch({
      type: 'taskList/getTaskList',
      payload: {
        page: 1,
        name: value.module_name,
        update_time_after: 1,
        update_time_before: 1,
        enabled: 1,
      },
    });
  };

  return (
    <Collapse>
      <Panel header="搜索框" key="search">
        <Form
          form={form}
          initialValues={{ remember: false }}
          wrapperCol={{ span: 13 }}
          onFinish={handleSearch}
          labelCol={{ span: 4 }}
        >
          <Row>
            <Col span={8}>
              <Form.Item label="任务名称" name="module_name">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="启用状态" name="Enable_status">
                <Select defaultValue="全部">
                  <Option value="全部"> 全部 </Option>
                  <Option value="启用"> 启用 </Option>
                  <Option value="禁止"> 禁止 </Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item label="创建人" name="test_user">
                <Input autoComplete="off" />
              </Form.Item>
            </Col> */}
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="简要描述" name="description">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="更新时间" name="updateDateTime">
                <RangePicker autoComplete="false" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                <Space size="middle" className="space-button">
                  <Button
                    onClick={onReset}
                    icon={<RedoOutlined />}
                    shape="round"
                  >
                    重置
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<EditOutlined />}
                    shape="round"
                  >
                    搜索
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Panel>
    </Collapse>
  );
};

export default connect(({ taskList }) => ({
  taskList,
}))(SearchModel);
