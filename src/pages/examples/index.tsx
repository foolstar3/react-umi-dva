
import React from 'react';
import {  Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';

const { TextArea } = Input;
class ItemList extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props)
    this.state = {
      itemList:[
        {
          itemName: '2',
          createKey:0,
          modelNum: '2',
          userName: '2',
          testUsername: '2',
          developUsername: '2',
          contents: '2',
          createTime:'111111'
        }
      ],
      loading:false,
      visible:false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  //获取表单内的数据
  
  handleCancel = () => {
    this.setState({ visible: false });
  }

  
  handleSubmit (value: any) {
    const date = new Date();
    const dateNow = date.getFullYear()+'-'
                    +(date.getMonth()+1)+'-'
                    +date.getDate()+' '
                    +date.getHours()+':'
                    +((date.getMinutes()<10)?('0'+date.getMinutes()):date.getMinutes()); 
    value.createTime = dateNow 
    const itemList = [...this.state.itemList]
    value.creatKey = Date.parse(date)
    itemList.push(value)
    this.setState({
      itemList:itemList,
      visible:false,
    })
    console.log(itemList)
  }

  handleDelete(value:any){
    const itemList = [...this.state.itemList]
    console.log(itemList)
    this.setState({
      itemList:itemList.filter((item)=>item.creatKey!==value.creatKey)
    })
  }
  
  render () {
    const visible = this.state.visible
    const loading = this.state.loading
    const columns = [
      { 
        title: '项目名称',
        dataIndex: 'itemName',
        key:'itemName'
      },
      { 
        title: '模块/用例数',
        dataIndex: 'modelNum',
        key:'modelNum' 
      },
      { 
        title: '负责人',
        dataIndex: 'userName',
        key:'userName'
      },
      { 
        title: '测试人员', 
        dataIndex: 'testUsername',
        key:'testUsername'
      },
      { 
        title: '开发人员',
        dataIndex: 'developUsername',
        key:'developUsername'
      },
      { 
        title: '简要描述',
        dataIndex: 'contents',
        key:'contents'
      },
      { 
        title: '创建时间',
        dataIndex: 'createTime',
        key:'createTime'
      },
      { title: '相关操作', 
        dataIndex:'relateAction',
        key:'relateAction',
        render: (_: any, projectItem: any)=> {
          return (
            <div>
              <Space size='middle'>
                <Button type='primary' icon={<EditOutlined/>}>编辑</Button>
                <Button type='primary' danger onClick={() => this.handleDelete(projectItem)} icon={<DeleteOutlined/>}>删除</Button>
              </Space>
            </div>
          )
        }
      }
    ]
    return (
      <div>
        <Button type='primary' onClick={this.showModal} icon= {<PlusCircleOutlined/>} >添加项目</Button>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={this.state.itemList}
        />
        <Modal
          visible={visible}
          title="项目信息"
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
              label="项目名称"
              name="itemName"
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="模块/用例数"
              name="modelNum"
              rules={[{ required: true, message: '请输入用例数' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="负责人"
              name="userName"
              rules={[{ required: true, message: '请输入负责人名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="测试人员"
              name="testUsername"
              rules={[{ required: true, message: '请输入测试人员名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="开发人员"
              name="developUsername"
              rules={[{ required: true, message: '请输入开发人员名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="简要描述"
              name="contents"
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
      </div>
    )
  }
}

export default ItemList