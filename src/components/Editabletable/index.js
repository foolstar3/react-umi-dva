import React, { useState } from 'react';
import {
  Form,
  Table,
  Select,
  Input,
  Button,
  AutoComplete,
  message,
} from 'antd';
import styles from './index.less';
import { comparators } from '@/constant/caseList';
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
          <Option value="String">String</Option>
          <Option value="Int">Int</Option>
          <Option value="Float">Float</Option>
          <Option value="Boolean">Boolean</Option>
        </Select>
      );
    } else if (cellType === 'funcSelect') {
      const renderTitle = (title) => (
        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'black' }}>
          所属项目：{title}
        </span>
      );
      const renderItem = (content) => {
        const option = content.map((item) => ({
          value: item,
          label: item,
        }));
        return option;
      };
      // const options = restProps.funcs.map((item) => renderOption(item));
      const options = Object.keys(restProps.funcs).map((key) => {
        return {
          label: renderTitle(key),
          options: renderItem(restProps.funcs[key]),
        };
      });
      return (
        <AutoComplete
          options={options}
          // filterOption={(inputValue, option) => option.options.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Input placeholder="请输入" />
        </AutoComplete>
      );
    } else if (cellType === 'comparator') {
      return (
        <Select>
          {comparators.map((item) => (
            <Option key={item} value={item.slice(0, item.indexOf(':'))}>
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
              message: `请输入${title}!`,
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
      message.error(`校验失败:${errInfo.errorFields[0].errors[0]}`);
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
          case 'comparator':
            type = 'comparator';
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
