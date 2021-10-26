import React from 'react';
import { Table, Button } from 'antd';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import {
  MenuOutlined,
  DeleteOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import styles from './index.less';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const SortableItem = SortableElement((props) => <tr {...props} />);
const CusSortableContainer = SortableContainer((props) => <tbody {...props} />);

class SortableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.tableData,
      columns: [
        {
          title: '编号',
          width: 60,
          className: 'drag-visible',
          render: () => <DragHandle />,
        },
        {
          title: '用例名称',
          dataIndex: 'name',
          align: 'center',
          className: 'drag-visible',
        },
        {
          title: '操作',
          align: 'center',
          className: 'drag-visible',
          width: 235,
          render: (text, record) => (
            <>
              <Button
                type="primary"
                onClick={() => this.showDetail(record)}
                icon={<ProfileOutlined />}
              >
                变量详情
              </Button>
              <Button
                type="primary"
                onClick={() => this.deleteLine(text)}
                danger
                icon={<DeleteOutlined />}
              >
                删除
              </Button>
            </>
          ),
        },
      ],
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.tableData,
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    const { onSortEnd } = this.props;
    if (oldIndex !== newIndex) {
      dataSource[oldIndex].index = newIndex + 1;
      dataSource[newIndex].index = oldIndex + 1;
      const newData = arrayMoveImmutable(
        [].concat(dataSource),
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
      onSortEnd(newData);
    }
  };

  showDetail = (record) => {
    const { showDetail } = this.props;
    // console.log(record);
    showDetail(record);
  };

  deleteLine = (text) => {
    const { deleteCall } = this.props;
    deleteCall(text);
  };

  DraggableContainer = (props) => (
    <CusSortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = this.state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x) => x.index === restProps['data-row-key'],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const { dataSource, columns } = this.state;
    return (
      <>
        <div>
          <span>拖拽改变步骤执行顺序</span>
        </div>
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
          className={styles.dragTable}
          rowKey="index"
          components={{
            body: {
              wrapper: this.DraggableContainer,
              row: this.DraggableBodyRow,
            },
          }}
        />
      </>
    );
  }
}

export default SortableTable;
