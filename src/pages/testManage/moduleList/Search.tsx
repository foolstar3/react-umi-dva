import {
  Row,
  Col,
  DatePicker,
  Collapse,
  Select,
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
const { Option } = Select;

const SearchModel = (props: any) => {
  const [form] = Form.useForm();
  const projectList = props?.projectList?.projectList || [];

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
      module_name: value.module_name,
      test_user: value.test_user,
      description: value.description,
      project: value.project,
      update_time_after:
        value.rangeDateTime && value.rangeDateTime[0].format('YYYY-MM-DD'),
      update_time_before:
        value.rangeDateTime && value.rangeDateTime[1].format('YYYY-MM-DD'),
    };
    props.getModuleList(payload);
    props.handleChildrenSearch(payload);
  };

  return (
    <div>
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
                <Form.Item label="模块名称" name="module_name">
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="项目名称" name="project">
                  {
                    <Select
                      style={{ width: 269 }}
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
              {/* TO DO后续可能添加该选项
              <Col span={8}>
                <Form.Item label="测试人员" name="test_user">
                  {
                    <Select
                      style={{ width: 314 }}
                      onClick={handleUserListVisible}
                    >
                      {testUserList &&
                        Array.isArray(testUserList) &&
                        testUserList.length &&
                        testUserList.map((item) => {
                          return (
                            <Option value={item.username} key={item.id}>
                              {' '}
                              {item.username}{' '}
                            </Option>
                          );
                        })}
                    </Select>
                  }
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
                <Form.Item label="更新时间" name="rangeDateTime">
                  <RangePicker autoComplete="false" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Space size="middle" className="button-space">
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
    </div>
  );
};

export default connect(({ moduleList, projectList, userList }) => ({
  moduleList,
  projectList,
  userList,
}))(SearchModel);
