import React from "react";
import { Card, Select,Form,Input,Modal,Table, Button, Space, Popconfirm } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined, QuestionCircleOutlined} from '@ant-design/icons';
import { connect } from 'umi';
import AddModal from "./addModal";
import EditModal from "./editModal";
import SearchModal from "./Search";
//获取接口参数
class GlobalVarList extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.showAddModal = this.showAddModal.bind(this)
    this.handleAddGlobalVar = this.handleAddGlobalVar.bind(this)
    this.handleEditModal = this.handleEditModal.bind(this)
    this.showEditModal = this.showEditModal.bind(this)
    this.state = {
      addVisible: false,
      editVisible: false,
      tempValue: '',
      tableLoading: true,
      total:0
    }
    this.getGlobalVarList()
  }

  getGlobalVarList(){
    this.props.dispatch({
      type: 'globalVarList/getGlobalVarList',
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

/* =======================新增按钮及模态框功能=========================== */
  //添加按钮模态框
  
  showAddModal () {
    this.setState({
      addVisible : true
    })
  }

  handleAddGlobalVar (childModalState: any) {
    this.setState({
      addVisible : childModalState
    })
  }


/* =======================编辑按钮及模态框功能=========================== */
  //编辑的地方弹出模态框
  showEditModal ( record:any ) {
    this.setState({
      editVisible: true,
      tempValue: record
    })

  }
  handleEditModal ( childModalState:any ){
    this.setState({
      editVisible: childModalState
    })
  }

/* =======================删除按钮及模态框功能=========================== */
  //全局变量列表删除按钮
  handleDelete(record: any){
    this.props.dispatch({
      type: 'globalVarList/deleteModuleList',
      payload: {
        id: record.id
      },
      callback: (res) =>{
        console.log(res)
        ///还需要调用获取列表
      }
    })
  }

  
  render(){
    const { tableLoading, total } = this.state
    const { editVisible, globalVarList } =  this.props.globalVarList
    globalVarList.map((item) =>{
      item.key = item.id
    })
    const paginationProps = {
      showSizeChanger: false,
      showQuickJumper: true,
      total: total,
      showTotal: ()=> `共${total}条`
    }
    const columns = [
      {
        title:'#',
        dataIndex:'id',
        key:'id',
        align: 'center'
      },
      { 
        title: '参数名称',
        dataIndex: 'var_name',
        key:'var_name',
        align: 'center'
      },
      { 
        title: '项目名称',
        dataIndex: 'project_name',
        key:'project_name' ,
        align: 'center'
      },
      { 
        title: '参数值', 
        dataIndex: 'var_value',
        key:'test_user',
        align: 'center'
      },
      { 
        title: '简要描述',
        dataIndex: 'description',
        key:'description',
        align: 'center'
      },
      { 
        title: '创建时间',
        dataIndex: 'create_time',
        key:'create_time',
        align: 'center'
      },
      { 
        title: '更新时间',
        dataIndex: 'update_time',
        key:'update_time',
        align: 'center'
        },
      { title: '相关操作', 
        dataIndex:'relateAction',
        key:'relateAction',
        align: 'center',
        render: (_: any,record: any)=> {
          return (
            <div>
              <Space size = 'small'>
                <Button
                 type = 'primary'  
                 onClick = { () => this.showEditModal(record) } 
                 icon = { <EditOutlined/> }
                 shape = 'round'
                 size = 'small'
                 >
                  编辑
                 </Button>
                <Popconfirm 
                  title = "Are you 确定？" 
                  icon = { <QuestionCircleOutlined style = {{ color: 'red' }} />}
                  onConfirm = { () => this.handleDelete( record ) } 
                >
                  <Button
                  type = 'primary' 
                  danger 
                  icon = { <DeleteOutlined/> }
                  shape = 'round'
                  size = 'small'
                  >
                    删除
                  </Button>
                </Popconfirm>
              </Space>
            </div>
          )
        }
      }
    ]   
    return (
      <div>
        <Card>
          <SearchModal/>
          <div className = 'ant-btn-add'>
            <Button 
              type = 'primary' 
              onClick = { this.handleAddGlobalVar } 
              icon = { <PlusCircleOutlined/> }
              shape = 'round' 
            >
              添加全局
            </Button>
          </div>
          <Table
            className = "components-table-demo-nested"
            columns = { columns }
            dataSource = { [...globalVarList] }
            loading = { tableLoading }
            pagination = { paginationProps }
            bordered
          />
        </Card>  
      
        <AddModal 
        showAddModal = { this.handleAddGlobalVar }
        addVisible = { this.state.addVisible }
        />
        <EditModal 
        showEditModal = { this.handleEditModal } 
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
