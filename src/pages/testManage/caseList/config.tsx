import { DateFormat } from '@/utils/common';

const tableColumns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '用例名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: '项目名称',
    dataIndex: 'project_name',
    key: 'project_name',
    align: 'center',
  },
  {
    title: '模块名称',
    dataIndex: 'module_name',
    key: 'module_name',
    align: 'center',
  },
  {
    title: '测试人员',
    dataIndex: 'author_name',
    key: 'author',
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center',
    render: (text) => {
      const time = DateFormat(text);
      return <span>{time}</span>;
    },
  },
  {
    title: '更新时间',
    dataIndex: 'create_time',
    key: 'create_time',
    align: 'center',
    render: (text) => {
      const time = DateFormat(text);
      return <span>{time}</span>;
    },
  },
];

export default tableColumns;
