import React, { Component } from 'react';
import * as echarts from 'echarts';
import { connect } from 'umi';

@connect(({ chart }) => ({
  option: chart.option,
  option2: chart.option2,
  option3: chart.option3,
}))
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
      option2: {},
      option3: {},
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/getData',
      callback: () => {
        // console.log('callback');
      },
    });
  }

  // DOM挂载后才能获取到对应元素
  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const chartDom2 = document.getElementById('pie');
    const myChart2 = echarts.init(chartDom2);
    const chartDom3 = document.getElementById('gauge');
    const myChart3 = echarts.init(chartDom3);
    const { option, option2, option3 } = this.props;

    myChart3.setOption(option3);
    myChart2.setOption(option2);
    myChart.setOption(option);
  }

  render() {
    return (
      <>
        <div style={{ display: 'flex' }}>
          <div id="main" style={{ width: 800, height: 400 }}></div>
          <div id="pie" style={{ width: 800, height: 400 }}></div>
        </div>
        <div id="gauge" style={{ width: 800, height: 350 }}></div>
      </>
    );
  }
}
