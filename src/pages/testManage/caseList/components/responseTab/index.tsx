import React, { useState } from 'react';
import { Button, Tree, Collapse } from 'antd';
import classnames from 'classnames';
import { DataType } from '@/utils/common';

import styles from './index.less';
const { Panel } = Collapse;
const ResponseTab = ({ treeData, checkable, validators, onCheckedChange }) => {
  const [validateVisiable, setValidateVisiable] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const addKeyToTree = (node, key, index) => {
    node.key = `${key}-${index}`;
    if (node.children) {
      node.children.map((childNode, childIndex) =>
        addKeyToTree(childNode, node.key, childIndex),
      );
    }
  };
  treeData.map((node, index) => {
    node.key = `${index}`;
    if (node.children) {
      node.children.map((childNode, childIndex) =>
        addKeyToTree(childNode, node.key, childIndex),
      );
    }
  });
  const onCheck = (checkedKeysValue, e) => {
    setCheckedKeys(() => {
      onCheckedChange(e.checkedNodes);
      return checkedKeysValue;
    });
  };
  const responseTree = [];
  return (
    <>
      <div className={styles.topBtn}>
        <Button className={styles.cancelBtn}>TraceBack</Button>
        <Button
          className={styles.basicBtn}
          onClick={() => setValidateVisiable(!validateVisiable)}
        >
          Validate
        </Button>
      </div>
      <div className={styles.content}>
        <div className={styles.traceback}></div>
        <div
          className={classnames(
            styles.validate,
            validateVisiable ? '' : styles.hidden,
          )}
        >
          <Collapse className={styles.validateCollapse}>
            {validators.map((item, index) => (
              <Panel
                header={`第${index + 1}项--${item.check}`}
                key={index + 1}
                className={item.check_result === 'fail' ? styles.fail : ''}
              >
                <p>
                  【变量】：<span>{item.check}</span>
                </p>
                <p>
                  【检查内容】: <span>{item.expect}</span>(期望值|
                  {DataType(item.expect)}) <span>{item.comparator}</span>{' '}
                  <span>{item.check_value}</span>(实际值|
                  {DataType(item.check_value)})
                </p>
                <p>
                  【检查结果】: <span>{item.check_result}</span>
                </p>
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>
      <div className={styles.responseTree}>
        <Tree
          treeData={treeData}
          checkable={checkable}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
        />
      </div>
    </>
  );
};

export default ResponseTab;
