import React, { useState } from 'react';
import { connect } from 'dva';
import { Form, Select, Input, Collapse, Button, Col, Tree } from 'antd';
import styles from './index.less';

const { Panel } = Collapse;
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};

const MessageTab = ({
  caseDetail,
  projectData,
  moduleData,
  onProjectChange,
  onModuleChange,
  caseList,
}) => {
  const [curProject, setCurProject] = useState(caseDetail.project);
  const [curModuleName, setCurModuleName] = useState(caseDetail.module_name);
  const [curModuleId, setCurModuleId] = useState(caseDetail.module);
  const children = [];
  if (Object.keys(caseList).indexOf('results') !== -1) {
    caseList.results.map((item) => {
      item.title = item.name;
      item.key = `${curModuleId}-${item.id}`;
      return item;
    });
    children.push(...caseList.results);
  } else {
    caseList.map((item) => {
      item.title = item.name;
      item.key = `${curModuleId}-${item.id}`;
      return item;
    });
    children.push(...caseList);
  }

  const treeData = curModuleName
    ? [
        {
          title: curModuleName,
          key: curModuleId,
          children,
        },
      ]
    : [];

  const onProjectNameChange = (val) => {
    setCurProject(val);
    onProjectChange(val);
  };

  const onModuleNameChange = (module_id = '', project_id) => {
    console.log(module_id);
    if (module_id) {
      onModuleChange(module_id, project_id);
      const curModule = moduleData.find((item) => item.id === module_id);
      setCurModuleName(curModule.module_name);
      setCurModuleId(curModule.id);
    } else {
      onModuleChange('', project_id);
      setCurModuleName('');
      setCurModuleId('');
    }
  };

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Form {...formLayout} initialValues={caseDetail}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Col span={24}>
            <Form.Item label="用例名称" name="name">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="项目名称" name="project_name">
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                onChange={onProjectNameChange}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {projectData
                  ? projectData.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.project_name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="模块名称" name="module_name">
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                onChange={(val) => onModuleNameChange(val, curProject)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {moduleData
                  ? moduleData.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.module_name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} offset={4}>
            <Form.Item name="selection" wrapperCol={{ span: 19 }}>
              <Collapse>
                <Panel header="前后置步骤（可选）" key="selection">
                  <div className={styles.selectionContent}>
                    <div className={styles.topBtn}>
                      <Button type="primary">添加前置步骤</Button>
                      <Button type="primary">添加后置步骤</Button>
                    </div>
                    <div className={styles.selectionTree}>
                      <Tree
                        checkable
                        // defaultExpandedKeys={['0-0-0', '0-0-1']}
                        // defaultSelectedKeys={['0-0-0', '0-0-1']}
                        // defaultCheckedKeys={['0-0-0', '0-0-1']}
                        onSelect={onSelect}
                        onCheck={onCheck}
                        treeData={treeData}
                      />
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </div>
        <div className={styles.right}>
          <Col span={24}>
            <Form.Item name="before">
              <Collapse>
                <Panel header="前置步骤（选中）" key="selected_before"></Panel>
              </Collapse>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="after">
              <Collapse>
                <Panel header="后置步骤（选中）" key="selected_after"></Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </div>
      </div>
    </Form>
  );
};

export default MessageTab;
