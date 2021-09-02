import React from "react";
import { Switch, Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';
import projectList from "../projectList";
const { Option } = Select
class AddModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleEnvListVisible = this.handleEnvListVisible.bind(this)
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload: {
        page: 1 
      }
    })
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1 
      }
    })
  }

  //点击运行环境触发事件，去envlist搜索环境列表然后打印出来每一条
  handleEnvListVisible(){

  }

  //在模态框中点击提交按钮
  handleSubmit (value: any) {
    // const date = new Date();
    // const dateNow = date.getFullYear() + '-'
    //                 + (date.getMonth()+1) + '-'
    //                 + date.getDate() + ' '
    //                 + date.getHours() + ':'
    //                 + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes()); 
    // value.create_time = dateNow 
    // const module_list = [...this.props.moduleList.list]
    // module_list.push(value)
    // this.props.dispatch({
    //   type: 'moduleList/updateModuleList',
    //   payload: {
    //     list: module_list
    //   }
    // })
    this.props.showAddModal(false)
  }

  //添加项目的返回键
  handleCancel = () => {
    this.props.showAddModal(false)
  }

  render(){
    const addVisible = this.props.addVisible
    const envList  = this.props?.envList?.envList?.results || []
    const projectList = this.props?.projectList?.projectList || []
    console.log('projectList',projectList)
    return(
      <Modal
        visible = { addVisible }
        title = "新增任务"
        closable = { false }
        footer = { null } 
      >
        <Form
          name = "basic_taskList"
          labelCol = {{ span: 5 }}
          wrapperCol = {{ span: 16 }}
          initialValues = {{ remember: true }}
          onFinish = {this.handleSubmit}
        >
          <Form.Item
            label = "任务名称"
            name = "name"
            rules = {[{ required: true, message: '请输入任务名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label = "简要描述"
            name = "description"
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label = "状态"
            name = "testcase_count"
            rules = {[{ required: true, message: '请输入测试数' }]}
          >
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked={true}
              // onChange={(checked) => {
              //   this.onSwitchChange(checked, text, record);
              // }}
            />
          </Form.Item>
          <Form.Item
            label = "运行环境"
            name = "env"
            rules = {[{ required: true, message: '请选择运行环境' }]}
          >
            {
              <Select
                style = {{ width: 150 }}
                onFocus = {this.handleEnvListVisible} 
              > 
                {  
                  envList && Array.isArray(envList) && envList.length && envList.map((item) => {
                    return(
                      <Option value = {item.env_name}>{item.env_name}</Option> 
                    )
                  })
                } 
              </Select>
            }
          </Form.Item>
          <Form.Item
            label = "项目名称"
            name = "project"
            rules = {[{ required: true, message: '请选择项目' }]}
          >
            {
              <Select
                style = {{ width: 150 }}
                onFocus = {this.handleEnvListVisible} 
              > 
                {  
                  projectList && Array.isArray(projectList) && projectList.length && projectList.map((item) => {
                    return(
                      <Option value = {item.project_name}>{item.project_name}</Option> 
                    )
                  })
                } 
              </Select>
            }
          </Form.Item>
          <Form.Item
            label = "已选5用例"
            name = "description"
            rules = {[{ required: false }]}
          >
            <TextArea rows = {3} />
          </Form.Item>
          <Form.Item>
            <Space size = 'middle'>
              <Button type = "primary" htmlType = "submit">提交</Button>
              <Button onClick = { this.handleCancel }>返回</Button>
            </Space>
          </Form.Item> 
          <Form.Item
            label = "简要描述"
            name = "description"
            rules = {[{ required: false }]}
          >
            <TextArea rows = {3} />
          </Form.Item>
          <Form.Item>
            <Space size = 'middle'>
              <Button type = "primary" htmlType = "submit">提交</Button>
              <Button onClick = { this.handleCancel }>返回</Button>
            </Space>
          </Form.Item> 
        </Form>
      </Modal>
    )
  }
}


export default connect(({ taskList, envList, projectList }) => ({
  taskList, envList, projectList
  }))(AddModal)

  