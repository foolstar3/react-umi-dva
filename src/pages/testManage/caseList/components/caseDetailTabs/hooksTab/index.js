import React, { useState, useEffect } from 'react';
import EditableTable from '@/components/Editabletable';
import { Form, Select, Button, message } from 'antd';

import styles from './index.less';

const HooksTab = ({ setupHooks, teardownHooks, funcs, save }) => {
  const hooks = {
    setup: setupHooks,
    teardown: teardownHooks,
  };
  const setData = (table) => {
    const hook = [];
    hooks[table].map((item, index) => {
      hook.push({
        funcName: item,
        id: index + 1,
        key: index + 1,
      });
    });
    return hook;
  };
  useEffect(() => {
    setSetupData(setData('setup'));
  }, [setupHooks]);

  useEffect(() => {
    setTeardownData(setData('teardown'));
  }, [teardownHooks]);

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
      title: '函数名',
      dataIndex: 'funcName',
      editable: true,
      align: 'center',
    },
  ];

  const teardownTableColumns = [
    {
      title: '函数名',
      dataIndex: 'funcName',
      editable: true,
      align: 'center',
    },
  ];

  const lineAdd = (table) => {
    if (table === 'setup') {
      setSetupData((prev = []) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          funcName: '',
        });
        const next = JSON.parse(JSON.stringify(prev));
        return next;
      });
    } else if (table === 'teardown') {
      setTeardownData((prev = []) => {
        const id = prev.length ? prev[prev.length - 1].id + 1 : 1;
        prev.push({
          id,
          key: id,
          funcName: '',
        });
        const next = JSON.parse(JSON.stringify(prev));
        return next;
      });
    }
  };

  const lineDelete = (line, table) => {
    if (table === 'setup') {
      setSetupData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    } else if (table === 'teardown') {
      setTeardownData((prev) => {
        const next = prev.filter((item) => item.key !== line.key);
        save(next, table);
        return next;
      });
    }
  };

  const lineSave = (line, table) => {
    if (table === 'setup') {
      const prev = JSON.parse(JSON.stringify(setupData));
      const index = prev.findIndex((item) => item.key === line.key);
      // key有重复后的保存
      if (index > -1) {
        prev[index].funcName = line.funcName;
      }
      save(prev, table);
    } else if (table === 'teardown') {
      const prev = JSON.parse(JSON.stringify(setupData));
      const index = prev.findIndex((item) => item.key === line.key);
      // key有重复后的保存
      if (index > -1) {
        prev[index].funcName = line.funcName;
      }
      save(prev, table);
    }
  };
  const [setupForm] = Form.useForm();
  const [teardownForm] = Form.useForm();

  return (
    <>
      <div className={styles.setupHooksContent}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('setup')}>
            添加SetupHook
          </Button>
        </div>
        <EditableTable
          form={setupForm}
          dataSource={setupData}
          columns={setupTableColumns}
          funcs={funcs}
          lineDelete={(record) => lineDelete(record, 'setup')}
          lineSave={(record) => lineSave(record, 'setup')}
        />
      </div>
      <div className={styles.teardownHooksContent}>
        <div className={styles.topBtn}>
          <Button type="primary" onClick={() => lineAdd('teardown')}>
            添加TeardownHook
          </Button>
        </div>
        <EditableTable
          form={teardownForm}
          dataSource={teardownData}
          columns={teardownTableColumns}
          funcs={funcs}
          lineDelete={(record) => lineDelete(record, 'teardown')}
          lineSave={(record) => lineSave(record, 'teardown')}
        />
      </div>
    </>
  );
};

export default HooksTab;
