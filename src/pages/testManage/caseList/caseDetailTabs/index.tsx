import react from 'react';
import { Tabs, Button } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

const CaseDetailTabs = ({ caseDetail, hideCaseDetail }) => {
  console.log(caseDetail);
  return (
    <>
      <div className={styles.tabBody}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="message" key="1">
            {/* <MessageTab /> */}
          </TabPane>
          <TabPane tab="variables" key="2">
            {/* Content of Tab Pane 2 */}
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
