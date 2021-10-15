import React, { useState } from 'react';
import { Button, Tree, Collapse } from 'antd';
import classnames from 'classnames';
import { DataType } from '@/utils/common';

import styles from './index.less';
const { Panel } = Collapse;
const ResponseTab = ({ treeData, checkable, validators, onCheckedChange }) => {
  const [validateVisiable, setValidateVisiable] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const defaultExpanded = [];
  const addKeyToTree = (node, key, index, checkable) => {
    node.key = `${key}-${index}`;
    node.checkable = checkable;
    if (node.children) {
      node.children.map((childNode, childIndex) =>
        addKeyToTree(childNode, node.key, childIndex, node.checkable),
      );
    }
  };
  treeData.map((node, index) => {
    node.key = `${index}`;
    node.expanded = true;
    defaultExpanded.push(node);
    index === 0 ? (node.checkable = false) : '';
    if (node.children) {
      node.children.map((childNode, childIndex) => {
        childNode.expanded = true;
        defaultExpanded.push(childNode);
        return addKeyToTree(childNode, node.key, childIndex, node.checkable);
      });
    }
  });
  const expandedKeys = defaultExpanded
    .filter((item) => item.expanded)
    .map((item) => item.key);
  const onCheck = (checkedKeysValue, e) => {
    setCheckedKeys(() => {
      onCheckedChange(e.checkedNodes);
      return checkedKeysValue;
    });
  };

  return (
    <>
      <div className={styles.topBtn}>
        <Button className={classnames(styles.cancelBtn, styles.hidden)}>
          TraceBack
        </Button>
        <Button
          className={classnames(
            styles.basicBtn,
            validators.length ? '' : styles.hidden,
          )}
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
                  【检查内容】: <span>{item.check_value}</span>(实际值|
                  {DataType(item.check_value)}) <span>{item.comparator}</span>{' '}
                  <span>{item.expect}</span>(期望值|{DataType(item.expect)})
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
          defaultExpandedKeys={expandedKeys}
          onCheck={onCheck}
          checkedKeys={checkedKeys}
        />
      </div>
    </>
  );
};

export default ResponseTab;
