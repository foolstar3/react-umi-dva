import React from 'react';
import { Tabs, Button } from 'antd';
import styles from './index.less';
import MessageTab from './messageTab';
import VariablesTab from './variablesTab';

const { TabPane } = Tabs;

const CaseDetailTabs = ({
  caseDetail,
  hideCaseDetail,
  projectData,
  moduleData,
  onProjectChange,
  onModuleChange,
  caseList,
}) => {
  console.log(caseDetail);
  const variables = Object.keys(caseDetail).length
    ? JSON.parse(caseDetail.request).variables
    : [];
  console.log(JSON.parse(caseDetail.request).variables);
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
            {/* Content of Tab Pane 3 */}
          </TabPane>
          <TabPane tab="hooks" key="4">
            {/* Content of Tab Pane 4 */}
          </TabPane>
          <TabPane tab="request" key="5">
            {/* Content of Tab Pane 5 */}
          </TabPane>
          <TabPane tab="extract/validate" key="6">
            {/* Content of Tab Pane 6 */}
          </TabPane>
        </Tabs>
      </div>
      <div className={styles.footer}>
        <div className={styles.left}>
          <Button className={styles.runBtn}>调试</Button>
          <Button className={styles.saveBtn}>保存</Button>
        </div>
        <div className={styles.right}>
          <Button className={styles.cancelBtn} onClick={hideCaseDetail}>
            取消
          </Button>
        </div>
      </div>
    </>
  );
};

export default CaseDetailTabs;
