import React from 'react';
import { Card, Collapse, List, Table } from 'antd';
import { connect } from 'umi';
import ReactECharts from 'echarts-for-react';
import styles from './index.less';

const { Panel } = Collapse;
const fontColors = {
  default: '#515A6E',
  summary: '#2D8CF0',
  success: '#19BE6B',
  failure: '#FF9900',
  error: '#ED4014',
  skipped: '#2DB7F5',
};
class ReportDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOptions: {
        title: {
          text: '用例执行情况',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '执行情况',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      stat: [],
      caseList: [],
    };
  }

  pageLayout = [
    {
      title: '报告汇总',
      renderContent: () => this.renderReportConclusion(),
    },
    {
      title: '用例详细',
      renderContent: () => this.renderCaseDetail(),
    },
  ];

  caseListColumn = [
    {
      dataIndex: 'name',
      title: '用例名称',
      align: 'center',
      render: (_, record) => (
        <>
          <div className={styles.caseTitle}>{record.name}</div>
          <div className={styles.caseUrl}>base_url:{record.base_url}</div>
        </>
      ),
    },
    {
      dataIndex: 'result',
      align: 'center',
      filters: [
        {
          text: 'Pass',
          value: true,
        },
        {
          text: 'Fail',
          value: false,
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.success === value,
      render: (_, record) =>
        record.success ? (
          <span className={styles.success}>Pass</span>
        ) : (
          <span className={styles.fail}>Fail</span>
        ),
    },
  ];

  caseDetailColumn = [
    {
      dataIndex: 'check',
      title: 'check',
      align: 'center',
    },
    {
      dataIndex: 'comparator',
      title: 'comparator',
      align: 'center',
    },
    {
      dataIndex: 'check_value',
      title: 'check_value',
      align: 'center',
      render: (_, record) => `${record.check_value}(实际值)`,
    },
    {
      dataIndex: 'expect',
      title: 'expect',
      align: 'center',
      render: (_, record) => `${record.expect}(期望值)`,
    },
    {
      dataIndex: 'check_result',
      title: 'check_result',
      align: 'center',
    },
  ];
  componentDidMount() {
    this.getReportDetail({ task_id: this.props.location.query.id });
  }

  getReportDetail = (payload) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'report/getReportDetail',
      payload,
      callback: (res) => {
        const summary = {
          status: 'SUCCESS',
          result: {
            name: 'task_summary',
            success: false,
            time: {
              start_at: 1632626071.9833562,
              start_at_iso_format: '2021-09-26 11:14:31',
              end_time: 1632626072.891466,
              duration: 0.91,
            },
            step_datas: [
              {
                success: false,
                name: 'organization/current',
                data: {
                  success: true,
                  req_resps: [
                    {
                      request: {
                        method: 'GET',
                        url: 'https://portal-dev.uihcloud.cn/portal-api/v1/organization/current',
                        headers: {
                          'User-Agent': 'python-requests/2.25.1',
                          'Accept-Encoding': 'gzip, deflate',
                          Accept: '*/*',
                          Connection: 'keep-alive',
                          Authorization:
                            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDQyMDUzMTMwMjUzMzA4MTk5IiwiY2xpZW50SWQiOiJlWHl3M2hJTExqN3Z2S1giLCJhY2NvdW50VHlwZSI6IjYzNDEiLCJpc3MiOiJodHRwczovL2F1dGgtZGV2LnVpaGNsb3VkLmNuL3YyIiwidXNlcklkIjoiNDA0MjA1MzEzMDI1MzMwODE5OSIsInVzZXJMb2dpbklkIjoiYWRtaW5AdWloY2xvdWQuY24iLCJhdWQiOiJlWHl3M2hJTExqN3Z2S1giLCJ1c2VySGVhZCI6IjI4MTVlZmM4NWI3NjQzMWFhNzg3YjBhNDA2MjY3NzVkIiwiYXBwSWQiOiIxMzgxNDgxNzA5NzA0MjM3MDU4IiwibmFtZSI6ImFkbWluQHVpaGNsb3VkLmNuIiwidGVuYW50SWQiOiIxMzc2NDA5MDExMzk2NjAzOTA1IiwiZXhwIjoxNjMyNjMzMjcyLCJ0cCI6ImlnIiwiaWF0IjoxNjMyNjI2MDcyfQ.eYZBjcNJcoCqtEa-MM_OktiGolqC4aW-ygjp6P2lmmHt63lDsDi6WiVwJGgm-NHkDYviV1kSk5UygclBEsGikq_CxY6Ur05QSgtDW6hVhcr7wUSZyO4BKV_gs2Ih5mKk1dxGHxha7MdsqVqrVOErEHrYX6P7I4KJtXofxzPzs0fDDWT0_ErdtVc3wHk9DvCkshxlKLUMqqkl_G1zK1AkAzo5eAU-pxz-0naKZJ12WMODzh-ouD2EXEpu8VH4DRBAVIedlXHmD6rPXw9tp41NfAFtU45Xx6dY-KWcuqOj6W7fE6vyr3jIa0yHhCs7Vcj2bqmmPe6t7CC9uvZU6bZ9nw',
                          'HRUN-Request-ID': 'HRUN--072329',
                        },
                        cookies: {},
                        body: null,
                      },
                      response: {
                        status_code: 200,
                        headers: {
                          Date: 'Sun, 26 Sep 2021 03:14:32 GMT',
                          'Content-Type': 'application/json;charset=UTF-8',
                          'Transfer-Encoding': 'chunked',
                          Connection: 'keep-alive',
                          Vary: 'Accept-Encoding',
                          'Set-Cookie':
                            'JSESSIONID=KiYsdDRY-d-x-SdYhO_DBELih4mlI36xDaxCr5xt; Domain=/; Path=/; Max-Age=0; Expires=Sat, 25-Sep-2021 03:14:32 GMT; Version=1; Secure; HttpOnly; SameSite=strict, JSESSIONID=KiYsdDRY-d-x-SdYhO_DBELih4mlI36xDaxCr5xt; path=/portal-api',
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Credentials': 'true',
                          'Access-Control-Allow-Methods':
                            'GET, PUT, POST, DELETE, PATCH, OPTIONS',
                          'Access-Control-Allow-Headers':
                            'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization',
                          'Strict-Transport-Security':
                            'max-age=15724800; includeSubDomains',
                          'X-Frame-Options': 'SAMEORIGIN',
                          'X-XSS-Protection': '1; mode=block',
                          'X-Content-Type-Options': 'nosniff',
                          'Content-Encoding': 'gzip',
                        },
                        cookies: {
                          JSESSIONID:
                            'KiYsdDRY-d-x-SdYhO_DBELih4mlI36xDaxCr5xt',
                        },
                        encoding: 'UTF-8',
                        content_type: 'application/json;charset=UTF-8',
                        body: {
                          code: 'U000000',
                          msgCode: 'success.id',
                          data: [
                            {
                              id: '1424959505459003396',
                              name: '中南医院',
                            },
                          ],
                        },
                      },
                    },
                  ],
                  stat: {
                    content_size: 0,
                    response_time_ms: 187.02,
                    elapsed_ms: 186.579,
                  },
                  address: {
                    client_ip: '10.5.65.24',
                    client_port: 64203,
                    server_ip: '10.6.209.45',
                    server_port: 443,
                  },
                  validators: {
                    validate_extractor: [
                      {
                        comparator: 'equal',
                        check: 'status_code',
                        check_value: 200,
                        expect: 200,
                        expect_value: 200,
                        message: '',
                        check_result: 'pass',
                      },
                      {
                        comparator: 'equal',
                        check: 'body.data[0].name',
                        check_value: '中南医院',
                        expect: '',
                        expect_value: '',
                        message: '',
                        check_result: 'fail',
                      },
                      {
                        comparator: 'contains',
                        check: 'success.id',
                        check_value: 'success.id',
                        expect: 'success',
                        expect_value: 'success',
                        message: '',
                        check_result: 'pass',
                      },
                    ],
                  },
                },
                export_vars: {
                  msg_code: 'success.id',
                },
              },
              {
                success: true,
                name: 'user/list',
                data: {
                  success: true,
                  req_resps: [
                    {
                      request: {
                        method: 'POST',
                        url: 'https://portal-dev.uihcloud.cn/portal-api/v1/user/list',
                        headers: {
                          'User-Agent': 'python-requests/2.25.1',
                          'Accept-Encoding': 'gzip, deflate',
                          Accept: '*/*',
                          Connection: 'keep-alive',
                          Authorization:
                            'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDQyMDUzMTMwMjUzMzA4MTk5IiwiY2xpZW50SWQiOiJlWHl3M2hJTExqN3Z2S1giLCJhY2NvdW50VHlwZSI6IjYzNDEiLCJpc3MiOiJodHRwczovL2F1dGgtZGV2LnVpaGNsb3VkLmNuL3YyIiwidXNlcklkIjoiNDA0MjA1MzEzMDI1MzMwODE5OSIsInVzZXJMb2dpbklkIjoiYWRtaW5AdWloY2xvdWQuY24iLCJhdWQiOiJlWHl3M2hJTExqN3Z2S1giLCJ1c2VySGVhZCI6IjI4MTVlZmM4NWI3NjQzMWFhNzg3YjBhNDA2MjY3NzVkIiwiYXBwSWQiOiIxMzgxNDgxNzA5NzA0MjM3MDU4IiwibmFtZSI6ImFkbWluQHVpaGNsb3VkLmNuIiwidGVuYW50SWQiOiIxMzc2NDA5MDExMzk2NjAzOTA1IiwiZXhwIjoxNjMyNjMzMjcyLCJ0cCI6ImlnIiwiaWF0IjoxNjMyNjI2MDcyfQ.eYZBjcNJcoCqtEa-MM_OktiGolqC4aW-ygjp6P2lmmHt63lDsDi6WiVwJGgm-NHkDYviV1kSk5UygclBEsGikq_CxY6Ur05QSgtDW6hVhcr7wUSZyO4BKV_gs2Ih5mKk1dxGHxha7MdsqVqrVOErEHrYX6P7I4KJtXofxzPzs0fDDWT0_ErdtVc3wHk9DvCkshxlKLUMqqkl_G1zK1AkAzo5eAU-pxz-0naKZJ12WMODzh-ouD2EXEpu8VH4DRBAVIedlXHmD6rPXw9tp41NfAFtU45Xx6dY-KWcuqOj6W7fE6vyr3jIa0yHhCs7Vcj2bqmmPe6t7CC9uvZU6bZ9nw',
                          'HRUN-Request-ID': 'HRUN--072717',
                          Cookie:
                            'JSESSIONID=KiYsdDRY-d-x-SdYhO_DBELih4mlI36xDaxCr5xt',
                          'Content-Length': '157',
                          'Content-Type': 'application/json',
                        },
                        cookies: {
                          JSESSIONID:
                            'KiYsdDRY-d-x-SdYhO_DBELih4mlI36xDaxCr5xt',
                        },
                        body: {
                          appId: '',
                          orgId: '',
                          active: true,
                          deptId: '',
                          roleId: '',
                          pageNum: 1,
                          joinDate: null,
                          pageSize: '10',
                          tenantId: '',
                          nameOrLoginId: '',
                        },
                      },
                      response: {
                        status_code: 200,
                        headers: {
                          Date: 'Sun, 26 Sep 2021 03:14:32 GMT',
                          'Content-Type': 'application/json;charset=UTF-8',
                          'Transfer-Encoding': 'chunked',
                          Connection: 'keep-alive',
                          Vary: 'Accept-Encoding',
                          'Set-Cookie':
                            'JSESSIONID=KiYsdDRY-d-x-SdYhO_DBELih4mlI36xDaxCr5xt; Domain=/; Path=/; Max-Age=0; Expires=Sat, 25-Sep-2021 03:14:32 GMT; Version=1; Secure; HttpOnly; SameSite=strict',
                          'Access-Control-Allow-Origin': '*',
                          'Access-Control-Allow-Credentials': 'true',
                          'Access-Control-Allow-Methods':
                            'GET, PUT, POST, DELETE, PATCH, OPTIONS',
                          'Access-Control-Allow-Headers':
                            'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization',
                          'Strict-Transport-Security':
                            'max-age=15724800; includeSubDomains',
                          'X-Frame-Options': 'SAMEORIGIN',
                          'X-XSS-Protection': '1; mode=block',
                          'X-Content-Type-Options': 'nosniff',
                          'Content-Encoding': 'gzip',
                        },
                        cookies: {},
                        encoding: 'UTF-8',
                        content_type: 'application/json;charset=UTF-8',
                        body: {
                          code: 'U000000',
                          msgCode: 'success.id',
                          data: {
                            cur: 1,
                            total: 537,
                            data: [
                              {
                                id: '1441674233314160652',
                                localAccountName: null,
                                ldapAccountName: 'alapati',
                                name: '阿拉帕提·买买提明',
                                phoneNoAccountName: null,
                                emailAccountName: null,
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-25',
                                sopId: '1288',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441674233297383425',
                                localAccountName: null,
                                ldapAccountName: 'zhaokai.chen',
                                name: '陈昭锴',
                                phoneNoAccountName: null,
                                emailAccountName: null,
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-25',
                                sopId: '1286',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441674233314160646',
                                localAccountName: null,
                                ldapAccountName: 'jiashuai.wang',
                                name: '王佳帅',
                                phoneNoAccountName: null,
                                emailAccountName: null,
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-25',
                                sopId: '1287',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441311795788640307',
                                localAccountName: 'nnnn123',
                                ldapAccountName: null,
                                name: 'nn1',
                                phoneNoAccountName: '13244444444',
                                emailAccountName: 'nn@qq.com',
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '0',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441311795788640298',
                                localAccountName: 'nnnnnn',
                                ldapAccountName: null,
                                name: 'nn',
                                phoneNoAccountName: '13233333333',
                                emailAccountName: 'nnnnnn@qq.com',
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '0',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441311795788640292',
                                localAccountName: 'uyyyyy',
                                ldapAccountName: null,
                                name: '3333',
                                phoneNoAccountName: '15111111111',
                                emailAccountName: 'yyyyy@qq.com',
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '0',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441311795788640287',
                                localAccountName: null,
                                ldapAccountName: 'lft_02',
                                name: 'wbe',
                                phoneNoAccountName: '13199999999',
                                emailAccountName: '11@qq.com',
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '0',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441311795788640282',
                                localAccountName: null,
                                ldapAccountName: 'li_123',
                                name: 'vdf',
                                phoneNoAccountName: '13922222222',
                                emailAccountName: '12345678@qq.com',
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '0',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441311856304545794',
                                localAccountName: null,
                                ldapAccountName: 'bao.liu',
                                name: '刘宝',
                                phoneNoAccountName: null,
                                emailAccountName: null,
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '1285',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                              {
                                id: '1441307974689357828',
                                localAccountName: '1245737',
                                ldapAccountName: null,
                                name: '11111',
                                phoneNoAccountName: '13511111111',
                                emailAccountName: '111111@qq.com',
                                lastLoginTime: null,
                                gender: 'O',
                                joinDatetime: '2021-09-24',
                                sopId: '0',
                                active: 1,
                                orgName: null,
                                deptName: null,
                                tenantId: null,
                                tenantName: null,
                              },
                            ],
                          },
                        },
                      },
                    },
                  ],
                  stat: {
                    content_size: 0,
                    response_time_ms: 145,
                    elapsed_ms: 143.456,
                  },
                  address: {
                    client_ip: '10.5.65.24',
                    client_port: 64203,
                    server_ip: '10.6.209.45',
                    server_port: 443,
                  },
                  validators: {
                    validate_extractor: [
                      {
                        comparator: 'startswith',
                        check: 'body.msgCode',
                        check_value: 'success.id',
                        expect: 'success',
                        expect_value: 'success',
                        message: '',
                        check_result: 'pass',
                      },
                    ],
                  },
                },
                export_vars: {},
              },
            ],
            count: {
              successes: 1,
              failures: 1,
              errors: 0,
              skipped: 0,
            },
            case_id: '2',
            platform: {
              httprunner_version: '3.1.6',
              python_version: '3.9.2',
            },
            base_url: 'uap_dev(https://portal-dev.uihcloud.cn/portal-api)',
          },
          traceback: null,
          children: [],
          date_done: '2021-09-26T03:14:32.905467',
          task_id: '1a9e80ae-fb70-427f-8ae0-dc619e0818ff',
        };
        const { result } = summary;
        const { count, time, base_url, name, success, step_datas } = result;
        this.setState(() => {
          // 报告汇总图表数据
          const next = JSON.parse(JSON.stringify(this.state.chartOptions));
          next.series[0].data = [
            { value: count.errors, name: '错误' },
            { value: count.failures, name: '失败' },
            { value: count.skipped, name: '跳过' },
            { value: count.successes, name: '成功' },
          ];
          // 用例详情数据
          const caseListDataSource = [
            {
              name,
              success,
              base_url,
              step_datas,
              key: name,
              time,
            },
          ];
          return {
            chartOptions: next,
            caseList: caseListDataSource,
            stat: [
              {
                name: '测试环境',
                value: base_url,
                fontColor: fontColors.default,
              },
              {
                name: '用例总数',
                value:
                  count.successes +
                  count.failures +
                  count.errors +
                  count.skipped,
                fontColor: fontColors.summary,
              },
              {
                name: '用例成功',
                value: count.successes,
                fontColor: fontColors.success,
              },
              {
                name: '用例失败',
                value: count.failures,
                fontColor: fontColors.failure,
              },
              {
                name: '用例错误',
                value: count.errors,
                fontColor: fontColors.error,
              },
              {
                name: '用例跳过',
                value: count.skipped,
                fontColor: fontColors.skipped,
              },
              {
                name: '开始时间',
                value: time.start_at_iso_format,
                fontColor: fontColors.default,
              },
              {
                name: '运行时长',
                value: `${time.duration}s`,
                fontColor: fontColors.default,
              },
              {
                name: '用例成功率',
                value: `${parseFloat(
                  (count.successes * 100) /
                    (count.successes +
                      count.failures +
                      count.errors +
                      count.skipped),
                ).toFixed(2)}%`,
                fontColor: fontColors.default,
              },
            ],
          };
        });
      },
    });
  };
  renderReportConclusion = () => {
    const { stat, chartOptions } = this.state;
    return (
      <div className={styles.reportSummary}>
        <Card className={styles.chart}>
          <ReactECharts
            option={chartOptions}
            notMerge={true}
            lazyUpdate={true}
            theme={'theme_name'}
          />
        </Card>
        <Card className={styles.stat}>
          <List
            dataSource={stat}
            renderItem={(item) => (
              <List.Item style={{ color: item.fontColor }}>
                <div className={styles.title}>
                  <span>{item.name}:</span>
                </div>
                <div className={styles.value}>
                  <span>{item.value}</span>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    );
  };

  renderCaseDetail = () => {
    const { caseList } = this.state;
    if (!caseList.length) return;
    const { step_datas } = caseList[0];
    const renderDetail = step_datas && step_datas.length;
    return (
      <div className={styles.caseDetail}>
        <Card className={styles.list}>
          <Table
            dataSource={caseList}
            columns={this.caseListColumn}
            onRow={(record) => ({
              onClick: () => {
                this.setState({
                  caseDetail: record,
                });
              },
            })}
          />
        </Card>
        <Card className={styles.detail} title={this.renderTitle(caseList)}>
          <Collapse>
            {renderDetail &&
              step_datas.map((item, index) => {
                return (
                  <Panel
                    header={
                      <>
                        <span className={styles.left}>
                          接口{index} : {item.name}
                        </span>
                        <span className={styles.right}>
                          结果:{' '}
                          {item.success ? (
                            <span style={{ color: fontColors.success }}>
                              success
                            </span>
                          ) : (
                            <span style={{ color: fontColors.failure }}>
                              failure
                            </span>
                          )}
                        </span>
                      </>
                    }
                    key={`${item.name}-${item.index}`}
                  >
                    {this.renderDetailPanel(item)}
                  </Panel>
                );
              })}
          </Collapse>
        </Card>
      </div>
    );
  };

  renderDetailPanel = (detail) => {
    if (!Object.keys(detail).length) return;
    const { data } = detail;
    const { req_resps, validators } = data;
    const panelDetail = [
      {
        name: 'request',
        content: req_resps[0].request,
      },
      {
        name: 'response',
        content: req_resps[0].response,
      },
      {
        name: 'validators',
        content: validators,
      },
    ];
    return (
      <Collapse>
        {panelDetail.map((item) => {
          console.log(item);
          if (item.name === 'validators') {
            const { validate_extractor } = item.content;
            const tableData = validate_extractor.map((item) => {
              item.key = `${item.check}-${item.comparator}-${item.check_value}-${item.check_result}`;
              return item;
            });
            return (
              <Panel header={item.name} key={item.name}>
                <Table dataSource={tableData} columns={this.caseDetailColumn} />
              </Panel>
            );
          }
          const listData = [];
          Object.keys(item.content).forEach((child) => {
            const value =
              typeof item.content[child] === 'object'
                ? JSON.stringify(item.content[child])
                : item.content[child];
            const listItem = {
              name: child,
              value,
            };
            listData.push(listItem);
          });
          return (
            <Panel header={item.name} key={item.name}>
              <List
                dataSource={listData}
                className={styles.detailList}
                renderItem={(item) => (
                  <List.Item className={styles.listItem}>
                    <div className={styles.title}>
                      <span>{item.name}:</span>
                    </div>
                    <div className={styles.value}>
                      <p>{item.value}</p>
                    </div>
                  </List.Item>
                )}
              />
            </Panel>
          );
        })}
      </Collapse>
    );
  };
  renderTitle = (caseList) => {
    const { name, time } = caseList[0];
    return (
      <>
        <div className={styles.title}>{name}</div>
        <div className={styles.subtitle}>
          <div>
            <span>
              成功接口: <span style={{ color: fontColors.success }}>0</span>
            </span>
            <span>
              失败接口: <span style={{ color: fontColors.failure }}>0</span>
            </span>
            <span>
              错误接口: <span style={{ color: fontColors.error }}>0</span>
            </span>
            <span>
              跳过接口: <span style={{ color: fontColors.skipped }}>0</span>
            </span>
          </div>
          <div>
            <span>运行时长: {time.duration}s</span>
            <span>
              用例结果:{' '}
              {caseList.success ? (
                <span style={{ color: fontColors.success }}>Success</span>
              ) : (
                <span style={{ color: fontColors.failure }}>Fail</span>
              )}
            </span>
          </div>
        </div>
      </>
    );
  };

  render() {
    return (
      <Card>
        <Collapse
          defaultActiveKey={[this.pageLayout[0].title]}
          className={styles.reportDetailCollapse}
        >
          {this.pageLayout.map((item) => (
            <Panel header={item.title} key={item.title}>
              {item.renderContent()}
            </Panel>
          ))}
        </Collapse>
      </Card>
    );
  }
}

export default connect(() => ({}))(ReportDetail);
