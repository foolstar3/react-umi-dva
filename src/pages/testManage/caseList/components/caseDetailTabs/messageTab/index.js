import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import EditableTable from '@/components/Editabletable';
import { connect } from 'dva';
import classnames from 'classnames';
import { Form, Select, Input, Collapse, Button, Col, Tree } from 'antd';
import styles from './index.less';
import DragableTable from '@/components/DragableTable';
import { DataType } from '@/utils/common';

const { Option } = Select;
const { Panel } = Collapse;
const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tableColumns = [
  {
    title: '变量名',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
    editable: true,
  },
  {
    title: '变量类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    editable: true,
    width: 200,
  },
  {
    title: '变量值',
    dataIndex: 'value',
    key: 'value',
    align: 'center',
    textWrap: 'word-break',
    ellipsis: true,
    editable: true,
    render: (text) => (
      <span>{typeof text === 'boolean' ? JSON.stringify(text) : text}</span>
    ),
  },
];
const MessageTab = (props) => {
  const { refInstance } = props;
  useImperativeHandle(refInstance, () => {
    return {
      getMessageData() {
        const before = [];
        const after = [];
        beforeTableData.forEach((item) => {
          before.push({
            case_id: item.id,
            variables: item.variables,
          });
        });
        afterTableData.forEach((item) => {
          after.push({
            case_id: item.id,
            variables: item.variables,
          });
        });
        return {
          module: curModuleId,
          project: curProject,
          name: form.getFieldValue('name'),
          before,
          after,
          export: form.getFieldValue('export'),
        };
      },
    };
  });
  const {
    caseDetail,
    projectData,
    moduleData,
    onProjectChange,
    onModuleChange,
    caseList,
    callCase,
  } = props;
  const [tableForm] = Form.useForm();
  const [form] = Form.useForm();
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [beforeTableData, setBeforeTableData] = useState([]);
  const [afterTableData, setAfterTableData] = useState([]);
  const [curProject, setCurProject] = useState(caseDetail.project);
  const [curModuleName, setCurModuleName] = useState(caseDetail.module_name);
  const [curModuleId, setCurModuleId] = useState(caseDetail.module);
  const [tableVisibility, setTableVisibility] = useState(false);
  // 用例变量table
  const [curTable, setCurTable] = useState('');
  const [tableCase, setTableCase] = useState({});
  const [caseVariable, setCaseVariable] = useState([]);
  useEffect(() => {
    const data = {
      before: [],
      after: [],
    };
    // 保留源数据
    Object.assign(data, callCase);
    if (Object.keys(callCase).length !== 0) {
      setBeforeTableData(() => {
        data.before.map((item, index) => {
          item.key = item.name;
          item.index = index + 1;
        });
        return data.before;
      });
      setAfterTableData(() => {
        if (data.after.length !== 0) {
          data.after.map((item, index) => {
            item.key = item.name;
            item.index = index + 1;
          });
          return data.after;
        }
        return [];
      });
    }
  }, [callCase]);
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
  const exportChildren = caseDetail.id ? caseDetail.request.config.export : [];
  const treeData = curModuleName
    ? [
        {
          title: curModuleName,
          key: `${curModuleId}`,
          children,
        },
      ]
    : [];

  const onProjectNameChange = (val, opt) => {
    setCurProject(val);
    setCurModuleId(undefined);
    onProjectChange(val);
    form.setFieldsValue({
      project_name: opt.title,
      module_name: '',
    });
  };

  const onModuleNameChange = (module_id = '', project_id, opt) => {
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
    form.setFieldsValue({
      module_name: opt.children,
    });
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
        let index = prev[prev.length - 1] ? prev[prev.length - 1].index + 1 : 1;
        tableData.forEach((item) => {
          data.push({
            id: item.id,
            name: item.name,
            key: `${item.name}${index}`,
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
        let index = prev[prev.length - 1] ? prev[prev.length - 1].index + 1 : 1;
        tableData.forEach((item) => {
          data.push({
            id: item.id,
            name: item.name,
            key: `${item.name}${index}`,
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
  const deleteCall = (record, table) => {
    if (tableCase.key === record.key) {
      // 删除当前步骤用例，隐藏下方用例变量table
      setTableVisibility(false);
    }
    if (table === 'before') {
      setBeforeTableData((prev) => {
        const next = prev.filter((item) => item.index !== record.index);
        return next;
      });
    } else if (table === 'after') {
      setAfterTableData((prev) => {
        const next = prev.filter((item) => item.index !== record.index);
        return next;
      });
    }
  };
  const onSortEnd = (record, table) => {
    if (table === 'before') {
      setBeforeTableData(record);
    } else if (table === 'after') {
      setAfterTableData(record);
    }
  };
  const renderBeforeTable = () => {
    return (
      <div
        className={classnames(
          styles.beforeContent,
          beforeTableData.length ? '' : styles.hidden,
        )}
      >
        <DragableTable
          tableData={beforeTableData}
          deleteCall={(record) => deleteCall(record, 'before')}
          showDetail={(record) => showTable(record, 'before')}
          onSortEnd={(record) => onSortEnd(record, 'before')}
        />
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
        <DragableTable
          tableData={afterTableData}
          deleteCall={(record) => deleteCall(record, 'after')}
          showDetail={(record) => showTable(record, 'after')}
          onSortEnd={(record) => onSortEnd(record, 'after')}
        />
      </div>
    );
  };
  const showTable = (record, table) => {
    if (record.key === tableCase.key) {
      setTableVisibility(!tableVisibility);
    } else {
      setTableVisibility(true);
      setCurTable(table);
      setTableCase(record);
      setCaseVariable(() => {
        if (record.variables && Object.keys(record.variables).length !== 0) {
          let index = 1;
          const arr = [];
          for (const [key, value] of Object.entries(record.variables)) {
            arr.push({
              name: key,
              value: value,
              type: DataType(value),
              id: index,
              key: index,
            });
            index++;
          }
          return arr;
        }
      });
    }
  };
  const formChange = (val, type) => {
    const obj = {};
    obj[type] = val;
    form.setFieldsValue(obj);
  };

  const projectChosen = () => {
    return form.getFieldValue('project_name');
  };

  const lineAdd = () => {
    setCaseVariable((prev = []) => {
      const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
      prev.push({
        id,
        key: id,
        name: '',
        value: '',
        type: '',
      });
      const next = JSON.parse(JSON.stringify(prev));
      return next;
    });
  };

  const lineDelete = (line) => {
    const next = caseVariable.filter((item) => item.key !== line.key);
    setCaseVariable(next);
    const nextCaseVariable = {};
    // todo 完成tableCase和beforetabledata的set
    next.forEach((item) => {
      nextCaseVariable[item.name] = item.value;
    });
    const nextTableCase = {};
    Object.assign(nextTableCase, tableCase);
    nextTableCase.variables = nextCaseVariable;
    setTableCase(nextTableCase);
    if (curTable === 'before') {
      setBeforeTableData((prev) => {
        const index = prev.findIndex((item) => item.key === tableCase.key);
        prev[index].variables = nextTableCase.variables;
        const nextBeforeTableData = [];
        Object.assign(nextBeforeTableData, prev);
        return nextBeforeTableData;
      });
    } else if (curTable === 'after') {
      setAfterTableData((prev) => {
        const index = prev.findIndex((item) => item.key === tableCase.key);
        prev[index].variables = nextTableCase.variables;
        const nextAfterTableData = [];
        Object.assign(nextAfterTableData, prev);
        return nextAfterTableData;
      });
    }
  };

  const lineSave = (line) => {
    const index = caseVariable.findIndex((item) => item.key === line.key);
    let next = JSON.parse(JSON.stringify(caseVariable));
    // key有重复后的保存
    if (index > -1) {
      next[index].name = line.name;
      next[index].type = line.type;
      if (line.type === 'String') {
        next[index].value =
          typeof line.value === 'string'
            ? line.value
            : JSON.stringify(line.value);
      } else {
        next[index].value = JSON.parse(line.value);
      }
    }
    const variables = {};
    next.forEach((item) => {
      variables[item.name] = item.value;
    });
    const nextTableCase = {};
    Object.assign(nextTableCase, tableCase);
    nextTableCase.variables = variables;
    // 保存variables修改
    setCaseVariable(next);
    // 保存tableCase修改
    setTableCase(nextTableCase);
    if (curTable === 'before') {
      setBeforeTableData((prev) => {
        const index = prev.findIndex((item) => item.key === tableCase.key);
        prev[index] = nextTableCase;
        const nextBeforeTableData = [];
        Object.assign(nextBeforeTableData, prev);
        return nextBeforeTableData;
      });
    } else if (curTable === 'after') {
      setAfterTableData((prev) => {
        const index = prev.findIndex((item) => item.key === tableCase.key);
        prev[index] = nextTableCase;
        const nextAfterTableData = [];
        Object.assign(nextAfterTableData, prev);
        return nextAfterTableData;
      });
    }
  };
  return (
    <>
      <Form {...formLayout} initialValues={caseDetail} form={form}>
        <div className={styles.content}>
          <div className={styles.left}>
            <Col span={24}>
              <Form.Item
                label="用例名称"
                name="name"
                rules={[{ required: true, message: '请输入用例名称' }]}
              >
                <Input onChange={(e) => formChange(e.target.value, 'name')} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="项目名称"
                name="project_name"
                rules={[{ required: true, message: '请选择项目名称' }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  onChange={(val, opt) => onProjectNameChange(val, opt)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled={caseDetail.id}
                >
                  {projectData
                    ? projectData.map((item) => (
                        <Option
                          key={item.id}
                          value={item.id}
                          title={item.project_name}
                        >
                          {item.project_name}
                        </Option>
                      ))
                    : null}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="模块名称"
                name="module_name"
                rules={[{ required: true, message: '请选择模块名称' }]}
              >
                <Select
                  showSearch
                  optionFilterProp="children"
                  onChange={(val, opt) =>
                    onModuleNameChange(val, curProject, opt)
                  }
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  placeholder="请先选择项目名称"
                >
                  {projectChosen() && moduleData && moduleData.length
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
              <Form.Item
                label="export"
                name="export"
                initialValue={exportChildren}
              >
                <Select
                  mode="tags"
                  tokenSeparators={[',']}
                  onChange={(val) => formChange(val, 'export')}
                >
                  {/* {exportChildren} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} offset={4}>
              <Form.Item wrapperCol={{ span: 19 }}>
                <Collapse defaultActiveKey={['selection']}>
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
                <Collapse defaultActiveKey={['selected_before']}>
                  <Panel header="前置步骤（选中）" key="selected_before">
                    {renderBeforeTable()}
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="after">
                <Collapse defaultActiveKey={['selected_after']}>
                  <Panel header="后置步骤（选中）" key="selected_after">
                    {renderAfterTable()}
                  </Panel>
                </Collapse>
              </Form.Item>
            </Col>
          </div>
        </div>
      </Form>
      <div
        className={classnames(
          styles.tableContainer,
          tableVisibility ? '' : styles.hidden,
        )}
      >
        <div className={styles.tableHeader}>
          <span className={styles.title}>
            {curTable === 'before' ? '前置步骤' : '后置步骤'}
            {tableCase.name}
          </span>
          <div className={styles.btn}>
            <Button type="primary" onClick={lineAdd}>
              添加variable
            </Button>
          </div>
        </div>
        <EditableTable
          form={tableForm}
          dataSource={caseVariable}
          columns={tableColumns}
          lineDelete={(record) => lineDelete(record)}
          lineSave={(record) => lineSave(record)}
        />
        {/* <div className={styles.bottomBtn}>
          <Button type="primary" onClick={() => setTableVisibility(false)}>
            收起
          </Button>
        </div> */}
      </div>
    </>
  );
};
const ConnectedMessageTab = connect(({ testCase }) => ({
  callCase: testCase.callCase,
}))(MessageTab);

export default forwardRef((props, ref) => (
  <ConnectedMessageTab {...props} refInstance={ref} />
));
