import React, { Component } from 'react';
import { connect } from 'umi';
import { Card, Row, Col } from 'antd';
import ReactECharts from 'echarts-for-react';
import {
  ProjectOutlined,
  PartitionOutlined,
  CalendarOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import './index.css';
const { Meta } = Card;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_num: 0,
      module_num: 0,
      testcase_num: 0,
      new_testcase_num: 0,
      run_case_sum: 0,
      run_case_pass: 0,
      series: {},
    };
  }

  componentDidMount() {
    this.getDashboardInfo();
  }
  getDashboardInfo = () => {
    this.props.dispatch({
      type: 'dashboard/get_dashboard_info',
      callback: (res) => {
        this.setState({
          project_num: res.project_num,
          module_num: res.module_num,
          run_case_sum: res.run_case_sum,
          new_testcase_num: res.new_testcase_num,
          run_case_pass: res.run_case_pass,
          series: res.series,
          testcase_num: res.testcase_num,
        });
      },
    });
  };

  render() {
    const option = {
      title: {
        text: '近30天用例执行情况',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      color: ['#19BE6B', '#FF9900', '#ED4014', '#2DB7F5'],
      legend: {
        data: ['成功', '失败', '错误', '跳过'],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.state.series.date,
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '成功',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: this.state.series.successes,
        },
        {
          name: '失败',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: this.state.series.failures,
        },
        {
          name: '错误',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: this.state.series.errors,
        },
        {
          name: '跳过',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series',
          },
          data: this.state.series.skipped,
        },
      ],
    };
    return (
      <Card>
        <div className="site-card-wrapper">
          <Row gutter={16} style={{ marginBottom: 40 }}>
            <Col span={6}>
              <Card
                title="项目数"
                extra={<ProjectOutlined />}
                bordered
                hoverable
                style={{ marginTop: 2 }}
                type="inner"
              >
                <div style={{ fontSize: 40, color: 'blue' }}>
                  {this.state.project_num}个
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="模块数"
                extra={<PartitionOutlined />}
                bordered
                hoverable
                style={{ marginTop: 2 }}
                type="inner"
              >
                <div style={{ fontSize: 40, color: 'orange' }}>
                  {this.state.module_num} 个
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="用例数"
                extra={<CalendarOutlined />}
                bordered
                hoverable
                style={{ marginTop: 2 }}
                type="inner"
              >
                <span style={{ fontSize: 40, color: 'red' }}>
                  {this.state.testcase_num} 条
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 30天新增用例数：
                  {this.state.new_testcase_num}
                </span>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                title="用例累计执行"
                extra={<CaretRightOutlined />}
                bordered
                hoverable
                style={{ marginTop: 2 }}
                type="inner"
              >
                <span style={{ fontSize: 40, color: 'green' }}>
                  {this.state.run_case_sum} 次
                </span>

                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 成功率：
                  {Number(
                    (this.state.run_case_pass / this.state.run_case_sum) * 100,
                  ).toFixed(2)}
                  %
                </span>
              </Card>
            </Col>
          </Row>
        </div>
        <ReactECharts option={option}></ReactECharts>
      </Card>
    );
  }
}

export default connect(({ dashboard }) => ({
  dashboard,
}))(Index);
