import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message } from 'antd';

import styles from './index.less';

const HooksTab = ({ setupHooks, teardownHooks }) => {
  console.log(setupHooks, teardownHooks);
  const [setupData, setSetupData] = useState(() => {
    const setup = [];
    setupHooks.map((item, index) => {
      // for (const [key, value] of Object.entries(item)) {
      //   // console.log(`${key}: ${value}`);
      //   item.name = key
      //   item.value = JSON.stringify(value)
      // }

      setup.push({
        name: item,
        id: index + 1,
        key: index + 1,
      });
    });
    return setup;
  });

  const [teardownData, setTeardownData] = useState(() => {
    const teardown = [];
    teardownHooks.map((item, index) => {
      // for (const [key, value] of Object.entries(item)) {
      //   // console.log(`${key}: ${value}`);
      //   item.name = key
      //   item.value = JSON.stringify(value)
      // }

      teardown.push({
        name: item,
        id: index + 1,
        key: index + 1,
      });
    });
    return teardown;
  });
  const setupTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '函数名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
  ];

  const teardownTableColumns = [
    {
      title: '编号',
      dataIndex: 'id',
      width: 80,
      align: 'center',
    },
    {
      title: '函数名',
      dataIndex: 'name',
      editable: true,
      align: 'center',
    },
  ];
  const [form] = Form.useForm();

  return (
    <>
      <div className={styles.setupHooksContent}>
        <div className={styles.topBtn}>
          <Button type="primary">添加SetupHook</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={setupData}
          columns={setupTableColumns}
        />
      </div>
      <div className={styles.teardownHooksContent}>
        <div className={styles.topBtn}>
          <Button type="primary">添加TeardownHook</Button>
        </div>
        <EditableTable
          form={form}
          dataSource={teardownData}
          columns={teardownTableColumns}
        />
      </div>
    </>
  );
};

export default HooksTab;
