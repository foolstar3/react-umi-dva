import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Switch, Button, message } from 'antd';

import styles from './index.less';

const ParametersTab = ({ onSwitchChange, parameters }) => {
  console.log(parameters, '1');
  const [dataSource, setDataSource] = useState(() => {
    parameters.map((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        // console.log(`${key}: ${value}`);
        item.name = key;
        item.value = JSON.stringify(value);
      }
      item.id = index + 1;
      item.key = index + 1;
    });
    // console.log(parameters);
    return parameters;
  });

  const addParams = () => {
    // setDataSource(dataSource => dataSource.push({}))
    message.info('功能开发中');
  };

  const tableColumns: any = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '参数名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      editable: true,
    },
    {
      title: '参数值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      editable: true,
    },
    {
      title: '切换类型',
      dataIndex: 'switch',
      key: 'switch',
      align: 'center',
      render: (_, record) => {
        return <Switch onChange={onSwitchChange} />;
      },
    },
  ];
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.topBtn}>
        <Button type="primary" onClick={addParams}>
          添加变量
        </Button>
      </div>
      <EditableTable
        form={form}
        dataSource={dataSource}
        columns={tableColumns}
      />
    </>
  );
};

export default ParametersTab;
