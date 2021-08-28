import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';
import SearchModal from "./Search";
import AddModal from "./addModal";
import EditModal from "./editModal";
//获取接口参数
class ModuleList extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.showAddModal = this.showAddModal.bind(this)
    this.handleCreateModule = this.handleCreateModule.bind(this)
    this.handleEditModal = this.handleEditModal.bind(this)
    this.showEditModal = this.showEditModal.bind(this)
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload: {
        page: 1
      }
    })
  }

  //添加模态框，提交时传过来的子组件——模态框的返回值
  showAddModal (childModalState: any) {
    console.log('childModalState', childModalState)
    this.setState({
      addVisible : childModalState
    })
  }

  handleCreateModule () {
    this.setState({
      addVisible : true
    })
  }


  //编辑的地方弹出模态框
  handleEditModal (record:any) {
    console.log('record',record)
    this.setState({
      editVisible: true,
      tempValue: record
    })
  }
  //子模块--模态框传值
  showEditModal(childModalState: any){
    this.setState({
      editVisible : childModalState
    })
  }

  //模块列表删除按钮
  handleDelete(value:any){
    const module_list = [...this.props.moduleList.list]
    const moduleList = module_list.filter((item)=>item.module_name!==value.module_name)
    this.props.dispatch({
      type: 'moduleList/deleteModuleList',
      payload: {
        list:moduleList
      }
    })
  }

  
  render(){
    const { editVisible, list } =  this.props.moduleList
    const columns = [
      {
        title:'模块编号',
        dataIndex:'id',
        key:'id'
      },
      { 
        title: '模块名称',
        dataIndex: 'module_name',
        key:'module_name'
      },
      { 
        title: '项目名称',
        dataIndex: 'project_name',
        key:'project_name' 
      },
      {
        title:'测试数',
        dataIndex:'testcase_count',
        key:'testcase_count'
      },
      { 
        title: '测试人员', 
        dataIndex: 'test_user',
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
        render: (_: any,record: any) => {
          return (
            <div>
              <Space size = 'middle'>
                <Button type = 'primary'  onClick = { () => this.handleEditModal(record) } icon = { <EditOutlined/> }>编辑</Button>
                <Button type = 'primary' danger onClick = { () => this.handleDelete(record) } icon = {<DeleteOutlined/>}>删除</Button>
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
            <Button type = 'primary' onClick = { this.handleCreateModule } icon = { <PlusCircleOutlined/> } >添加模块</Button>
          </div>
          <Table
            className = "components-table-demo-nested"
            columns = { columns }
            dataSource = { [...list] }
          />
        </Card>  
      
        <AddModal 
          showAddModal = { this.showAddModal }
          addVisible = { this.state.addVisible }
        />
        <EditModal 
          editModal = { this.showEditModal }
          editVisible = { this.state.editVisible }
          tempValue = { this.state.tempValue }
        />
      </div>
      
    )
  }

}


export default connect(({ moduleList }) => ({
  moduleList
  }))(ModuleList)
