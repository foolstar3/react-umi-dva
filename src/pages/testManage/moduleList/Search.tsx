import { Row, Col, DatePicker, Collapse, Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined , RedoOutlined} from '@ant-design/icons';
import { connect } from 'umi'
import './index.less'
import { render } from 'react-dom';
import projectList from '../projectList';
const { Panel } = Collapse
const { RangePicker } = DatePicker
const { Option } = Select


const SearchModel = (props: any) => {
  //点击搜索框中的项目选择时弹出
  const handleProjectListVisible = ()=>{
    props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1 
      }
    })
   
  }
  const [form] = Form.useForm()
  const projectList = props.projectList.projectList

  //重置搜索框
  const onReset = () =>{
    form.resetFields()
  }

  //进行搜索
  const handleSearch = (value: any) => {
    props.dispatch({
      type: 'moduleList/getModuleList',
      payload: {
        page: 2,
        module_name: module_name,
        test_user: value.test_user,
        description: value.description,
        project:  value.project_name
      }
    })
  }

    return(
      <div>
        <Collapse>
          <Panel header = "搜索框" key = "search">
            <Form
              form = { form }
              initialValues = { { remember: false } }
              wrapperCol = { { span: 13 } }
              onFinish = { handleSearch }
              labelCol={{ span: 4 }}
            >
              <Row>
                <Col span = { 8 }>
                  <Form.Item
                    label = '模块名称'
                    name = 'module_name'
                  >
                    <Input autoComplete = 'off'/>
                  </Form.Item>
                </Col>
                <Col span = { 8 }>
                  <Form.Item
                    label = '项目名称'
                    name = 'project_name'
                  >
                    {
                    <Select
                      style = {{ width: 269}}
                      onClick = { handleProjectListVisible }
                    > 

                    {
                      projectList && Array.isArray(projectList) && projectList.length && projectList.map((item) => {
                        return(
                          <Option
                            value = { item.project_name }
                            key = { item.id }
                            >
                              { item.project_name }
                          </Option> 
                        )
                      })
                    }    
                    </Select>
                  }
                  </Form.Item>
                </Col>
                <Col span = { 8 }>
                  <Form.Item
                    label = '测试人员'
                    name = 'test_user'
                  >
                   <Input autoComplete = 'off'/>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span = { 8 }>
                  <Form.Item
                    label = '简要描述'
                    name = 'description'
                  >
                    <Input autoComplete = 'off'/>
                  </Form.Item>
                </Col>
                <Col span = { 8 }>
                  <Form.Item
                    label = '日期范围'
                    name = 'rangeDateTime'
                  >
                    <RangePicker autoComplete = 'false'/>  
                  </Form.Item> 
                </Col>
                <Col span = { 8 }>
                  <Form.Item>
                    <Space size = 'middle' className = 'button-space'>
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
                </Col>
              </Row>
            </Form>
          </Panel>
        </Collapse>
      </div>
    )
  
  }



export default connect(({ moduleList, projectList }) => ({
 moduleList, projectList
  }))(SearchModel)
