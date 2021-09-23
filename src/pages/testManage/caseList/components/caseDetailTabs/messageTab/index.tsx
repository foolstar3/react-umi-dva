import React, { useState } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { Form, Select, Input, Collapse, Button, Col, Tree } from 'antd';
import styles from './index.less';
import DragableTable from '@/components/DragableTable';

const { Option } = Select;
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
  getMessageData,
}) => {
  const [form] = Form.useForm();
  const [curBefore, setCurBefore] = useState(caseDetail.before);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [beforeTableData, setBeforeTableData] = useState([]);
  const [afterTableData, setAfterTableData] = useState([]);
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

  const exportChildren = [];
  const treeData = curModuleName
    ? [
        {
          title: curModuleName,
          key: `${curModuleId}`,
          children,
        },
      ]
    : [];

  const onProjectNameChange = (val) => {
    setCurProject(val);
    onProjectChange(val);
  };

  const onModuleNameChange = (module_id = '', project_id) => {
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

  const onCheck = (checkedKeys, info) => {
    setCheckedKeys(info.checkedNodes);
  };

  const addBefore = () => {
    setBeforeTableData((prev) => {
      const tableData = checkedKeys.filter(
        (item) => Object.keys(item).indexOf('id') !== -1,
      );
      if (tableData.length) {
        const data = [];
        let index = prev.length;
        tableData.forEach((item) => {
          data.push({
            id: item.id,
            name: item.name,
            key: item.name,
            index,
          });
          index++;
        });
        const next = JSON.parse(JSON.stringify(prev));
        next.push(...data);
        return next;
      }
      return prev;
    });
  };
  const addAfter = () => {
    setAfterTableData((prev) => {
      const tableData = checkedKeys.filter(
        (item) => Object.keys(item).indexOf('id') !== -1,
      );
      if (tableData.length) {
        const data = [];
        let index = prev.length;
        tableData.forEach((item) => {
          data.push({
            id: item.id,
            name: item.name,
            key: item.name,
            index,
          });
          index++;
        });
        const next = JSON.parse(JSON.stringify(prev));
        next.push(...data);
        return next;
      }
      return prev;
    });
  };
  const renderBeforeTable = () => {
    return (
      <div
        className={classnames(
          styles.beforeContent,
          beforeTableData.length ? '' : styles.hidden,
        )}
      >
        <DragableTable tableData={beforeTableData} />
      </div>
    );
  };
  const renderAfterTable = () => {
    return (
      <div
        className={classnames(
          styles.afterContent,
          afterTableData.length ? '' : styles.hidden,
        )}
      >
        <DragableTable tableData={afterTableData} />
      </div>
    );
  };

  const formChange = (val, type) => {
    const obj = {};
    obj[type] = val;
    form.setFieldsValue(obj);
  };

  return (
    <Form {...formLayout} initialValues={caseDetail} form={form}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Col span={24}>
            <Form.Item label="用例名称" name="name">
              <Input onChange={(e) => formChange(e.target.value, 'name')} />
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
                      <Option key={item.id} value={item.id}>
                        {item.project_name}
                      </Option>
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
                      <Option key={item.id} value={item.id}>
                        {item.module_name}
                      </Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="export" name="request.export">
              <Select mode="tags" tokenSeparators={[',']}>
                {exportChildren}
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} offset={4}>
            <Form.Item name="selection" wrapperCol={{ span: 19 }}>
              <Collapse>
                <Panel header="前后置步骤（可选）" key="selection">
                  <div className={styles.selectionContent}>
                    <div className={styles.topBtn}>
                      <Button type="primary" onClick={() => addBefore()}>
                        添加前置步骤
                      </Button>
                      <Button type="primary" onClick={() => addAfter()}>
                        添加后置步骤
                      </Button>
                    </div>
                    <div className={styles.selectionTree}>
                      <Tree checkable onCheck={onCheck} treeData={treeData} />
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
                <Panel header="前置步骤（选中）" key="selected_before">
                  {renderBeforeTable()}
                </Panel>
              </Collapse>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="after">
              <Collapse>
                <Panel header="后置步骤（选中）" key="selected_after">
                  {renderAfterTable()}
                </Panel>
              </Collapse>
            </Form.Item>
          </Col>
        </div>
      </div>
    </Form>
  );
};

export default MessageTab;
