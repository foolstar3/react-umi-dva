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
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
const { Option } = Select;

const SearchProject = (props: any) => {
  //点击搜索框中的项目选择时弹出
  // const handleProjectListVisible = () => {
  //   props.dispatch({
  //     type: 'projectList/getProjectList',
  //     payload: {
  //       page: 1,
  //     },
  //   });
  // };
  // const handleUserListVisible = () => {
  //   props.dispatch({
  //     type: 'userList/getUserList',
  //   });
  // };
  const [form] = Form.useForm();
  // const projectList = props?.projectList?.projectList || [];
  // const testUserList = props?.userList?.userList || [];

  //重置搜索框
  const onReset = () => {
    form.resetFields();
  };

  //进行搜索
  const handleSearch = (value: any) => {
    //   for (let i = 0; i < projectList.length; i++) {
    //     if (value.project && value.project == projectList[i].project_name) {
    //       value.project = projectList[i].id;
    //     }
    //   }
    //   for (let i = 0; i < testUserList.length; i++) {
    //     if (value.test_user && value.test_user == testUserList[i].username) {
    //       value.test_user = testUserList[i].id;
    //     }
    //   }
    props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1,
        project_name: value.project_name,
        description: value.description,
      },
    });
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
                <Form.Item label="项目名称" name="project_name">
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              {/* <Col span={8}>
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
              <Col span={8}>
                <Form.Item label="简要描述" name="description">
                  <Input autoComplete="off" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Space size="middle">
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
    </div>
  );
};

export default connect(({ projectList, userList }) => ({
  projectList,
  userList,
}))(SearchProject);
