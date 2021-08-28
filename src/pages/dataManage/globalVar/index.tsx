import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { connect } from 'umi';
import AddModal from "./addModal";
import EditModal from "./editModal";
import SearchModal from "./Search";
//获取接口参数
class GlobalVarList extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.showAddGlobalVar = this.showAddGlobalVar.bind(this)
    this.handleCreateGlobalVar = this.handleCreateGlobalVar.bind(this)
    this.editModal = this.editModal.bind(this)
    this.handleEditGlobalVar = this.handleEditGlobalVar.bind(this)
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'globalVarList/getGlobalVarList',
      payload: {
        page: 1
      }
    })
  }

  //添加按钮模态框
  showAddGlobalVar (childModalState: any) {
    console.log('childModalState', childModalState)
    this.setState({
      addVisible : childModalState
    })
  }

  handleCreateGlobalVar () {
    this.setState({
      addVisible : true
    })
  }


  //编辑的地方弹出模态框
  editModal ( record:any ) {
    this.setState({
      editVisible: true,
      tempValue: record
    })

  }

  handleEditGlobalVar ( childModalState:any ){
    this.setState({
      editVisible: childModalState
    })
  }

  //全局变量列表删除按钮
  handleDelete(value:any){
    const globalVar_list = [...this.props.globalVarList.list]
    const globalVarList = globalVar_list.filter((item)=>item.var_name!==value.var_name)
    this.props.dispatch({
      type: 'globalVarList/deleteGlobalVar',
      payload: {
        list:globalVarList
      }
    })
  }

  
  render(){
    const { editVisible, list } =  this.props.globalVarList
    const columns = [
      {
        title:'#',
        dataIndex:'id',
        key:'id'
      },
      { 
        title: '参数名称',
        dataIndex: 'var_name',
        key:'var_name'
      },
      { 
        title: '项目名称',
        dataIndex: 'project_name',
        key:'project_name' 
      },
      { 
        title: '参数值', 
        dataIndex: 'var_value',
        key:'test_user'
      },
      { 
        title: '简要描述',
        dataIndex: 'description',
        key:'description'
      },
      { 
        title: '创建时间',
        dataIndex: 'create_time',
        key:'create_time'
      },
      { 
        title: '更新时间',
        dataIndex: 'update_time',
        key:'update_time'
        },
      { title: '相关操作', 
        dataIndex:'relateAction',
        key:'relateAction',
        render: (_: any,record: any)=> {
          return (
            <div>
              <Space size = 'middle'>
                <Button
                 type = 'primary'  
                 onClick = { () => this.editModal(record) } 
                 icon = { <EditOutlined/> }
                 shape = 'round'
                 >
                  编辑
                 </Button>
                <Button
                 type = 'primary' 
                 danger onClick = { () => this.handleDelete( record ) } 
                 icon = { <DeleteOutlined/> }
                 shape = 'round'
                 >
                  删除
                </Button>
              </Space>
            </div>
          )
        }
      }
    ]   
    return (
      <div>
        <SearchModal/>
        <Card>
          <div className = 'button_addModule'>
            <Button type = 'primary' onClick = {this.handleCreateGlobalVar} icon = { <PlusCircleOutlined/> } >添加全局变量</Button>
          </div>
          <Table
            className = "components-table-demo-nested"
            columns = { columns }
            dataSource = { [...list] }
          />
        </Card>  
      
        <AddModal 
        showAddModal = { this.showAddGlobalVar }
        addVisible = { this.state.addVisible }
        />
        <EditModal 
        editModal = { this.handleEditGlobalVar } 
        editVisible = { this.state.editVisible }
        tempValue = { this.state.tempValue }
        /> 
      </div>
      
    )
  }

}


export default connect(({ globalVarList }) => ({
    globalVarList
  }))(GlobalVarList)
