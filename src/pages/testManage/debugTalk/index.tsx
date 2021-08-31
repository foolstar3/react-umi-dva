import React from 'react';
import {  Card,Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';
import EditTextModal from './editTextModal'

class DebugTalkList extends React.Component{
  constructor(props: {} | Readonly<{}>){
      super(props)
      this.state = {
        editVisible: false,
        debugTalkContent: ''
      }
    this.showPythonModal = this.showPythonModal.bind(this)
    this.showEditModal = this.showEditModal.bind(this)
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'debugTalkList/getDebugTalkList',
      payload: {
        page: 1
      }
    })
  }

  showPythonModal(record :any){
    this.setState({
      editVisible: true, 
      debugTalkContent: record.debugtalk
    })
  }


  showEditModal(childPythonState: any){
    this.setState({
      editVisible: childPythonState
    })
  }


  render(){
    const { list } = this.props.debugTalkList
    const columns = [
      { 
        title: '#',
        dataIndex: 'id',
        key:'id'
      },
      {
        title:'项目名称',
        dataIndex:'project_name',
        key:'project_name'
      },
      {
        title:'Debugtalk',
        dataIndex:'DebugTalk',
        key:'Debugtalk'
      },
      { 
        title: '创建时间',
        dataIndex: 'create_time',
        key:'create_time'
      },
      { 
        title: '更新时间',
        dataIndex: 'create_time',
        key:'create_time'
      },
      { title: '相关操作', 
        dataIndex:'relateAction',
        key:'relateAction',
        render: (text:any, record:any)=> {
          return (
            <div>
              <Space size = 'middle'>
                <Button
                  type = 'primary'  
                  onClick = { ()=>this.showPythonModal(record) } 
                  icon = { <EditOutlined/> }
                  shape = 'round'
                >
                  编辑
                </Button>
              </Space>
            </div>
          )
        }
      }
    ]
    return(
      <div>
        <Card>
          <Table
            className = "components-table-demo-nested"
            columns = { columns }
            dataSource = { [...list] }
          />
        </Card>
        <EditTextModal
          showEditModal = { this.showEditModal}
          editVisible = {this.state.editVisible}
          debugTalkContent = {this.state.debugTalkContent}
        />         
      </div>
    )
  }
}

export default connect(({ debugTalkList }) => ({
    debugTalkList
  }))(DebugTalkList)
  