// antd组件实例路由
const example_routes = [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        routes: [
          { path: '/', component: '@/pages' },
          { path: '/user/:id', component: '@/pages/examples/alert' },
          { path: '/testManage/projectList', component: '@/pages/examples' },
          {
            path: '/testManage/moduleList',
            component: '@/pages/examples/alert',
          },
          {
            path: '/testManage/caseList',
            component: '@/pages/examples/button',
          },
          {
            path: '/testManage/taskList',
            component: '@/pages/examples/message',
          },
          { path: '/dataManage/envList', component: '@/pages/examples/radio' },
          { path: '/dataManage/paramsFile', component: '@/pages/examples/tab' },
          {
            path: '/dataManage/globalVar',
            component: '@/pages/examples/button',
          },
          // {path: '/dataManage/mockList', component: '@/pages/examples/button', },
          {
            path: '/reportManage/viewReport',
            component: '@/pages/examples/editor',
          },
        ],
      },
    ],
  },
];

// 项目实际路由
const routes = [
  {
    path: '/',
    component: '@/layout',
    routes: [
      {
        routes: [
          { path: '/', component: '@/pages' },
          {
            path: '/testManage/projectList',
            component: '@/pages/testManage/projectList',
          },
          {
            path: '/testManage/moduleList',
            component: '@/pages/testManage/moduleList',
          },
          {
            path: '/testManage/caseList',
            component: '@/pages/examples/button',
          },
          {
            path: '/testManage/taskList',
            component: '@/pages/examples/message',
          },
          {
            path: '/dataManage/envList',
            component: '@/pages/dataManage/envList',
          },
          {
            path: '/dataManage/paramsFile',
            component: '@/pages/dataManage/paramsFile',
          },
          {
            path: '/dataManage/globalVar',
            component: '@/pages/examples/button',
          },
          // {path: '/dataManage/mockList', component: '@/pages/examples/button', },
          {
            path: '/reportManage/viewReport',
            component: '@/pages/reportManage',
          },
        ],
      },
    ],
  },
];

export default routes;
