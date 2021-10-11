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
const { Option } = Select;
const { RangePicker } = DatePicker;

const SearchModel = (props) => {
  const [form] = Form.useForm();
  const projectList = props?.projectList?.projectList;

  const onReset = () => {
    form.resetFields();
    props.onResetPage();
  };

  const handleSearch = (value) => {
    for (let i = 0; i < projectList.length; i++) {
      if (value.project && value.project == projectList[i].project_name) {
        value.project = projectList[i].id;
      }
    }
    if (value.enable_status == '启用') {
      const payload = {
        page: 1,
        project: value.project,
        name: value.task_name,
        update_time_after:
          value.updateDateTime && value.updateDateTime[0].format('YYYY-MM-DD'),
        update_time_before:
          value.updateDateTime && value.updateDateTime[1].format('YYYY-MM-DD'),
        description: value.description,
        enabled: true,
      };
      props.getTaskList(payload);
      props.handleSearchChildren(payload);
    } else if (value.enable_status == '禁用') {
      const payload = {
        page: 1,
        project: value.project,
        name: value.task_name,
        update_time_after:
          value.updateDateTime && value.updateDateTime[0].format('YYYY-MM-DD'),
        update_time_before:
          value.updateDateTime && value.updateDateTime[1].format('YYYY-MM-DD'),
        description: value.description,
        enabled: false,
      };
      props.getTaskList(payload);
      props.handleSearchChildren(payload);
    } else {
      const payload = {
        page: 1,
        project: value.project,
        name: value.task_name,
        update_time_after:
          value.updateDateTime && value.updateDateTime[0].format('YYYY-MM-DD'),
        update_time_before:
          value.updateDateTime && value.updateDateTime[1].format('YYYY-MM-DD'),
        description: value.description,
      };
      props.getTaskList(payload);
    }
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
              <Form.Item label="任务名称" name="task_name">
                <Input autoComplete="off" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                initialValue="全部"
                label="定时状态"
                name="enable_status"
              >
                <Select>
                  <Option value="全部"> 全部 </Option>
                  <Option value="启用"> 启用 </Option>
                  <Option value="禁用"> 禁用 </Option>
                </Select>
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

export default connect(({ taskList, projectList }) => ({
  taskList,
  projectList,
}))(SearchModel);
