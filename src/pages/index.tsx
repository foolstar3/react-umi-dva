import React,{Component} from "react";
import * as echarts from 'echarts';

export default class Chart extends Component {
  // DOM挂载后才能获取到对应元素
  componentDidMount() {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);
    const option = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
      }]
    };
    option && myChart.setOption(option);
  }
  render() {
    return(
      <div id="main" style={{ width: 800, height: 400 }}></div>
    )
  }
}


