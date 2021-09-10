const config = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    width: '70px',
    align: 'center',
  },
  {
    title: '报告名称',
    dataIndex: 'report_name',
    key: 'report_name',
    align: 'center',
  },
  {
    title: '简要描述',
    dataIndex: 'description',
    key: 'description',
    textWrap: 'word-break',
    ellipsis: true,
    width: '200',
    align: 'center',
  },
  {
    title: '用例总数',
    dataIndex: 'case_sum',
    key: 'case_sum',
    align: 'center',
  },
  {
    title: '成功用例',
    dataIndex: 'case_pass',
    key: 'case_pass',
    align: 'center',
  },
  {
    title: '开始时间',
    dataIndex: 'start_at',
    key: 'start_at',
    textWrap: 'word-break',
    ellipsis: true,
    align: 'center',
  },
  {
    title: '运行时长',
    dataIndex: 'duration',
    key: 'duration',
    align: 'center',
  },
  {
    title: '运行结果',
    dataIndex: 'result',
    key: 'result',
    align: 'center',
  },
];

export default config;
