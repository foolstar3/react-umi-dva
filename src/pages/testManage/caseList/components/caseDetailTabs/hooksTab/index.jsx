import React, { useState } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message } from 'antd';

import styles from './index.less';

const HooksTab = ({ setupHooks, teardownHooks, funcs }) => {
  const [setupData, setSetupData] = useState(() => {
    const setup = [];
    setupHooks.map((item, index) => {
      setup.push({
        funcName: item,
        id: index + 1,
        key: index + 1,
      });
    });
    return setup;
  });

  const [teardownData, setTeardownData] = useState(() => {
    const teardown = [];
    teardownHooks.map((item, index) => {
      teardown.push({
        funcName: item,
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
      dataIndex: 'funcName',
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
      dataIndex: 'funcName',
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
          funcs={funcs}
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
          funcs={funcs}
        />
      </div>
    </>
  );
};

export default HooksTab;
