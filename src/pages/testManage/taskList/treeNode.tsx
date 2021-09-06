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

const TreeNode = (props: any) => {
  console.log('props', props.caseList);
  const treeData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
        },
        {
          title: '0-0-1',
          key: '0-0-1',
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    '0-0-0',
    '0-0-1',
  ]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  return (
    <div>
      <Collapse>
        <Panel header="选择用例" key="caseNumber">
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default TreeNode;
