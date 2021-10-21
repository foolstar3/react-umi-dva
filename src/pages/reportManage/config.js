const config = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
  },
  {
    title: '报告名称',
    dataIndex: 'report_name',
    key: 'report_name',
    align: 'center',
  },
  {
    title: '项目名称',
    dataIndex: 'project_name',
    align: 'center',
  },
  {
    title: '简要描述',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
    width: 200,
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
    align: 'center',
    render: (text) => {
      const time = text.replace(/T/, ' ').slice(0, text.indexOf('+'));
      return <span>{time}</span>;
    },
  },
  {
    title: '运行时长',
    dataIndex: 'duration',
    key: 'duration',
    align: 'center',
    render: (text) => <span>{text}s</span>,
  },
  {
    title: '运行结果',
    dataIndex: 'result',
    key: 'result',
    align: 'center',
    render: (text) => {
      switch (text) {
        case 'failure':
          return <span style={{ color: 'red' }}>失败</span>;
        case 'pass':
          return <span style={{ color: 'green' }}>通过</span>;
        case 'running':
          return <span style={{ color: '#1868cb' }}>运行中</span>;
      }
    },
  },
];

export default config;
