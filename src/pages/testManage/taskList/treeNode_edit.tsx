import React, { useState, useEffect } from 'react';
import { Collapse, Tree } from 'antd';
import { connect } from 'umi';
const { Panel } = Collapse;
import './index.less';

const TreeNode_Edit: React.FC<{}> = (props: any) => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(props.caseArray);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(
    props.caseArray,
  );
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
  const onCheckCase = (checkedKeysValue: React.Key[]) => {
    setCheckedKeys(checkedKeysValue);
    const new_CheckedListString = [];
    checkedKeysValue &&
      checkedKeysValue.map((checkedItem) => {
        if (typeof checkedItem == 'number') {
          new_CheckedListString.push(checkedItem);
        }
      });

    props.caseNumber(new_CheckedListString, new_CheckedListString.length);
  };
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  return (
    <div>
      <Collapse>
        {/* defaultActiveKey={["caseNumber"]} */}
        <Panel header="请选择用例" key="caseNumber" forceRender={false}>
          <Tree
            treeData={props.treeData}
            checkable
            onCheck={onCheckCase}
            checkedKeys={checkedKeys}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default connect(({ testCase, moduleList }) => ({
  moduleList,
  testCase,
}))(TreeNode_Edit);
