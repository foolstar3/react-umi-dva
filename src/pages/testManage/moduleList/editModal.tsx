import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';

class EditModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.editSubmit = this.editSubmit.bind(this)
    this.editCancel = this.editCancel.bind(this)
    this.state={
      editVisible:false
    }
  }


  //在模态框中点击提交按钮
  editSubmit(value:any){
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
  }

  //修改项目的返回键
  editCancel = () => {
    this.props.editModal(false)
  }

  render(){
    const editVisible = this.props.editVisible
    return(
      <Modal
        visible={editVisible}
        title="修改模块信息"
        closable={false}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={this.editSubmit}
        >
        <Form.Item
          label="模块名称"
          name="module_name"
          rules={[{ required: true, message: '请输入模块名称' }]}
          // initialValue={this.props.tempValue.module_name}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="项目名称"
          name="project_name"
          rules={[{ required: true, message: '请输入项目名称' }]}
          // initialValue={this.props.tempValue.project_name}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          label="测试数"
          name="testcase_count"
          rules={[{ required: true, message: '请输入测试数' }]}
          // initialValue={this.props.tempValue.testcase_count}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="测试人员"
          name="test_user"
          rules={[{ required: true, message: '请输入测试人员名称' }]}
          // initialValue={this.props.tempValue.test_user}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="简要描述"
          name="description"
          rules={[{ required: false }]}
          // initialValue={this.props.tempValue.description}
        >
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item>
          <Space size='middle'>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={this.editCancel}>返回</Button>
          </Space>
        </Form.Item> 
      </Form>
    </Modal>
    )
  }
}


export default connect(({ moduleList }) => ({
  moduleList
  }))(EditModal)
