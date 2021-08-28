import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';
import Editor from "@/pages/examples/editor";

class EditTextModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.editSubmit = this.editSubmit.bind(this)
    this.editCancel = this.editCancel.bind(this)
  }

  componentDidMount(){
    console.log('this.pros',this.props)
  }

  //在模态框中点击提交按钮
  editSubmit (value: any) {
    // const debugtalk_list = [...this.props.debugTalkList.list]
    // debugtalk_list.push(value)
    // this.props.dispatch({
    //   type: 'moduleList/updateModuleList',
    //   payload: {
    //     list: module_list
    //   }
    // })
    this.props.showEditModal(false)
  }

  //添加项目的返回键
  editCancel = () => {
    this.props.showEditModal(false)
  }

  render(){
    const {editVisible , debugTalkContent} = this.props
    console.log('ed', debugTalkContent)
    return(
      <Modal
      title = "编辑"
      onOk = { this.editSubmit }
      onCancel = { this.editCancel }
      visible={ editVisible }
      width={1200}
    >
      <Editor content = {debugTalkContent} />
      {/* {this.renderEditForm(this.state.currentEditParamsFile)} */}
    </Modal>
    )
  }
}


export default connect(({ debugTalkList }) => ({
  debugTalkList
  }))(EditTextModal)
