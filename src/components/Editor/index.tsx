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

// 参考https://blog.csdn.net/JLU_Lei/article/details/80259697

export default class Editor extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  /*
   *
   * @param getEditorContent 获取当前editor内代码
   *
   */
  // 输入变化时获取编辑器中的code,向debugtalk这个父组件传值，父组件接收后，点击提交按钮，进行dispatch。LSQ编写
  getEditorCode(contentValue: any) {
    this.props.getEditorContent(contentValue);
  }

  render() {
    const { content } = this.props;
    return (
      <CodeMirror
        ref="editor"
        value={content}
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
        onChange={(editor, data, contentValue) => {
          this.getEditorCode(contentValue);
        }}
      />
    );
  }
}
