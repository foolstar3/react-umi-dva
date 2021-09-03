import React from "react";
import { Tag, Switch, Collapse, Select,Form,Input,Modal,Table, Button, Space } from 'antd';
import { connect } from 'umi';
import TreeNode from "./treeNode";
const { Panel } = Collapse
const { Option } = Select
class EditModal extends React.Component{
  constructor(props: {} | Readonly<{}>){
    super(props);
    this.editSubmit = this.editSubmit.bind(this)
    this.editCancel = this.editCancel.bind(this)
    this.handleEditValueChange = this.handleEditValueChange.bind(this)
    this.state = {
      tempEditValue: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'testCase/getCaseList',
      payload: {
        page: 1 
      }
    })
    this.props.dispatch({
      type: 'projectList/getProjectList',
      payload: {
        page: 1 
      }
    })
    this.props.dispatch({
      type: 'envList/getEnvList',
      payload: {
        page: 1 
      }
    })
  }

  //在模态框中点击提交按钮
  editSubmit(){
    const editTask = this.state.tempEditValue
    const EditId = this.props.tempValue.id
    this.props.dispatch({
      type: 'taskList/editTaskList',
      payload: {
        ...editTask,
        id: EditId
      },
      callback: (res) =>{
        //console.log(res)
      }
    })
    this.props.showEditModal(false)
  }

  //修改项目的返回键
  editCancel = () => {
    this.props.showEditModal(false)
  }

  handleEditValueChange( singleValueChange, ValueChange){
    this.setState({
      tempEditValue: ValueChange
    })
  }

  handleEnvListVisible(){

  }

  handleProjectListVisible(){

  }
  render(){
    const { editVisible, tempValue  } = this.props
    const envList  = this.props?.envList?.envList?.results || []
    const projectList = this.props?.projectList?.projectList || []
    const caseList = this.props?.testCase?.caseList?.results || []
    const options = [{ value: 'blue' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]
    console.log('tempValue', tempValue)
    ///自定义列表参数
    function tagRender(props) {
      const { label, value, closable, onClose } = props;
      const onPreventMouseDown = event => {
        event.preventDefault();
        event.stopPropagation();
      };
      return (
        <Tag
          color = 'blue'
          onMouseDown = { onPreventMouseDown }
          closable = { closable }
          onClose = { onClose }
          style = {{ marginRight: 3 }}
        >
          {label}
        </Tag>
      );
    }
    return(
      <div>
        { editVisible && 
        <Modal
        visible = { editVisible }
        title = "修改任务信息"
        closable = { false }
        onOk = { this.editSubmit }
        onCancel = { this.editCancel }
        okText = '修改'
        okButtonProps = {{shape : 'round'}}
        cancelButtonProps = {{ shape: 'round' , type: 'text'}}
        >
          <Form
            name = "basic"
            labelCol = { { span: 5 } }
            wrapperCol = { { span: 16 } }
            initialValues = { { remember: true } }
            onValuesChange = { this.handleEditValueChange }
          >
            <Form.Item
              label = "任务名称"
              name = "name"
              rules = {[{ required: true, message: '请输入任务名称' }]}
              initialValue = { tempValue.name }
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label = "简要描述"
              name = "description"
              initialValue = { tempValue.description }
            >
              <Input/>
            </Form.Item>
            <Form.Item
              label = "状态"
              name = "testcase_count"
              rules = {[{ required: true, message: '请输入测试数' }]}
              initialValue = { tempValue.enabled }
            >
              <Switch
                checkedChildren = "启用"
                unCheckedChildren = "禁用"
                defaultChecked={ true }
                // onChange={(checked) => {
                //   this.onSwitchChange(checked, text, record);
                // }}
              />
            </Form.Item>
            <Form.Item
              label = "运行环境"
              name = "env"
              rules = {[{ required: true, message: '请选择运行环境' }]}
              initialValue = { tempValue.enabled }
            >
              {
                <Select
                  style = {{ width: 150 }}
                  onFocus = {this.handleEnvListVisible} 
                > 
                  {  
                    envList && Array.isArray(envList) && envList.length && envList.map((item) => {
                      return(
                        <Option value = {item.env_name}>{item.env_name}</Option> 
                      )
                    })
                  } 
                </Select>
              }
            </Form.Item>
            <Form.Item
              label = "项目名称"
              name = "project"
              rules = {[{ required: true, message: '请选择项目' }]}
            >
              {
                <Select
                  style = {{ width: 150 }}
                  onFocus = { this.handleProjectListVisible } 
                > 
                  {  
                    projectList && Array.isArray(projectList) && projectList.length && projectList.map((item) => {
                      return(
                        <Option value = { item.project_name }>{ item.project_name }</Option> 
                      )
                    })
                  } 
                </Select>
              }
            </Form.Item>
            <Form.Item
              label = "已选5用例"
              name = "cassNumber"
              rules = {[{ required: false }]}
            >
              <TreeNode
                caseList = { caseList }
              />
            </Form.Item>
            <Form.Item
              label = '邮件列表'
              name = 'emailList'
              rules = {[ {required: false} ]}
            >
              <Select
                mode = "multiple"
                showArrow
                tagRender = { tagRender }
                defaultValue = {['gold', 'cyan']}
                style = {{ width: '100%' }}
                options = { options }
              />
            </Form.Item>
          </Form>
        </Modal>
        }
      </div>
    )
  }
}


export default connect(({ taskList, envList, projectList, testCase }) => ({
  taskList, envList, projectList, testCase
  }))(EditModal)
