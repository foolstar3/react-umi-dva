import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class AddModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleAddValueChange = this.handleAddValueChange.bind(this)
    this.state = {
      tempAddValue: ''
    }
  }

  
  //在模态框中点击提交按钮
  handleSubmit () {
    const addModule = this.state.tempAddValue
    this.props.dispatch({
      type: 'moduleList/addModuleList',
      payload: {
        ...addModule,
      },
      callback: (res) =>{
        //console.log(res)
      }
    })
    this.props.showAddModal(false)
  }

  //添加模块中监听所有值的变化
  handleAddValueChange( singleValueChange, ValueChange ){
    this.setState({
      tempAddValue: ValueChange
    })
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
        onOk = { this.handleSubmit }
        onCancel = { this.handleCancel }
        okText = '增加'
        okButtonProps = {{shape : 'round'}}
        cancelButtonProps = {{ shape: 'round' , type: 'text'}}
      >
        <Form
          name = "basic_moduleList"
          labelCol = {{ span: 5 }}
          wrapperCol = {{ span: 16 }}
          initialValues = {{ remember: false }}
          onValuesChange = {this.handleAddValueChange}
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
        </Form>
      </Modal>
    )
  }
}


export default connect(({ moduleList }) => ({
  moduleList
  }))(AddModal)
