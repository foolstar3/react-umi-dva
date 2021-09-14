import React from 'react';
import { Card, Select, Form, Input, Modal, Table, Button, Space } from 'antd';
const { TextArea } = Input;
import { connect } from 'umi';
import Editor from '@/components/Editor';

class EditTextModal extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.editSubmit = this.editSubmit.bind(this);
    this.editCancel = this.editCancel.bind(this);
    this.getEditorContent = this.getEditorContent.bind(this);
    this.state = {
      editContent: '',
    };
  }

  //在模态框中点击提交按钮
  editSubmit() {
    const debugTalkId = this.props.debugTalkId;
    const editContent = this.state.editContent;
    this.props.dispatch({
      type: 'debugTalkList/editSubmit',
      payload: {
        id: debugTalkId,
        debugtalk: editContent,
      },
    });
  }

  //添加项目的返回键
  editCancel = () => {};

  //从Editor子组件中获取输入值
  getEditorContent(value: any) {
    this.setState({
      editContent: value,
    });
  }

  render() {
    const { debugTalkContent } = this.props;
    return (
      <Editor
        content={debugTalkContent}
        getEditorContent={this.getEditorContent}
      />
    );
  }
}

export default connect(({ debugTalkList }) => ({
  debugTalkList,
}))(EditTextModal);
