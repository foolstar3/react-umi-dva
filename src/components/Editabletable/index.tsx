import React, { useState } from 'react';
import { Form, Table, Select, Input, Button } from 'antd';
import styles from './index.less';
const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  cellType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    cellType === 'type' ? (
      <Select>
        <Option value="number">Number</Option>
        <Option value="string">String</Option>
        <Option value="boolean">Boolean</Option>
      </Select>
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({ form, dataSource, columns }) => {
  const [editingKey, setEditingKey] = useState(-1);
  const actionCol = {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 200,
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <>
          <Button type="primary">保存</Button>
          <Button onClick={() => cancelEdit()}>取消</Button>
        </>
      ) : (
        <>
          <Button onClick={() => edit(record)}>编辑</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </>
      );
    },
  };
  columns.push(actionCol);

  const cancelEdit = () => {
    // console.log(columns);
    Object.keys(columns.find((item) => item.dataIndex === 'action')).length
      ? columns.pop()
      : '';
    setEditingKey(-1);
  };

  const isEditing = (record) => {
    return record.key === editingKey;
  };

  const edit = (record) => {
    // console.log(columns);
    Object.keys(columns.find((item) => item.dataIndex === 'action')).length
      ? columns.pop()
      : '';
    form.setFieldsValue({
      name: '',
      type: '',
      value: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => {
        //console.log(col,col.dataIndex === 'type' ? 'select' : 'text');
        return {
          record,
          cellType: col.dataIndex === 'type' ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        };
      },
    };
  });

  return (
    <div className={styles.table}>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={dataSource}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={false}
        />
      </Form>
    </div>
  );
};

export default EditableTable;
