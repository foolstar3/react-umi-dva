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
  const inputNode = () => {
    if (cellType === 'typeSelect') {
      return (
        <Select>
          <Option value="string">String</Option>
          <Option value="number">Int</Option>
          <Option value="number">Float</Option>
          <Option value="boolean">Boolean</Option>
        </Select>
      );
    } else if (cellType === 'funcSelect') {
      return (
        <Select>
          {restProps.funcs.map((item) => (
            <Option value={item} key={item}>
              {item}
            </Option>
          ))}
        </Select>
      );
    } else {
      return <Input />;
    }
  };

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
          {inputNode()}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = ({
  form,
  dataSource,
  columns,
  funcs = [],
  lineDelete = (_line) => {},
  lineSave = (_line) => {},
}) => {
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
          <Button type="primary" onClick={() => save(record.key)}>
            保存
          </Button>
          <Button onClick={() => cancelEdit()}>取消</Button>
        </>
      ) : (
        <>
          <Button onClick={() => edit(record)}>编辑</Button>
          <Button type="primary" danger onClick={() => lineDelete(record)}>
            删除
          </Button>
        </>
      );
    },
  };
  // 若操作列已存在，删除最后一列
  // 否则不操作
  columns.find((item) => item.dataIndex === 'action') ? columns.pop() : '';
  columns.push(actionCol);
  const cancelEdit = () => {
    setEditingKey(-1);
  };

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

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const line = { ...row, key };
      lineSave(line);
      Object.keys(columns.find((item) => item.dataIndex === 'action')).length
        ? columns.pop()
        : '';
      setEditingKey(-1);
    } catch (errInfo) {
      console.log('校验失败:', errInfo);
    }
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => {
        let type = '';
        switch (col.dataIndex) {
          case 'type':
            type = 'typeSelect';
            break;
          case 'funcName':
            type = 'funcSelect';
            break;
          default:
            type = 'text';
            break;
        }
        return {
          funcs,
          record,
          cellType: type,
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
