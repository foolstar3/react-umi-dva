import React from 'react';
import { Button, Tree } from 'antd';

import styles from './index.less';

const ResponseTab = ({ treeData, checkable }) => {
  // console.log(treeData);
  const addKeyToTree = (node, key, index) => {
    node.key = `${key}-${index}`;
    if (node.children) {
      node.children.map((childNode, childIndex) =>
        addKeyToTree(childNode, node.key, childIndex),
      );
    }
  };
  treeData.map((node, index) => {
    node.key = index;
    if (node.children) {
      node.children.map((childNode, childIndex) =>
        addKeyToTree(childNode, node.key, childIndex),
      );
    }
  });
  // console.log(treeData);
  const responseTree = [];
  return (
    <>
      <div className={styles.topBtn}>
        <Button>TraceBack</Button>
        <Button>Validate</Button>
      </div>
      <div className={styles.content}>
        <div className={styles.traceback}></div>
        <div className={styles.validate}></div>
      </div>
      <div className={styles.responseTree}>
        <Tree treeData={treeData} checkable={checkable} />
      </div>
    </>
  );
};

export default ResponseTab;
