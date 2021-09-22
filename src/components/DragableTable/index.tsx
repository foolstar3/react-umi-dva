import React from 'react';
import { Table, Button } from 'antd';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from 'react-sortable-hoc';
import { MenuOutlined, DeleteOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />
));

const columns: any = [
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
    render: (_, record) => (
      <Button type="primary" danger icon={<DeleteOutlined />}>
        删除
      </Button>
    ),
  },
];
const SortableItem = SortableElement((props) => <tr {...props} />);
const CusSortableContainer = SortableContainer((props) => <tbody {...props} />);

class SortableTable extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.tableData,
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: nextProps.tableData,
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = this.state;
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        [].concat(dataSource),
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
      this.setState({ dataSource: newData });
    }
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
    const { dataSource } = this.state;
    return (
      <>
        <div>
          <span>拖拽改变步骤执行顺序</span>
        </div>
        <Table
          pagination={false}
          dataSource={dataSource}
          columns={columns}
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