import {  Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import './index.tsx'
export default function editProjectModal(){
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
}