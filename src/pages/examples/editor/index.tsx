import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.js';
// 引入样式文件
import 'codemirror/lib/codemirror.css';
// 引入主题文件
import 'codemirror/theme/monokai.css';
// 代码模式
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
//ctrl+空格代码提示补全
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/anyword-hint.js';
//代码高亮
import 'codemirror/addon/selection/active-line';
//折叠代码
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/edit/closebrackets';
import { connect } from 'umi';

// @connect(({editor})=>({
//   codeEditorFlag: editor.codeEditorFlag,
// }))
// 参考https://blog.csdn.net/JLU_Lei/article/details/80259697

@connect(({ paramsFile }) => ({
  code: paramsFile.paramsFileCode,
}))
export default class Editor extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   code: '',
    // };
    this.getEditorCode = this.getEditorCode.bind(this);
  }

  // 更新编辑器中的code
  getEditorCode(value) {
    const { dispatch } = this.props;
    // 同步到models中
    dispatch({
      type: 'paramsFile/setEditorCode',
      payload: value,
    });
  }

  componentDidMount() {}
  componentDidUpdate() {}
  componentWillReceiveProps(prevProps) {}
  render() {
    const { content } = this.props;

    // const {payload} = content
    // const {res} = payload
    return (
      <CodeMirror
        ref="editor"
        height={500}
        value={content.context}
        options={{
          mode: {
            // json编辑器模式
            name: 'text/javascript',
            json: true,
            // python编辑器模式
            // name: 'python'
          },
          theme: 'monokai',
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {
          this.getEditorCode(value);
        }}
      />
    );
  }
}
