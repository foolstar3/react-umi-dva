import React, { useState, useEffect } from 'react';
import { Collapse, Tree } from 'antd';
import { connect } from 'umi';
const { Panel } = Collapse;
import './index.less';
import { extend } from 'umi-request';
interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(
  list: DataNode[],
  key: React.Key,
  children: DataNode[],
): DataNode[] {
  console.log('children', children);
  list.map((moduleListItem) => {
    if (moduleListItem.key === key) {
      moduleListItem.children = children;
    }
    // if (node.children) {
    //   return {
    //     ...node,
    //     children: updateTreeData(node.children, key, children),
    //   };
    //
  });
  console.log('lsit', list);
}

const TreeNode: React.FC<{}> = (props: any) => {
  const initTreeData: any = props.treeData_moduleList;
  const [treeData, setTreeData] = useState(initTreeData);
  useEffect(() => {
    setTreeData(initTreeData);
  });
  const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
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
          caseList.map((caseItem) => {
            if (caseItem.module === key) {
              children.push({
                title: caseItem.name,
                key: caseItem.id,
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

  return (
    <div>
      <Collapse>
        <Panel header="请选择用例" key="caseNumber" forceRender>
          <Tree treeData={treeData} loadData={onLoadData} checkable />
        </Panel>
      </Collapse>
    </div>
  );
};

export default connect(({ testCase, moduleList }) => ({
  moduleList,
  testCase,
}))(TreeNode);
