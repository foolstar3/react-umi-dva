import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class EditModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.editSubmit = this.editSubmit.bind(this)
    this.editCancel = this.editCancel.bind(this)
    this.state = {
      editVisible:false
    }
  }


  //在模态框中点击提交按钮
  editSubmit (value: any ) {
    const newValue = value
    newValue.create_time = '1'
    newValue.id = 15
    newValue.testcase_count=1
    newValue.module_count=1
    newValue.update_time = '1'
    const oldValue = this.props.modaleList.value
    let list = this.props.moduleList.list
    let spliceValueIndex = list.indexOf(list.filter(item=>item.module_name==oldValue.module_name)[0])
    list.splice(spliceValueIndex, 1, newValue)
    this.props.dispatch({
      type:'moduleList/editSubmit',
      payload:{
        list:list
      }
    })
    this.props.editModal(false)
  }

  //修改项目的返回键
  editCancel = () => {
    this.props.editModal(false)
  }

  render(){
    const {editVisible , tempValue } = this.props
    console.log('tempValue',tempValue)
    return(
      <Modal
        visible = { editVisible }
        title = "修改模块信息"
        closable = { false }
        footer = { null } 
      >
        <Form
          name = "basic"
          labelCol = { { span: 5 } }
          wrapperCol={ { span: 16 } }
          initialValues = { { remember: true } }
          onFinish = { this.editSubmit }
        >
        <Form.Item
          label = "参数名称"
          name = "var_name"
          rules = { [{ required: true, message: '请输入参数名称' }] }
          initialValue = {tempValue.var_name}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label = "项目名称"
          name = "project_name"
          rules = {[{ required: true, message: '请输入项目名称' }]}
          initialValue = { tempValue.project_name }
        >
          <Input/>
        </Form.Item>
        <Form.Item
            label = "参数值"
            name = "var_value"
            rules = { [{ required: true, message: '请输入测试数' }] }
            initialValue = { tempValue.var_value }
          >
            <Input />
        </Form.Item>
        <Form.Item
          label = "简要描述"
          name = "description"
          rules = { [{ required: false }] }
          initialValue = { tempValue.description }
        >
          <TextArea rows = { 3 } />
        </Form.Item>
        <Form.Item>
          <Space size = 'middle'>
            <Button type = "primary" htmlType = "submit" shape = 'round'>修改</Button>
            <Button onClick = { this.editCancel } shape = 'round'> 返回 </Button>
          </Space>
        </Form.Item> 
      </Form>
    </Modal>
    )
  }
}


export default connect(({ globalVarList }) => ({
    globalVarList
  }))(EditModal)
