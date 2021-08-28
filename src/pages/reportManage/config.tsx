import { Button } from 'antd';
const config = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    width: '50px',
  },
  {
    title: '报告名称',
    dataIndex: 'report_name',
    key: 'report_name',
  },
  {
    title: '简要描述',
    dataIndex: 'description',
    key: 'description',
    textWrap: 'word-break',
    ellipsis: true,
    width: '200',
  },
  {
    title: '用例总数',
    dataIndex: 'case_sum',
    key: 'case_sum',
  },
  {
    title: '成功用例',
    dataIndex: 'case_pass',
    key: 'case_pass',
  },
  {
    title: '开始时间',
    dataIndex: 'start_at',
    key: 'start_at',
    textWrap: 'word-break',
    ellipsis: true,
  },
  {
    title: '运行时长',
    dataIndex: 'duration',
    key: 'duration',
  },
  {
    title: '运行结果',
    dataIndex: 'result',
    key: 'result',
  },
];

export default config;
