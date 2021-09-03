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
        //debugTalk的内容值
        debugTalkContent: '',
        //操作的那一项debugTalk
        debugTalkId: '',
        tableLoading: true,
        total: 0
      }
    //显示代码输入框
    this.showPythonModal = this.showPythonModal.bind(this)
    //模态框显隐控制按钮
    this.showEditModal = this.showEditModal.bind(this)
    //页面加载完成
    this.getDebugTalkList = this.getDebugTalkList.bind(this)

    //加载列表
    this.getDebugTalkList()
  }
  

  getDebugTalkList(){
    this.setState({
      tableLoading: true
    })
    this.props.dispatch({
      type: 'debugTalkList/getDebugTalkList',
      payload: {
        page: 1
      },
      callback: (res)=>{
        this.setState({
          tableLoading: false,
          total: res.results.length
        })
      }
    })
  }

  showPythonModal(record :any){
    this.setState({
      editVisible: true, 
      debugTalkId: record.id,
      debugTalkContent: record.debugtalk
    })
  }


  showEditModal(childPythonState: any){
    this.setState({
      editVisible: childPythonState
    })
  }


  render(){
    const { tableLoading, total } = this.state
    const { debugTalkList } = this.props.debugTalkList
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      total: total,
      showTotal: ()=> `共 ${ total } 条`
    }

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
                  size = 'small'
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
            dataSource = { [...debugTalkList] }
            loading = { tableLoading }
            pagination = { paginationProps }
          />
        </Card>
        <EditTextModal
          showEditModal = { this.showEditModal }
          editVisible = { this.state.editVisible }
          debugTalkContent = { this.state.debugTalkContent }
          debugTalkId = { this.state.debugTalkId }
        />         
      </div>
    )
  }
}

export default connect(({ debugTalkList }) => ({
    debugTalkList
  }))(DebugTalkList)
  