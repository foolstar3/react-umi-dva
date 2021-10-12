import React, { useState, useEffect } from 'react';
import { Collapse, Tree } from 'antd';
import { connect } from 'umi';
const { Panel } = Collapse;
import './index.less';
interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[],
): DataNode[] {
  list.map((moduleListItem) => {
    if (moduleListItem.key === key) {
      moduleListItem.children = children;
    }
  });
  return list;
}

const TreeNode_Add: React.FC<{}> = (props: any) => {
  const initTreeData: any = props.treeData_moduleList;
  const [treeData, setTreeData] = useState(initTreeData);
  useEffect(() => {
    setTreeData(initTreeData);
  });

  const onCheckCase = (checkedKeysValue: React.Key[]) => {
    // console.log('onCheck', checkedKeysValue);
    const new_CheckedListString = [];
    const new_CheckedListNumber = [];
    checkedKeysValue &&
      checkedKeysValue.map((checkedItem) => {
        if (typeof checkedItem == 'string') {
          new_CheckedListString.push(checkedItem);
        }
      });
    new_CheckedListString &&
      new_CheckedListString.map((checkedItem) => {
        new_CheckedListNumber.push(parseInt(checkedItem));
      });

    props.caseNumber(new_CheckedListNumber, new_CheckedListNumber.length);
  };

  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      // if (children) {
      //   resolve();
      //   return;
      // }
      console.log('onLoad');
      const payload = {
        page: 'None',
        project: props.checked_projectListId,
        module: key,
      };
      props.dispatch({
        type: 'testCase/getCaseList',
        payload: payload,
        callback: (caseList) => {
          const children = [];
          caseList &&
            caseList?.map((caseItem) => {
              if (caseItem.module === key) {
                children.push({
                  title: caseItem.name,
                  key: `${caseItem.id}`,
                  isLeaf: true,
                });
              }
            });
          setTimeout(() => {
            setTreeData((origin) => {
              updateTreeData(origin, key, children);
            });
            resolve();
          }, 1000);
        },
      });
    });

  console.log('treeData', treeData);
  return (
    <div>
      <Collapse>
        <Panel header="请选择用例" key="caseNumber">
          <Tree
            treeData={treeData}
            loadData={onLoadData}
            checkable
            onCheck={onCheckCase}
          />
        </Panel>
      </Collapse>
    </div>
  );
};

export default connect(({ testCase, moduleList }) => ({
  moduleList,
  testCase,
}))(TreeNode_Add);
