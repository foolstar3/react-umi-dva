import React, { useState, useRef } from 'react';
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
  const [form] = Form.useForm();
  const editorRef = useRef(null);
  const messageRef = useRef(null);
  const debugCase = (payload) => {
    dispatch({
      type: 'testCase/debugCase',
      payload,
      callback: (res) => {
        if (res.code && res.code === 'U000400') {
          message.error(res.message);
        } else {
          if (res.case_metas.length > 10) {
            message.info('单次最多运行10个用例');
          }
          setDebugResponseVisible(true);
        }
      },
    });
    message.success('调试请求已发送');
  };

  const updateCase = (payload) => {
    dispatch({
      type: 'testCase/updateCase',
      payload,
      callback: (res) => {
        if (res.code === 'U000000') {
          message.success(res.message);
          hideCaseDetail();
        } else {
          message.error('编辑失败!');
        }
      },
    });
  };

  const createCase = (payload) => {
    dispatch({
      type: 'testCase/createCase',
      payload,
      callback: (res) => {
        if (res.code === 'U000000') {
          message.success(res.message);
          hideCaseDetail();
        } else {
          message.error('保存失败!');
        }
      },
    });
  };

  const [debugResponseVisible, setDebugResponseVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const tabDatas = Object.keys(caseDetail).length
    ? caseDetail.request.teststeps[0]
    : {};
  const [variables, setVariables] = useState(tabDatas.variables ?? {});

  const [parameters, setParameters] = useState(tabDatas.parameters ?? []);

  const [setupHooks, setSetupHooks] = useState(tabDatas.setup_hooks ?? []);

  const [teardownHooks, setTeardownHooks] = useState(
    tabDatas.teardown_hooks ?? [],
  );

  const [request, setRequest] = useState(tabDatas.request ?? {});

  const [extract, setExtract] = useState(tabDatas.extract ?? {});

  const [validate, setValidate] = useState(tabDatas.validate ?? []);

  const [checkedData, setCheckedData] = useState({ extract: {}, validate: [] });
  const showDebugModal = () => {
    setModalVisible(true);
  };

  const onDebugOk = () => {
    // 验证是否已选择运行环境
    let base_url = '';
    if (form.getFieldsValue().env) {
      base_url = envList.find(
        (item) => item.id === form.getFieldsValue().env,
      ).base_url;
    } else {
      return message.info('请选择运行环境');
    }
    const payload = getPayload();
    // 验证是否存在未填的必需项
    if (
      Object.keys(payload.request.teststeps[0].request).indexOf('method') == -1
    ) {
      return message.info('请求方法method不能为空，请在request中填写');
    }
    if (
      Object.keys(payload.request.teststeps[0].request).indexOf('url') === -1 ||
      payload.request.teststeps[0].request.url === ''
    ) {
      return message.info('请求方法url不能为空，请在request中填写');
    }
    payload.export = payload.request.export;
    payload.teststeps = payload.request.teststeps;
    payload.teststeps[0].setup_hooks.length
      ? ''
      : delete payload.teststeps[0].setup_hooks;
    payload.teststeps[0].teardown_hooks.length
      ? ''
      : delete payload.teststeps[0].teardown_hooks;
    Object.keys(payload.teststeps[0].extract).length
      ? ''
      : delete payload.teststeps[0].extract;
    Object.keys(payload.teststeps[0].variables).length
      ? ''
      : delete payload.teststeps[0].variables;
    payload.base_url = base_url;
    delete payload.request;
    console.log(payload);
    debugCase(payload);
    setModalVisible(false);
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

  const onSave = () => {
    const payload = getPayload();
    caseDetail.id == undefined
      ? createCase(payload)
      : updateCase({ id: caseDetail.id, payload });
  };

  const getPayload = () => {
    // 处理requestTab
    let dataType = '';
    if (editorRef.current) {
      dataType = editorRef.current.sendCode().dataType;
    } else if (caseDetail.request) {
      dataType =
        Object.keys(caseDetail.request).indexOf('json') !== -1
          ? 'json'
          : 'data';
    } else {
      dataType = 'data';
    }
    if (dataType === 'json') {
      try {
        request.json = JSON.parse(editorRef.current.sendCode().jsonCode);
      } catch (err) {
        message.info('请检查JSON数据格式');
      }
    }
    const newRequest = JSON.parse(JSON.stringify(request));
    // 处理messageTab
    const messageData = messageRef.current.getMessageData();
    let payload = {
      ...messageData,
      type: 1,
      request: {
        export: [],
        teststeps: [
          {
            name: messageData.name,
            request: {},
            variables,
            extract,
            validate,
            setup_hooks: setupHooks,
            teardown_hooks: teardownHooks,
          },
        ],
      },
    };
    if (dataType === 'data') {
      delete newRequest.json;
      payload.request.teststeps[0].request = newRequest;
    } else {
      delete newRequest.data;
      payload.request.teststeps[0].request = newRequest;
    }
    return payload;
  };
  const checkedChange = (val) => {
    setCheckedData(() => {
      const obj = {
        extract: {},
        validate: [],
      };
      const record = [];
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
      return next;
    });
    setValidate((prev = []) => {
      const { validate } = checkedData;
      validate.forEach((item) => {
        prev = prev.filter((child) => {
          // 判断是否和已有数据重复
          if (child.equal) {
            return child.equal[0] !== item.equal[0];
          }
          return true;
        });
      });
      const next = prev.concat(validate);
      return next;
    });
  };
  const clearResult = () => {
    dispatch({
      type: 'testCase/updateDebugResponse',
      payload: { debugResponse: {} },
    });
    setDebugResponseVisible(false);
  };
  return (
    <>
      <div className={styles.tabBody}>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="message" key="1">
            <MessageTab
              caseDetail={caseDetail}
              projectData={projectData}
              moduleData={moduleData}
              onProjectChange={onProjectChange}
              onModuleChange={onModuleChange}
              caseList={caseList}
              ref={messageRef}
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
            <RequestTab request={request} save={saveData} ref={editorRef} />
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
          <Button className={styles.basicBtn} onClick={clearResult}>
            清空结果
          </Button>
          <Button className={styles.basicBtn} onClick={extractData}>
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
        <Form form={form}>
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
