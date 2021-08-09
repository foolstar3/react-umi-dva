import React, { Component } from 'react';
import * as CodeMirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/javascript/javascript';
import { getEditorCode } from '@/services/getEditorCode';
import { connect } from 'umi';

// @connect(({editor})=>({
//   codeEditorFlag: editor.codeEditorFlag,
// }))
// 参考https://blog.csdn.net/JLU_Lei/article/details/80259697
export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      // codeEditor: false
    };
    // const {dispatch} = this.props
    // dispatch({
    //   type: 'editor/getCodeEditorFlag',
    // })
    // 通过api获取编辑器内部代码
    getEditorCode().then((res) => {
      this.setState(() => ({
        code: res.code,
      }));
    });
  }
  componentDidMount() {}
  componentDidUpdate() {
    // const {dispatch} = this.props
    // dispatch({
    //   type: 'editor/getCodeEditorFlag',
    // })
    // console.log(this.props.codeEditorFlag);
    // if(!this.props.codeEditorFlag) {
    // 获取需要editor化的元素
    // 元素必须为textarea标签
    let myTextarea = document.getElementById('editor');

    // 初始化editor相关配置
    this.CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
      mode: 'javascript', //编辑器语言
      theme: 'monokai', //编辑器主题
      extraKeys: { Ctrl: 'autocomplete' }, //ctrl可以弹出选择项
      lineNumbers: true, //显示行号
    });
    // dispatch({
    //   type: 'editor/changeCodeEditorFlag'
    // })
    // }
    // 设置editor中代码的默认值
    this.CodeMirrorEditor.setValue(this.state.code);
  }
  render() {
    return (
      <textarea className="form-control" id="editor" name="code"></textarea>
    );
  }
}
