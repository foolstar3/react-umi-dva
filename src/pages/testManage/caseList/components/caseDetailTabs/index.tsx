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

  const variables = tabDatas.variables ?? [];

  const [parameters, setParameters] = useState(tabDatas.parameters ?? []);

  const [setupHooks, setSetupHooks] = useState(tabDatas.setup_hooks ?? []);

  const [teardownHooks, setTeardownHooks] = useState(
    tabDatas.teardown_hooks ?? [],
  );

  const [request, setRequest] = useState(tabDatas.request ?? []);

  const [extract, setExtract] = useState(tabDatas.extract ?? []);

  const [validate, setValidate] = useState(tabDatas.validate ?? []);

  const showDebugModal = () => {
    setModalVisible(true);
  };

  const onDebugOk = () => {
    const payload = {
      type: 1,
      name: 'organization_current',
      project: 79,
      module: 42,
      base_url: 'https://portal-master-api.uihcloud.cn',
      before: [1],
      after: [],
      params_files: [],
      export: [],
      teststeps: [
        {
          name: 'organization_current',
          request: {
            url: '/portal-api/v1/organization/current',
            headers: {
              Authorization: '$token',
            },
            method: 'GET',
          },
          extract: {
            data_id: 'body.data[0].id',
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
            />
          </TabPane>
          <TabPane tab="variables" key="2">
            <VariablesTab variables={variables} />
          </TabPane>
          {/* <TabPane tab="paramters" key="3">
            <ParametersTab
              parameters={parameters}
              onSwitchChange={() => {
                console.log('onSwitchChange');
              }}
            />
          </TabPane> */}
          <TabPane tab="hooks" key="4">
            <HooksTab setupHooks={setupHooks} teardownHooks={teardownHooks} />
          </TabPane>
          <TabPane tab="request" key="5">
            <RequestTab request={request} />
          </TabPane>
          <TabPane tab="extract/validate" key="6">
            <ExtractTab extract={extract} validate={validate} />
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.footer}>
        <div className={styles.left}>
          <Button className={styles.basicBtn} onClick={showDebugModal}>
            调试
          </Button>
          <Button className={styles.successBtn}>保存</Button>
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
          <Button className={styles.basicBtn}>提取数据</Button>
        </div>
        <div className={styles.responseTabs}>
          <Tabs defaultActiveKey="1" type="card">
            {debugResponse.case_metas
              ? debugResponse.case_metas.map((item, index) => {
                  return (
                    <TabPane tab={item.name} key={`${item.name}${item.index}`}>
                      <ResponseTab
                        treeData={debugResponse.tree[index]}
                        checkable={item.flag}
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
