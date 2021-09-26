import {
  DatePicker,
  Row,
  Col,
  Collapse,
  Form,
  Input,
  Button,
  Space,
} from 'antd';
import { EditOutlined, RedoOutlined } from '@ant-design/icons';
import { connect } from 'umi';
import './index.less';
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const SearchModel = (props: any) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const handleSearch = (value: any) => {
    const payload = {
      page: 1,
      var_name: value.var_name,
      var_value: value.var_value,
      description: value.description,
    };
    props.getGlobalVarList(payload);
    props.handleSearchChildren(
      value.var_name,
      value.var_value,
      value.description,
    );
  };

  return (
    <Collapse>
      <Panel header="搜索框" key="search">
        <Form
          form={form}
          className="search"
          initialValues={{ remember: false }}
          wrapperCol={{ span: 15 }}
          onFinish={handleSearch}
        >
          <Row>
            <Col span={6}>
              <Form.Item label="参数名称" name="var_name">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="参数值" name="var_value">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            {/* <Col span={4.8}>
              <Form.Item label="更新日期" name="create_date">
                <RangePicker autoComplete="false" />
              </Form.Item>
            </Col> */}
            <Col span={6}>
              <Form.Item label="简要描述" name="description">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Space size="middle">
                  <Button
                    onClick={onReset}
                    icon={<RedoOutlined />}
                    shape="round"
                    size="small"
                  >
                    重置
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<EditOutlined />}
                    shape="round"
                    size="small"
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

export default connect(({ globalVarList }) => ({
  globalVarList,
}))(SearchModel);
