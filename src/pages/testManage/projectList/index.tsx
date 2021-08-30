import React from 'react';
import {  Card,Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';

//获取接口参数

class ProjectList extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.showAddModal = this.showAddModal.bind(this)
    this.editModal = this.editModal.bind(this)
    this.editSubmit = this.editSubmit.bind(this)
    this.editCancel = this.editCancel.bind(this)
  }

  componentDidMount () {
    console.log('componentDidMount', this.props)
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1
      }
    })
  }

  //添加项目，打开模态框
  showAddModal = () => {
    this.props.dispatch({
      type: 'projectList/showAddModal',
      payload: {
        addVisible:true
      }
    })
  }
  //编辑的地方弹出模态框
  editModal (record:any) {
    this.props.dispatch({
      type: 'projectList/editModal',
      payload: {
        editVisible:true,
        value:record
      }
    })
  }
  //添加项目模态框的返回键
  handleCancel = () => {
    this.props.dispatch({
      type: 'projectList/showAddModal',
      payload: {
        addVisible:false
      }
    })
  }
  //修改项目模态框的返回键
  editCancel = () => {
    this.props.dispatch({
      type: 'projectList/updateProjectList',
      payload: {
        editVisible:false
      }
    })
  }

  //在添加项目的模态框中点击提交按钮
  handleSubmit (value: any) {
    const date = new Date();
    const dateNow = date.getFullYear()+'-'
                    +(date.getMonth()+1)+'-'
                    +date.getDate()+' '
                    +date.getHours()+':'
                    +((date.getMinutes()<10)?('0'+date.getMinutes()):date.getMinutes()); 
    value.create_time = dateNow 
    const project_list = [...this.props.projectList.list]
    project_list.push(value)
    this.props.dispatch({
      type: 'projectList/addProjectList',
      payload: {
        list:project_list,
        addVisible:false
      }
    })
  }
  //项目表单每一项中的删除按钮
  handleDelete(value:any){
    const project_list = [...this.props.projectList.list]
    const projectlsit = project_list.filter((item)=>item.project_name !== value.project_name)
    this.props.dispatch({
      type: 'projectList/deleteProjectList',
      payload: {
        list:projectlsit
      }
    })
  }

  //项目列表单每一项的编辑提交
  editSubmit(value:any){
    const newValue = value
    newValue.create_time = '1'
    newValue.id = 15
    newValue.testcase_count=1
    newValue.module_count=1
    newValue.update_time = '1'
    const oldValue = this.props.projectList.value
    let list = this.props.projectList.list
    let spliceValueIndex = list.indexOf(list.filter(item=>item.project_name==oldValue.project_name)[0])
    list.splice(spliceValueIndex, 1, newValue)

    this.props.dispatch({
      type:'projectList/editSubmit',
      payload:{
        list:list,
        editVisible:false
      }
    })
  }

  render () {
    const { editVisible, addVisible, list } =  this.props.projectList
    const columns = [
      {
        title:'项目编号',
        dataIndex:'id',
        key:'id'
      },
      { 
        title: '项目名称',
        dataIndex: 'project_name',
        key:'project_name'
      },
      { 
        title: '模块数',
        dataIndex: 'module_count',
        key:'modelNum' 
      },
      {
        title:'测试数',
        dataIndex:'testcase_count',
        key:'testcase_count'
      },
      { 
        title: '负责人',
        dataIndex: 'leader',
        key:'leader'
      },
      { 
        title: '测试人员', 
        dataIndex: 'test_user',
        key:'test_user'
      },
      { 
        title: '开发人员',
        dataIndex: 'dev_user',
        key:'dev_user'
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
      { title: '相关操作', 
        dataIndex:'relateAction',
        key:'relateAction',
        render: (text:any, record:any)=> {
          return (
            <div>
              <Space size='middle'>
                <Button
                  type = 'primary'  
                  onClick = { () => this.editModal(record) } 
                  icon = { <EditOutlined/> }
                  shape = 'round'
                >
                  编辑
                </Button>
                <Button 
                  type = 'primary' danger 
                  onClick = { () => this.handleDelete(record)} 
                  icon = {<DeleteOutlined/> }
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
        <Card>
          <div className = 'button_addProject'>
            <Button type = 'primary' onClick = { this.showAddModal } icon = { <PlusCircleOutlined/> } >添加项目</Button>
          </div>
          <Table
            className = "components-table-demo-nested"
            columns = { columns }
            dataSource = { [...list] }
          />
        </Card>
        
        <Modal
          visible = { addVisible }
          title = "项目信息"
          closable = { false }
          footer = { null }
        >
          <Form
            name = "basic_projectList"
            labelCol = { { span: 5 } }
            wrapperCol = { { span: 16 } }
            initialValues = { { remember: true } }
            onFinish = { this.handleSubmit }
          >
            <Form.Item
              label = "项目名称"
              name = "project_name"
              rules = { [{ required: true, message: '请输入项目名称' }] }
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label = "模块数"
              name = "module_count"
              rules = { [{ required: true, message: '请输入用例数' }] }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "负责人"
              name = "leader"
              rules = { [{ required: true, message: '请输入负责人名称' }] }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "测试人员"
              name = "test_user"
              rules = { [{ required: true, message: '请输入测试人员名称' }] }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "开发人员"
              name = "dev_user"
              rules = { [{ required: true, message: '请输入开发人员名称' }] }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "简要描述"
              name = "description"
              rules = { [{ required: false }] }
            >
              <TextArea rows = { 3 } />
            </Form.Item>
            <Form.Item>
              <Space size = 'middle'>
                <Button type = "primary" htmlType = "submit">提交</Button>
                <Button onClick = { this.handleCancel }>返回</Button>
              </Space>
            </Form.Item> 
          </Form>
        </Modal>


        <Modal
          visible = { editVisible }
          title = "修改项目信息"
          closable = { false }
          footer = { null }
        >
          <Form
            name = "basic"
            labelCol = { { span: 5 } }
            wrapperCol = { { span: 16 } }
            initialValues = { { remember: true } }
            onFinish = { this.editSubmit }
          >
            <Form.Item
              label = "项目名称"
              name = "project_name"
              rules = { [{ required: true, message: '请输入项目名称' }] }
              initialValue = { this.props.projectList.value.project_name }
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label = "模块数"
              name = "module_count"
              rules = { [{ required: true, message: '请输入用例数' }] }
              initialValue = { this.props.projectList.value.module_count }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "负责人"
              name = "leader"
              rules = { [{ required: true, message: '请输入负责人名称' }] }
              initialValue = {  this.props.projectList.value.leader }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "测试人员"
              name = "test_user"
              rules = { [{ required: true, message: '请输入测试人员名称' }] }
              initialValue = { this.props.projectList.value.test_user }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "开发人员"
              name = "dev_user"
              rules = { [{ required: true, message: '请输入开发人员名称' }] } 
              initialValue = { this.props.projectList.value.dev_user }
            >
              <Input />
            </Form.Item>
            <Form.Item
              label = "简要描述"
              name = "description"
              rules = { [{ required: false }] }
              initialValue = { this.props.projectList.value.description }
            >
              <TextArea rows = { 3 } />
            </Form.Item>
            <Form.Item>
              <Space size = 'middle'>
                <Button type = "primary" htmlType = "submit">确认修改</Button>
                <Button onClick = { this.editCancel }>返回</Button>
              </Space>
            </Form.Item> 
          </Form>
        </Modal>          
      </div>
    )
  }
}

export default connect(({ projectList }) => ({
  projectList
}))(ProjectList)
