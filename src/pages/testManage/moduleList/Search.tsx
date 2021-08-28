import { Col, DatePicker, Collapse, Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined , RedoOutlined} from '@ant-design/icons';
import { connect } from 'umi'
import './index.less'
const { Panel } = Collapse
const { RangePicker } = DatePicker

const SearchModel = (props: any) => {
  const [form] = Form.useForm()

  //重置搜索框
  const onReset = () =>{
    form.resetFields()
  }

  //进行搜索
  const handleSearch = (value: any) => {
    console.log('value', value.rangeDateTime[1]._d)
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
            layout = 'inline'
            initialValues = { { remember: false } }
            wrapperCol = { { span: 15 } }
            onFinish = { handleSearch }
          >
            <Form.Item
              label = '模块名称'
              name = 'module_name'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item
              label = '项目名称'
              name = 'project_name'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item
              label = '测试人员'
              name = 'test_user'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item
              label = '简要描述'
              name = 'description'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item
              label = '日期范围'
              name = 'rangeDateTime'
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
          </Form>
        </Panel>
      </Collapse>
    </Card>
  )

}

export default connect(({ moduleList }) => ({
 moduleList
  }))(SearchModel)
