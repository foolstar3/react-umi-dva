import React, { useState, useEffect } from 'react';
import EditableTable from '@/components/Editabletable';
import { Table, Button, Form, Select, Input, Tooltip } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import { DataType } from '@/utils/common';

import styles from './index.less';

const configInfo = `config variable 是case中优先级较低的配置

当有其他作用域的variable和他重名的时候，优先级低的variable 会被新的value覆盖

如果你的用例需要被其他case调用，并且希望从外部获取新的value覆盖当前variable，建议用config variable来设置

比如：case login（username， password），这里的2个参数就适合配置在config variable，这样外部引用此case的时候就很容易将新的value传递到此case内部了`;

const stepInfo = `step variable 是case中优先级较高的配置， 会覆盖其他作用域的同名变量

由于step variable在当前case的优先级较高，被其他case引用时，value也不会被覆盖

如果你确定当前case中的某些variable是最高优先级的，不希望被外部case的变量覆盖，那你应该配置在这里`;
const VariablesTab = ({ variables, save, configVariables }) => {
  console.log(configVariables);
  const [configForm] = Form.useForm();
  const [stepForm] = Form.useForm();
  useEffect(() => {
    setVariablesData(() => {
      if (variables && Object.keys(variables).length !== 0) {
        let index = 1;
        const arr = [];
        for (const [key, value] of Object.entries(variables)) {
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
  }, [variables]);
  useEffect(() => {
    setConfigVariablesData(() => {
      if (configVariables && Object.keys(configVariables).length !== 0) {
        let index = 1;
        const arr = [];
        for (const [key, value] of Object.entries(configVariables)) {
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
  }, [configVariables]);
  const [variablesData, setVariablesData] = useState(() => {
    if (variables && Object.keys(variables).length !== 0) {
      let index = 1;
      const arr = [];
      for (const [key, value] of Object.entries(variables)) {
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

  const [configVariablesData, setConfigVariablesData] = useState(() => {
    if (configVariables && Object.keys(configVariables).length !== 0) {
      let index = 1;
      const arr = [];
      for (const [key, value] of Object.entries(variables)) {
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

  const columns = [
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

  const lineAdd = (table) => {
    if (table === 'configVariables') {
      setConfigVariablesData((prev = []) => {
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
    } else {
      setVariablesData((prev = []) => {
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
    }
  };

  const lineDelete = (line, table) => {
    if (table === 'configVariables') {
      setConfigVariablesData((prev = []) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    } else {
      setVariablesData((prev = []) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    }
  };

  const lineSave = (line, table) => {
    if (table === 'configVariables') {
      const index = configVariablesData.findIndex(
        (item) => item.key === line.key,
      );
      let next = JSON.parse(JSON.stringify(configVariablesData));
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
      save(next, table);
    } else {
      const index = variablesData.findIndex((item) => item.key === line.key);
      let next = JSON.parse(JSON.stringify(variablesData));
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
      save(next, table);
    }
  };

  return (
    <>
      <div className={styles.configVars}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('configVariables')}>
            添加变量
          </Button>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>config variable</span>
            <Tooltip
              title={configInfo}
              overlayStyle={{ maxWidth: 600 }}
              placement="topLeft"
            >
              <QuestionCircleTwoTone />
            </Tooltip>
          </div>
        </div>
        <EditableTable
          form={configForm}
          dataSource={configVariablesData}
          columns={columns}
          lineDelete={(record) => lineDelete(record, 'configVariables')}
          lineSave={(record) => lineSave(record, 'configVariables')}
        />
      </div>
      <div className={styles.stepVars}>
        <div className={styles.topBtn}>
          <Button
            type="primary"
            onClick={(record) => lineAdd(() => lineAdd('variables'))}
          >
            添加变量
          </Button>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>step variable</span>
            <Tooltip
              title={stepInfo}
              overlayStyle={{ maxWidth: 600 }}
              placement="topLeft"
            >
              <QuestionCircleTwoTone />
            </Tooltip>
          </div>
        </div>
        <EditableTable
          form={stepForm}
          dataSource={variablesData}
          columns={columns}
          lineDelete={(record) => lineDelete(record, 'variables')}
          lineSave={(record) => lineSave(record, 'variables')}
        />
      </div>
    </>
  );
};

export default VariablesTab;
