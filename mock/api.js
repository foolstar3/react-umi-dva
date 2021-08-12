import Mock from 'mockjs';

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // echarts图表数据
  '/api/getformdata': {
    option: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    },
    option2: {
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '搜索引擎' },
            { value: 735, name: '直接访问' },
            { value: 580, name: '邮件营销' },
            { value: 484, name: '联盟广告' },
            { value: 300, name: '视频广告' },
          ],
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
    option3: {
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 240,
          splitNumber: 12,
          itemStyle: {
            color: '#58D9F9',
            shadowColor: 'rgba(0,138,255,0.45)',
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          progress: {
            show: true,
            roundCap: true,
            width: 18,
          },
          pointer: {
            icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
            length: '75%',
            width: 16,
            offsetCenter: [0, '5%'],
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 18,
            },
          },
          axisTick: {
            splitNumber: 2,
            lineStyle: {
              width: 2,
              color: '#999',
            },
          },
          splitLine: {
            length: 12,
            lineStyle: {
              width: 3,
              color: '#999',
            },
          },
          axisLabel: {
            distance: 30,
            color: '#999',
            fontSize: 10,
          },
          title: {
            show: false,
          },
          detail: {
            backgroundColor: '#fff',
            borderColor: '#999',
            borderWidth: 2,
            width: '60%',
            lineHeight: 40,
            height: 40,
            borderRadius: 8,
            offsetCenter: [0, '35%'],
            valueAnimation: true,
            formatter: function (value) {
              return '{value|' + value.toFixed(0) + '}{unit|km/h}';
            },
            rich: {
              value: {
                fontSize: 20,
                fontWeight: 'bolder',
                color: '#777',
              },
              unit: {
                fontSize: 20,
                color: '#999',
                padding: [0, 0, 0, 10],
              },
            },
          },
          data: [
            {
              value: 100,
            },
          ],
        },
      ],
    },
  },

  // 编辑器代码
  '/api/geteditorcode': Mock.mock({
    code: Mock.Random.sentence(),
  }),

  // 参数文件表格数据
  '/api/getparamsfile': {
    data: [
      Mock.mock({
        'paramsFileList|10': [
          {
            // 属性 index 是一个自增数，起始值为 1，每次增 1
            'index|+1': 1,
            project_name: '@word()',
            file_name: '@word()',
            upload_staff: '@cname()',
            project_name: '@word()',
            create_time: '@datetime(yyyy.MM.dd A HH:mm:ss)',
            update_time: '@datetime(yyyy.MM.dd A HH:mm:ss)',
            key: '@string()',
          },
        ],
      }),
    ],
  },
  // 新增参数文件
  'POST /api/addfile': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
  // 删除参数文件
  'delete /api/deletefile': (req, res) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('delete file ok');
  },
  'POST /api/getparamsfilecode': [
    Mock.mock({
      context: '@paragraph()',
    }),
  ],
};
