import React, { useState } from 'react';
import { Tabs, Button, Modal, Form, Select } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import MessageTab from './messageTab';
import VariablesTab from './variablesTab';
import ParametersTab from './parametersTab';
import HooksTab from './hooksTab/index.jsx';
import RequestTab from './requestTab/index.jsx';
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
}) => {
  const responseTreeData = {};
  const debugCase = (payload) => {
    dispatch({
      type: 'testCase/debugCase',
      payload,
      callback: (res) => {
        console.log(debugResponse);
      },
    });
  };
  const [debugResponseVisible, setdebugResponseVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const tabDatas = caseDetail.request.teststeps[0];

  const variables = tabDatas.variables ?? [];

  const [parameters, setParameters] = useState(tabDatas.parameters ?? []);

  const [setupHooks, setSetupHooks] = useState(tabDatas.setupHooks ?? []);

  const [teardownHooks, setTeardownHooks] = useState(
    tabDatas.teardownHooks ?? [],
  );

  const [request, setRequest] = useState(tabDatas.request ?? []);

  const [extract, setExtract] = useState(tabDatas.extract ?? []);

  const [validate, setValidate] = useState(tabDatas.validate ?? []);

  const showDebugModal = () => {
    setModalVisible(true);
  };

  const onDebugOk = () => {
    const request = caseDetail.request.teststeps[0];
    const payload = {
      ...caseDetail,
      request,
      export: [],
      base_url: '',
      before: [1],
    };
    console.log(payload);
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
        <Tabs defaultActiveKey="1">
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
          <TabPane tab="paramters" key="3">
            <ParametersTab
              parameters={parameters}
              onSwitchChange={() => {
                console.log('onSwitchChange');
              }}
              // addParams={addParams}
            />
          </TabPane>
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
          <Button className={styles.runBtn} onClick={showDebugModal}>
            调试
          </Button>
          <Button className={styles.saveBtn}>保存</Button>
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
          <Button className={styles.runBtn}>清空结果</Button>
          <Button className={styles.runBtn}>提取数据</Button>
        </div>
        <div className={styles.responseTabs}>
          <Tabs defaultActiveKey="1">{}</Tabs>
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
