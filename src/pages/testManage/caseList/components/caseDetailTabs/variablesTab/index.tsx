import React, { useState } from 'react';
import { Table, Button, Form, Select, Input } from 'antd';
import { DataType } from '@/utils/common';

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
    cellType === 'select' ? (
      <Select>
        <Option value="number">Number</Option>
        <Option value="string">String</Option>
        <Option value="boolean">Boolean</Option>
      </Select>
    ) : (
      <Input />
    );
  // console.log(cellType, record, inputNode);
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

const VariablesTab = ({ variables }) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(-1);
  const variablesData = [];
  if (variables && Object.keys(variables).length !== 0) {
    let index = 1;
    for (const [key, value] of Object.entries(variables)) {
      variablesData.push({
        name: key,
        value: value,
        type: DataType(value),
        id: index,
        key: index,
      });
      index++;
    }
    // console.log(variablesData);
    // variables.map((item, index) => {
    //   Object.keys(item).forEach((key, val) => {
    //     item.name = key;
    //     item.value = val;
    //     const type = Object.prototype.toString.call(val);
    //     item.type = type.substring(7, type.length - 1);
    //   });
    //   item.id = index;
    //   item.key = index;
    // });
  }

  const cancelEdit = () => {
    setEditingKey(-1);
  };

  const tableColumns: any = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '变量名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      editable: true,
    },
    {
      title: '变量类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      editable: true,
    },
    {
      title: '变量值',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      textWrap: 'word-break',
      ellipsis: true,
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
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
    },
  ];

  const isEditing = (record) => {
    return record.key === editingKey;
  };

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      type: '',
      value: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const mergedColumns = tableColumns.map((col) => {
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
    <>
      <div className={styles.topBtn}>
        <Button type="primary">添加变量</Button>
      </div>
      <Form form={form} component={false}>
        <Table
          columns={mergedColumns}
          dataSource={variablesData}
          pagination={false}
          rowClassName="editable-row"
          bordered
          components={{
            body: {
              cell: EditableCell,
            },
          }}
        />
      </Form>
    </>
  );
};

export default VariablesTab;
