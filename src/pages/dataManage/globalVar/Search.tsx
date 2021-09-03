import { Collapse, Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined , RedoOutlined} from '@ant-design/icons';
import { connect } from 'umi'
import './index.less'
const { Panel } = Collapse

const SearchModel = (props: any) => {
  const [form] = Form.useForm()

  //重置搜索框
  const onReset = () =>{
    form.resetFields()
  }

  //进行搜索
  const handleSearch = (value: any) => {
    props.dispatch({
      type: 'globalVarList/getGlobalVarList',
      payload: {
        page: 2,
        var_name: value.var_name,
        var_value: value.var_value,
        description: value.description
      }
    })
  }

  return(
      <Collapse>
        <Panel header = "搜索框" key = "1">
          <Form
            form = { form }
            className = 'search' 
            layout = 'inline'
            initialValues = { { remember: false } }
            wrapperCol = { { span: 15 } }
            onFinish = { handleSearch }
          >
            <Form.Item
              label = '参数名称'
              name = 'var_name'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item
              label = '参数值'
              name = 'var_value'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item
              label = '简要描述'
              name = 'description'
            >
              <Input autoComplete = 'off'/>
            </Form.Item>
            <Form.Item>
              <Space size = 'middle'>
                <Button 
                  type = "primary" 
                  htmlType = "submit" 
                  icon = { <EditOutlined/> }
                  shape = 'round'
                >
                  搜索
                </Button>
                <Button
                  onClick = { onReset } 
                  icon = { <RedoOutlined/> }
                  shape = 'round'
                >
                  重置
                </Button>
              </Space>
            </Form.Item>               
          </Form>
        </Panel>
      </Collapse>
  )

}

export default connect(({ globalVarList }) => ({
  globalVarList
  }))(SearchModel)
