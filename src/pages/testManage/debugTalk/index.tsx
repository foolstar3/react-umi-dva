import React from 'react';
import {  Card,Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import {EditOutlined, DeleteOutlined, PlusCircleOutlined} from '@ant-design/icons';
import { connect } from 'umi';
const { TextArea } = Input;
import './index.less';

class DebugTalkList extends React.Component{
  constructor(props: {} | Readonly<{}>){
      super(props)
  }

  componentDidMount(){

  }

  render(){
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
        dataIndex:'Debugtalk',
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
              <Space size='middle'>
                <Button type='primary'  onClick={()=>this.editModal(record)} icon={<EditOutlined/>}>编辑</Button>
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
            className="components-table-demo-nested"
            columns={columns}
            dataSource={[]}
          />
        </Card>
        <Modal
          visible={addVisible}
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
              name="project_name"
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label="模块数"
              name="module_count"
              rules={[{ required: true, message: '请输入用例数' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="负责人"
              name="leader"
              rules={[{ required: true, message: '请输入负责人名称' }]}
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
              label="开发人员"
              name="dev_user"
              rules={[{ required: true, message: '请输入开发人员名称' }]}
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
          title="修改项目信息"
          closable={false}
          footer={null}
        >
        </Modal>          
      </div>
    )
  }
}

export default connect(({ debugTalkList }) => ({
    debugTalkList
  }))(DebugTalkList)
  