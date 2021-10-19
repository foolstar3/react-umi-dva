import React from 'react';
import { Card, Collapse, List, Table, Alert } from 'antd';
import { connect, history } from 'umi';
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
        color: [
          fontColors.error,
          fontColors.failure,
          fontColors.skipped,
          fontColors.success,
        ],
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
      scrollY: 0,
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
        <div className={styles.caseTitle}>{record.name}</div>
      ),
    },
    {
      dataIndex: 'status',
      align: 'center',
      filters: [
        {
          text: 'success',
          value: 'success',
        },
        {
          text: 'failure',
          value: 'failure',
        },
        {
          text: 'error',
          value: 'error',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <span style={{ color: fontColors[record.status] }}>
          {record.status === 'success'
            ? '成功'
            : record.status === 'failure'
            ? '失败'
            : '错误'}
        </span>
      ),
    },
  ];

  caseDetailColumn = [
    {
      dataIndex: 'check',
      title: '变量',
      align: 'center',
      // render: (_, record) => `${JSON.stringify(record.check)}`,
    },
    {
      dataIndex: 'check_value',
      title: '实际值',
      align: 'center',
      // render: (_, record) => `${JSON.stringify(record.check_value)}`,
    },
    {
      dataIndex: 'comparator',
      title: '运算符',
      align: 'center',
    },
    {
      dataIndex: 'expect',
      title: '期望值',
      align: 'center',
      render: (_, record) => `${record.expect}`,
    },
    {
      dataIndex: 'check_result',
      title: '检查结果',
      align: 'center',
      render: (text) => (
        <span
          style={{
            color: text === 'fail' ? fontColors.failure : fontColors.success,
          }}
        >
          {text}
        </span>
      ),
    },
  ];
  componentDidMount() {
    if (Object.keys(this.props.reportDetail).length) {
      // 由其他页面跳转进来页面初始化，通过props传入summary
      const { reportDetail } = this.props;
      localStorage.setItem('reportDetail', JSON.stringify(reportDetail));
      const { summary } = reportDetail;
      this.dealDatas(summary);
    } else {
      // 刷新报告页面时，如果本地有结果数据，则显示，否则跳转回到前一页
      if (localStorage.getItem('reportDetail') === null) {
        history.goBack();
      } else {
        const reportDetail = JSON.parse(localStorage.getItem('reportDetail'));
        const { summary } = reportDetail;
        this.dealDatas(summary);
      }
    }
  }

  componentDidUpdate(_, nextState) {
    window.scrollTo(0, nextState.scrollY);
  }

  dealDatas = (summary) => {
    const { count, time, base_url, name, success, step_datas } = summary;
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
        caseDetail: step_datas[0],
        stat: [
          {
            name: '测试环境',
            value: base_url,
            fontColor: fontColors.default,
          },
          {
            name: '用例总数',
            value:
              count.successes + count.failures + count.errors + count.skipped,
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
            style={{ height: '420px' }}
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
    const { caseList, caseDetail } = this.state;
    if (!caseList.length) return;
    const { step_datas } = caseList[0];
    const tableData = step_datas.map((item) => {
      item.key = item.name;
      return item;
    });
    return (
      <div className={styles.caseDetail}>
        <Card className={styles.list}>
          <Table
            dataSource={tableData}
            columns={this.caseListColumn}
            onRow={(record) => ({
              onClick: () => {
                this.setState({
                  caseDetail: record,
                  scrollY: window.scrollY,
                });
              },
            })}
          />
        </Card>
        <Card className={styles.detail} title={this.renderTitle(caseDetail)}>
          <Collapse>
            <Panel
              header={
                <>
                  <span className={styles.left}>接口: {caseDetail.name}</span>
                  <span className={styles.right}>
                    结果:{' '}
                    {
                      <span style={{ color: fontColors[caseDetail.status] }}>
                        {caseDetail.status === 'success'
                          ? '成功'
                          : caseDetail.status === 'failure'
                          ? '失败'
                          : '错误'}
                      </span>
                    }
                  </span>
                </>
              }
              key={`${caseDetail.name}-${caseDetail.status}`}
            >
              {this.renderDetailPanel(caseDetail)}
            </Panel>
          </Collapse>
        </Card>
      </div>
    );
  };

  renderDetailPanel = (detail) => {
    if (!Object.keys(detail).length) return;
    const { data } = detail;
    const { req_resps, validators, traceback } = data;
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
      {
        name: 'traceback',
        content: traceback,
      },
    ];
    return (
      <Collapse>
        {panelDetail.map((item) => {
          // validators panel
          if (item.name === 'validators') {
            if (item.content !== undefined) {
              const { validate_extractor } = item.content;
              if (Object.keys(validators).length) {
                const tableData = validate_extractor.map((item) => {
                  item.key = `${item.check}-${item.comparator}-${item.check_value}-${item.check_result}`;
                  return item;
                });
                return (
                  <Panel header={item.name} key={item.name}>
                    <Table
                      dataSource={tableData}
                      columns={this.caseDetailColumn}
                      pagination={false}
                    />
                  </Panel>
                );
              }
            } else {
              return null;
            }
          }
          // traceback panel
          if (item.name === 'traceback') {
            if (item.content !== undefined) {
              return (
                <Panel header={item.name} key={item.name}>
                  <Alert
                    // message={
                    //   // <span className={styles.tracebackTitle}>{item.name}</span>
                    // }
                    description={item.content}
                    type="error"
                  />
                </Panel>
              );
            } else {
              return null;
            }
          }
          // request和response panel
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

  renderTitle = (caseDetail) => {
    const { name, data, status } = caseDetail;
    return (
      <div className={styles.cardHeader}>
        <div className={styles.title}>{name}</div>
        <div className={styles.subtitle}>
          <span>
            {data.stat && (
              <span>
                运行时长: {(data.stat.elapsed_ms / 1000).toFixed(3) || 0}s
              </span>
            )}
            {/* 用例结果:{' '}
            <span style={{ color: fontColors[status] }}>{status}</span> */}
          </span>
        </div>
      </div>
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

export default connect(({ report }) => ({
  reportDetail: report.reportDetail,
}))(ReportDetail);
