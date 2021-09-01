import React, { Component } from 'react';
import { Card, Table } from 'antd';
import SearchBox from './searchBox';
import styles from './index.less';

class CaseList extends Component {
  render() {
    return (
      <>
        <Card>
          <SearchBox />
          <div className={styles.tableWrapper}>
            <Table></Table>
          </div>
        </Card>
      </>
    );
  }
}

export default CaseList;
