import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class AddModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.state = {
      addVisible: true
    }
  }

  componentDidMount(){
    console.log('this.pros',this.props)
  }

  //在模态框中点击提交按钮
  handleSubmit (value: any) {
    const date = new Date();
    const dateNow = date.getFullYear() + '-'
                    + (date.getMonth()+1)+'-'
                    + date.getDate()+' '
                    + date.getHours()+':'
                    + ((date.getMinutes() < 10) ? ('0' + date.getMinutes()) : date.getMinutes()); 
    value.create_time = dateNow 
    const globalVar_list = [...this.props.globalVarList.list]
    globalVar_list.push(value)
    this.props.dispatch({
      type: 'globalVarList/updateGlobalVarList',
      payload: {
        list: globalVar_list
      }
    })
    this.props.showAddModal(false)
  }

  //添加项目的返回键
  handleCancel = () => {
    this.props.showAddModal(false)
  }

  render(){
    const addVisible = this.props.addVisible
    return(
      <Modal
        visible = {addVisible}
        title = "模块信息"
        closable = {false}
        footer = {null}
      >
        <Form
          name = "basic_moduleList"
          labelCol = {{ span: 5 }}
          wrapperCol = {{ span: 16 }}
          initialValues = {{ remember: true }}
          onFinish = {this.handleSubmit}
          
        >
          <Form.Item
            label = "模块名称"
            name = "module_name"
            rules = {[{ required: true, message: '请输入模块名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label = "项目名称"
            name = "project_name"
            rules = {[{ required: true, message: '请输入模块名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label = "测试数"
            name = "testcase_count"
            rules = {[{ required: true, message: '请输入测试数' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label = "测试人员"
            name = "test_user"
            rules = {[{ required: true, message: '请输入测试人员名称' }]}
          >
            <Input />
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
              <Button onClick = {this.handleCancel}>返回</Button>
            </Space>
          </Form.Item> 
        </Form>
      </Modal>
    )
  }
}


export default connect(({ moduleList }) => ({
  moduleList
  }))(AddModal)
