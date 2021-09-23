import React, { useState } from 'react';
import { Tabs, Button, Modal, Form, Select, message } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import MessageTab from './messageTab';
import VariablesTab from './variablesTab';
/**
 * 对此组件进行数据处理的后端框架存在bug
 * 暂时隐藏
 */
// import ParametersTab from './parametersTab';
import ResponseTab from '../responseTab';
import HooksTab from './hooksTab/index.jsx';
import RequestTab from './requestTab';
import ExtractTab from './extractTab/index.jsx';
const { TabPane } = Tabs;
const { Option } = Select;

const CaseDetailTabs = ({
  caseDetail,
  hideCaseDetail,
  projectData,
  moduleData,
  onProjectChange,
  onModuleChange,
  caseList,
  envList,
  dispatch,
  debugResponse,
  funcs,
}) => {
  const responseTreeData = [];
  const responseTabs = [];
  const debugCase = (payload) => {
    dispatch({
      type: 'testCase/debugCase',
      payload,
      callback: (res) => {
        if (res.case_metas.length > 10) {
          message.error('单次最多运行10个用例');
        }
      },
    });
  };
  const [debugResponseVisible, setdebugResponseVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const tabDatas = Object.keys(caseDetail).length
    ? caseDetail.request.teststeps[0]
    : {};

  const [variables, setVariables] = useState(tabDatas.variables ?? []);

  const [parameters, setParameters] = useState(tabDatas.parameters ?? []);

  const [setupHooks, setSetupHooks] = useState(tabDatas.setup_hooks ?? []);

  const [teardownHooks, setTeardownHooks] = useState(
    tabDatas.teardown_hooks ?? [],
  );

  const [request, setRequest] = useState(tabDatas.request ?? []);

  const [extract, setExtract] = useState(tabDatas.extract ?? []);

  const [validate, setValidate] = useState(tabDatas.validate ?? []);

  const [checkedData, setCheckedData] = useState({ extract: {}, validate: [] });
  const showDebugModal = () => {
    setModalVisible(true);
  };

  const onDebugOk = () => {
    const payload = {
      type: 1,
      name: 'organization_current',
      project: 109,
      module: 77,
      base_url: 'https://portal-dev-api.uihcloud.cn/portal-api',
      before: [],
      after: [],
      export: [],
      teststeps: [
        {
          name: 'organization_current',
          request: {
            url: '/v1/organization/current',
            headers: {
              Authorization: 'token',
            },
            method: 'GET',
          },
          extract: {
            msg_code: 'body.msgCode',
          },
          validate: [
            {
              equal: ['status_code', 200],
            },
            {
              contains: ['$msg_code', 'success'],
            },
          ],
        },
      ],
    };
    debugCase(payload);
    setModalVisible(false);
    setdebugResponseVisible(true);
  };

  const onDebugCancel = () => {
    setModalVisible(false);
  };

  // 编辑删除后保存当前tab的数据
  const saveData = (data, table) => {
    switch (table) {
      case 'extract':
        setExtract(() => {
          const obj = {};
          data.forEach((item) => {
            obj[item.name] = item.path;
          });
          return obj;
        });
        break;
      case 'validate':
        setValidate(() => {
          const obj = [];
          data.forEach((item) => {
            const child = {};
            child[item.comparator] = [item.check, item.expected];
            obj.push(child);
          });
          return obj;
        });
        break;
      case 'headers':
        setRequest((prev) => {
          const obj = {
            ...prev,
            headers: {},
          };
          const child = {};
          data.forEach((item) => {
            child[item.name] = item.value;
          });
          obj.headers = child;
          return obj;
        });
        break;
      case 'params':
        setRequest((prev) => {
          const obj = {
            ...prev,
            params: {},
          };
          const child = {};
          data.forEach((item) => {
            child[item.name] = item.value;
          });
          obj.params = child;
          return obj;
        });
        break;
      case 'data':
        setRequest((prev) => {
          const obj = {
            ...prev,
            data: {},
          };
          const child = {};
          data.forEach((item) => {
            child[item.name] = item.value;
          });
          obj.data = child;
          return obj;
        });
        break;
      case 'request':
        setRequest((prev) => {
          const obj = {
            ...prev,
            url: data.url,
            method: data.method,
          };
          return obj;
        });
        break;
      case 'setup':
        setSetupHooks(() => {
          const obj = [];
          data.forEach((item) => {
            obj.push(item.funcName);
          });
          return obj;
        });
        break;
      case 'teardown':
        setTeardownHooks(() => {
          const obj = [];
          data.forEach((item) => {
            obj.push(item.funcName);
          });
          return obj;
        });
        break;
      case 'variables':
        setVariables(() => {
          const obj = {};
          data.forEach((item) => {
            obj[item.name] = item.value;
          });
          return obj;
        });
        break;
    }
  };

  const getMessageData = (datas) => {
    console.log(datas);
  };

  const onSave = () => {
    console.log(
      variables,
      request,
      extract,
      validate,
      setupHooks,
      teardownHooks,
    );
  };

  const checkedChange = (val) => {
    setCheckedData(() => {
      const obj = {
        extract: {},
        validate: [],
      };
      val.forEach((item) => {
        const child = {};
        obj.extract[item.name] = item.path;
        child['equal'] = [item.name, item.expect];
        obj.validate.push(child);
      });
      return obj;
    });
  };
  const extractData = () => {
    setExtract((prev = {}) => {
      const { extract } = checkedData;
      const next = {
        ...prev,
        ...extract,
      };
      console.log(next);
      return next;
    });
    setValidate((prev = []) => {
      const { validate } = checkedData;
      const next = prev.concat(validate);
      console.log(next);
      return next;
    });
  };
  return (
    <>
      <div className={styles.tabBody}>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="message" key="1">
            <MessageTab
              getMessageData={getMessageData}
              caseDetail={caseDetail}
              projectData={projectData}
              moduleData={moduleData}
              onProjectChange={onProjectChange}
              onModuleChange={onModuleChange}
              caseList={caseList}
            />
          </TabPane>
          <TabPane tab="variables" key="2">
            <VariablesTab variables={variables} save={saveData} />
          </TabPane>
          {/* <TabPane tab="paramters" key="3">
            <ParametersTab
              parameters={parameters}
              onSwitchChange={() => {
              }}
            />
          </TabPane> */}
          <TabPane tab="hooks" key="4">
            <HooksTab
              funcs={funcs}
              setupHooks={setupHooks}
              teardownHooks={teardownHooks}
              save={saveData}
            />
          </TabPane>
          <TabPane tab="request" key="5">
            <RequestTab request={request} save={saveData} />
          </TabPane>
          <TabPane tab="extract/validate" key="6">
            <ExtractTab extract={extract} validate={validate} save={saveData} />
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.footer}>
        <div className={styles.left}>
          <Button className={styles.basicBtn} onClick={showDebugModal}>
            调试
          </Button>
          <Button className={styles.successBtn} onClick={onSave}>
            保存
          </Button>
        </div>
        <div className={styles.right}>
          <Button className={styles.cancelBtn} onClick={hideCaseDetail}>
            取消
          </Button>
        </div>
      </div>
      <div
        className={styles.debugResponse}
        style={{ display: debugResponseVisible ? 'block' : 'none' }}
      >
        <div className={styles.topBtn}>
          <Button className={styles.basicBtn}>清空结果</Button>
          <Button className={styles.basicBtn} onClick={() => extractData()}>
            提取数据
          </Button>
        </div>
        <div className={styles.responseTabs}>
          <Tabs defaultActiveKey="1" type="card">
            {debugResponse.case_metas
              ? debugResponse.case_metas.map((item, index) => {
                  return (
                    <TabPane tab={item.name} key={`${item.name}${item.index}`}>
                      <ResponseTab
                        treeData={debugResponse.tree[index]}
                        checkable={true}
                        validators={item.validators.validate_extractor || []}
                        onCheckedChange={checkedChange}
                      />
                    </TabPane>
                  );
                })
              : ''}
          </Tabs>
        </div>
      </div>
      <Modal
        title="选择运行环境"
        visible={isModalVisible}
        onOk={onDebugOk}
        onCancel={onDebugCancel}
      >
        <Form>
          <Form.Item
            label="运行环境"
            name="env"
            rules={[{ required: true, message: '请选择运行环境!' }]}
          >
            <Select>
              {envList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.env_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ testCase }) => ({
  debugResponse: testCase.debugResponse,
}))(CaseDetailTabs);
