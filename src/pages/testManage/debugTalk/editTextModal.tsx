import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';
import Editor from "@/components/Editor";

class EditTextModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.editSubmit = this.editSubmit.bind(this)
    this.editCancel = this.editCancel.bind(this)
    this.getEditorContent = this.getEditorContent.bind(this)
    this.state = {
      editContent: ''
    }

  }

  componentDidMount(){
    console.log('this.pros',this.props)
  }

  //在模态框中点击提交按钮
  editSubmit () {
    // this.props.dispatch({
    //   type: 'debugTalkList/editSubmit'
    //   payload: {

    //   }
    // })

    this.props.showEditModal(false)
  }

  //添加项目的返回键
  editCancel = () => {
    this.props.showEditModal(false)
  }

  //从Editor子组件中获取输入值
  getEditorContent(value: any){
    this.setState({
      editContent: value
    })
  }

  render(){
    const {editVisible , debugTalkContent} = this.props
    return(
      <Modal
      title = "编辑"
      onOk = { this.editSubmit }
      onCancel = { this.editCancel }
      visible={ editVisible }
      width={ 1200 }
    >
      <Editor 
        content = {debugTalkContent} 
        getEditorContent = {this.getEditorContent}  
      />
      {/* {this.renderEditForm(this.state.currentEditParamsFile)} */}
    </Modal>
    )
  }
}


export default connect(({ debugTalkList }) => ({
  debugTalkList
  }))(EditTextModal)
