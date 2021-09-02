import { Dropdown, Menu, DatePicker, Collapse, Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {UserOutlined, EditOutlined , RedoOutlined} from '@ant-design/icons';
import { connect } from 'umi'
import './index.less'
const { Panel } = Collapse
const { Option } = Select
const { RangePicker } = DatePicker

const SearchModel = (props: any) => {
  const [form] = Form.useForm()

  //重置搜索框
  const onReset = () =>{
    form.resetFields()
  }
  //  搜索中的启动框

  //进行搜索
  const handleSearch = (value: any) => {
    props.dispatch({
      type: 'moduleList/getModuleList',
      payload: {
        page: 2,
        module_name: value.module_name,
        test_user: value.test_user,
        description: value.description,
        project:  value.project_name
      }
    })
  }

  return(
    <Card className='Search' type='inner' >
      <Collapse >
        <Panel header="搜索框" key="1">
          <Form
            form = { form }
            initialValues = { { remember: false } }
            wrapperCol = { { span: 15 } }
            onFinish = { handleSearch }
          >
            <Space direction = 'vertical'>
              <Space wrap>
                <Form.Item
                  label = '任务名称'
                  name = 'module_name'
                >
                  <Input autoComplete = 'off'/>
                </Form.Item>
                <Form.Item className = 'downdrop'
                  label = '启用状态'
                  name = 'Enable_status'
                >
                    <Select defaultValue = "全部" style = {{ width: 100 }} >
                      <Option value = "全部" > 全部 </Option>
                      <Option value = "启用"> 启用 </Option>
                      <Option value = "禁止"> 禁止 </Option>
                    </Select>
                </Form.Item>
                <Form.Item
                  label = '创建人'
                  name = 'test_user'
                >
                  <Input autoComplete = 'off'/>
                </Form.Item>
              </Space>
              <Space wrap>
                <Form.Item
                  label = '简要描述'
                  name = 'description'
                >
                  <Input autoComplete = 'off'/>
                </Form.Item>
                <Form.Item
                className = 'downdrop'
                  label = '创建时间'
                  name = 'createDateTime'
                >
                  <RangePicker autoComplete = 'false'/>  
                </Form.Item> 
                <Form.Item
                  className = 'downdrop_time'
                  label = '更新时间'
                  name = 'updateDateTime'
                >
                  <RangePicker autoComplete = 'false'/>  
                </Form.Item> 
                <Form.Item className = 'searchButton'>
                  <Space size = 'middle'>
                    <Button 
                      type = "primary" 
                      htmlType = "submit" 
                      icon ={<EditOutlined/>}
                      shape = 'round'
                    >
                      搜索
                    </Button>
                    <Button
                      onClick = {onReset} 
                      icon = {<RedoOutlined/>}
                      shape = 'round'
                    >
                      重置
                    </Button>
                  </Space>
                </Form.Item> 
              </Space>
            </Space>
          </Form>
        </Panel>
      </Collapse>
    </Card>
  )

}

export default connect(({ taskList }) => ({
  taskList
  }))(SearchModel)
