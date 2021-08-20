import React from "react";
import {  Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';
//获取接口参数
class ModuleList extends React.Component{
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



  componentDidMount(){
    this.props.dispatch({
      type: 'moduleList/getModuleList',
      payload: {
        page: 1
      }
    })
  }

  //添加模块，打开模态框
  showAddModal = () => {
    this.props.dispatch({
      type: 'moduleList/showAddModal',
      payload: {
        addVisible:true
      }
    })
  }
  //编辑的地方弹出模态框
  editModal (record:any) {
    this.props.dispatch({
      type: 'moduleList/editModal',
      payload: {
        editVisible:true,
        value:record
      }
    })
  }
  //添加项目的返回键
  handleCancel = () => {
    this.props.dispatch({
      type: 'moduleList/showAddModal',
      payload: {
        addVisible:false
      }
    })
  }
  //修改项目模态框的返回键
  editCancel = ()=> {
    this.props.dispatch({
      type: 'moduleList/editModal',
      payload: {
        editVisible:false
      }
    })
  }

  //在模态框中点击提交按钮
  handleSubmit (value: any) {
    console.log('value',value)
    const date = new Date();
    const dateNow = date.getFullYear()+'-'
                    +(date.getMonth()+1)+'-'
                    +date.getDate()+' '
                    +date.getHours()+':'
                    +((date.getMinutes()<10)?('0'+date.getMinutes()):date.getMinutes()); 
    value.create_time = dateNow 
    const module_list = [...this.props.moduleList.list]
    module_list.push(value)
    this.props.dispatch({
      type: 'moduleList/addModuleList',
      payload: {
        list:module_list,
        addVisible:false
      }
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

  //项目列表单每一项的编辑提交
  editSubmit(value:any){
    const newValue = value
    newValue.create_time = '1'
    newValue.id = 15
    newValue.testcase_count=1
    newValue.module_count=1
    newValue.update_time = '1'
    const oldValue = this.props.moduleList.value
    let list = this.props.moduleList.list
    let spliceValueIndex = list.indexOf(list.filter(item=>item.module_name==oldValue.module_name)[0])
    list.splice(spliceValueIndex, 1, newValue)

    this.props.dispatch({
      type:'moduleList/editSubmit',
      payload:{
        list:list,
        editVisible:false
      }
    })
  }
  
  render(){
    const { editVisible, addVisible, list } =  this.props.moduleList
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
        render: (_: any,record: any)=> {
          return (
            <div>
              <Space size='middle'>
                <Button type='primary'  onClick={()=>this.editModal(record)} icon={<EditOutlined/>}>编辑</Button>
                <Button type='primary' danger onClick={() => this.handleDelete(record)} icon={<DeleteOutlined/>}>删除</Button>
              </Space>
            </div>
          )
        }
      }
    ]   
    return (
      <div>
          <div className='button_addModule'>
            <Button type='primary' onClick={this.showAddModal} icon= {<PlusCircleOutlined/>} >添加模块</Button>
          </div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        dataSource={list}
      />
      <Modal
        visible={addVisible}
        title="模块信息"
        closable={false}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={this.handleSubmit}
        >
          <Form.Item
            label="模块名称"
            name="module_name"
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="项目名称"
            name="project_name"
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="测试数"
            name="testcase_count"
            rules={[{ required: true, message: '请输入测试数' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="测试人员"
            name="test_user"
            rules={[{ required: true, message: '请输入测试人员名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="简要描述"
            name="description"
            rules={[{ required: false }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Space size='middle'>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button onClick={this.handleCancel}>返回</Button>
            </Space>
          </Form.Item> 
        </Form>
      </Modal>
        
      <Modal
        visible={editVisible}
        title="修改模块信息"
        closable={false}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={this.editSubmit}
        >
          <Form.Item
            label="模块名称"
            name="module_name"
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="项目名称"
            name="project_name"
            rules={[{ required: true, message: '请输入模块名称' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="测试数"
            name="testcase_count"
            rules={[{ required: true, message: '请输入测试数' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="测试人员"
            name="test_user"
            rules={[{ required: true, message: '请输入测试人员名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="简要描述"
            name="description"
            rules={[{ required: false }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item>
            <Space size='middle'>
              <Button type="primary" htmlType="submit">提交</Button>
              <Button onClick={this.editCancel}>返回</Button>
            </Space>
          </Form.Item> 
        </Form>
      </Modal>

    </div>
      
    )
  }

}


export default connect(({ moduleList }) => ({
  moduleList
  }))(ModuleList)
