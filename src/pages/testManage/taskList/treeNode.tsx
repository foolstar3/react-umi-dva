import React, { useState } from 'react';
import {
  Col,
  DatePicker,
  Collapse,
  Card,
  Select,
  Form,
  Input,
  Modal,
  Table,
  Button,
  Space,
  Tree,
} from 'antd';
import { connect } from 'umi';
const { Panel } = Collapse;
import './index.less';
import moduleList from '../moduleList';

const TreeNode = (props: any) => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    const caseArray = [];
    checkedKeysValue &&
      checkedKeysValue.map((item) => {
        if (!isNaN(item)) {
          caseArray.push(item);
        }
      });
    console.log('onCheck', checkedKeysValue);
    console.log('caseArray', caseArray);
    props.caseNumber(caseArray, caseArray.length);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div>
      <Collapse>
        <Panel header="选择用例" key="caseNumber" forceRender>
          <Tree
            checkable
            onExpand={onExpand}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={props.treeData}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default connect(({ testCase, moduleList }) => ({
  moduleList,
  testCase,
}))(TreeNode);
