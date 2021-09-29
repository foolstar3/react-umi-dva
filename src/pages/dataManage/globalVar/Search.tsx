import {
  Select,
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
const { Option } = Select;
const { RangePicker } = DatePicker;
const SearchModel = (props: any) => {
  const projectList = props?.projectList?.projectList;
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    props.onResetPage();
  };

  const handleSearch = (value: any) => {
    for (let i = 0; i < projectList.length; i++) {
      if (value.project && value.project == projectList[i].project_name) {
        value.project = projectList[i].id;
      }
    }
    const payload = {
      page: 1,
      project: value.project,
      var_name: value.var_name,
      var_value: value.var_value,
      description: value.description,
    };
    props.getGlobalVarList(payload);
    props.handleSearchChildren(
      value.var_name,
      value.var_value,
      value.description,
      value.project,
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
            <Col span={5.6}>
              <Form.Item label="项目名称" name="project">
                {
                  <Select
                    style={{ width: 150, marginRight: 15 }}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {projectList &&
                      Array.isArray(projectList) &&
                      projectList.length &&
                      projectList.map((item) => {
                        return (
                          <Option value={item.project_name} key={item.id}>
                            {item.project_name}
                          </Option>
                        );
                      })}
                  </Select>
                }
              </Form.Item>
            </Col>
            <Col span={5.6}>
              <Form.Item label="参数名称" name="var_name">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={5.6}>
              <Form.Item label="参数值" name="var_value">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            {/* <Col span={4.8}>
              <Form.Item label="更新日期" name="create_date">
                <RangePicker autoComplete="false" />
              </Form.Item>
            </Col> */}
            <Col span={5.6}>
              <Form.Item label="简要描述" name="description">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={5.6}>
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

export default connect(({ globalVarList, projectList }) => ({
  globalVarList,
  projectList,
}))(SearchModel);
